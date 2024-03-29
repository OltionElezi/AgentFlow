const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
const jwt = require("jsonwebtoken");

mongoose
  .connect(
    "mongodb+srv://oltionelezi17:Imcool1890@cluster0.kyb1fiv.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to Mongo Db");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDb", err);
  });

app.listen(port, () => {
  console.log("Server running on port 8000");
});

const User = require("./models/user");
const CardDb = require("./models/cardDetails");

//importing schema
require("./models/imageDetails");
const Images = mongoose.model("ImageDetails");

//endpoint for registration of the user

app.post("/register", (req, res) => {
  const { name, email, typeofUser, password, image, dateOfBirth, country } =
    req.body;

  // create a new User object
  // create a new User object
  const newUser = new User({
    image,
    name,
    email,
    password,
    typeofUser,
    dateOfBirth,
    country,
    sentFriendRequests: [],
  });

  // save the user to the database
  newUser
    .save()
    .then(() => {
      res.status(200).json({ message: "User registered successfully" });
    })
    .catch((err) => {
      console.log("Error registering user", err);
      res.status(500).json({ message: "Error registering the user!" });
    });
});

//function to create a token for the user
const createToken = (userId) => {
  // Set the token payload
  const payload = {
    userId: userId,
  };

  // Generate the token with a secret key and expiration time
  const token = jwt.sign(payload, "Q$r2K6W8n!jCW%Zk", { expiresIn: "1h" });

  return token;
};

//endpoint for logging in of that particular user
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Check if the email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  // Check for that user in the database
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        // User not found
        return res.status(404).json({ message: "User not found" });
      }

      // Compare the provided passwords with the password in the database
      if (user.password !== password) {
        return res.status(401).json({ message: "Invalid password" });
      }

      const token = createToken(user._id);
      // Return the user ID along with the token
      res.status(200).json({ userId: user._id, token });
      console.log("User ID", user._id);
      console.log("User Type", user.typeofUser);
    })
    .catch((error) => {
      console.log("Error in finding the user", error);
      res.status(500).json({ message: "Internal server error" });
    });
});

//endpoint to get the user who is logged in with the provided ID
app.get("/user/:userId", (req, res) => {
  const loggedInUserId = req.params.userId;

  User.findById(loggedInUserId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    })
    .catch((err) => {
      console.log("Error retrieving user", err);
      res.status(500).json({ message: "Error retrieving user" });
    });
});

//endpoint to modify the user who is logged in with the provided ID
app.put("/user/:userId", async (req, res) => {
  const loggedInUserId = req.params.userId;
  const { name, email, password, typeofUser, dateOfBirth, country } = req.body;

  try {
    const user = await User.findById(loggedInUserId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name;
    user.email = email;
    user.password = password;
    user.typeofUser = typeofUser;
    user.dateOfBirth = dateOfBirth;
    user.country = country;

    await user.save();
    res.status(200).json(user);
  } catch (err) {
    console.log("Error updating user", err);
    res.status(500).json({ message: "Error updating user" });
  }
});

//endpoint to access all the users except the user who's is currently logged in!
// app.get("/users/:userId", (req, res) => {
//   const loggedInUserId = req.params.userId;

//   User.find({ _id: { $ne: loggedInUserId } })
//     .then((users) => {
//       res.status(200).json(users);
//     })
//     .catch((err) => {
//       console.log("Error retrieving users", err);
//       res.status(500).json({ message: "Error retrieving users" });
//     });
// });

//endpoint to send a request to a user
app.post("/friend-request", async (req, res) => {
  const { currentUserId, selectedUserId } = req.body;

  try {
    //update the recepient's friendRequestsArray!
    await User.findByIdAndUpdate(selectedUserId, {
      $push: { freindRequests: currentUserId },
    });

    //update the sender's sentFriendRequests array
    await User.findByIdAndUpdate(currentUserId, {
      $push: { sentFriendRequests: selectedUserId },
    });

    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

//endpoint to show all the friend-requests of a particular user
app.get("/friend-request/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    //fetch the user document based on the User id
    const user = await User.findById(userId)
      .populate("freindRequests", "name email image")
      .lean();

    const freindRequests = user.freindRequests;

    res.json(freindRequests);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//endpoint to accept a friend-request of a particular person
app.post("/friend-request/accept", async (req, res) => {
  try {
    const { senderId, recepientId } = req.body;

    //retrieve the documents of sender and the recipient
    const sender = await User.findById(senderId);
    const recepient = await User.findById(recepientId);

    sender.friends.push(recepientId);
    recepient.friends.push(senderId);

    recepient.freindRequests = recepient.freindRequests.filter(
      (request) => request.toString() !== senderId.toString()
    );

    sender.sentFriendRequests = sender.sentFriendRequests.filter(
      (request) => request.toString() !== recepientId.toString
    );

    await sender.save();
    await recepient.save();

    res.status(200).json({ message: "Friend Request accepted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//endpoint to access all the friends of the logged in user!
app.get("/accepted-friends/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate(
      "friends",
      "name email image"
    );
    const acceptedFriends = user.friends;
    res.json(acceptedFriends);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "files/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

//endpoint to post Messages and store it in the backend
// app.js

app.post("/card/create", upload.single("imageFile"), async (req, res) => {
  try {
    const { title, description, location, calendar } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const newCard = new CardDb({
      image: req.file.path,
      title,
      description,
      location,
      calendar,
    });

    await newCard.save();
    res.status(200).json({ message: "Card created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

///endpoint to get the userDetails to design the chat Room header
app.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    //fetch the user data from the user ID
    const recepientId = await User.findById(userId);

    res.json(recepientId);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a user
app.put("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const { name, email, typeofUser, password, image, dateOfBirth, country } =
    req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user fields
    user.name = name;
    user.email = email;
    user.typeofUser = typeofUser;
    user.password = password;
    // user.image = image;
    user.dateOfBirth = dateOfBirth;
    user.country = country;

    // Save the updated user
    await user.save();

    // Log the updated user
    console.log("Updated user:", user);

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/friend-requests/sent/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId)
      .populate("sentFriendRequests", "name email image")
      .lean();

    const sentFriendRequests = user.sentFriendRequests;

    res.json(sentFriendRequests);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Internal Server" });
  }
});

app.get("/friends/:userId", (req, res) => {
  try {
    const { userId } = req.params;

    User.findById(userId)
      .populate("friends")
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        const friendIds = user.friends.map((friend) => friend._id);

        res.status(200).json(friendIds);
      });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "internal server error" });
  }
});

// Get all cards
app.get("/card/list", async (req, res) => {
  try {
    const cards = await CardDb.find();
    res.json(cards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Search for cards
app.get("/card/search", async (req, res) => {
  const { query } = req.query;

  try {
    // Use a regex pattern to find cards that match the query (case-insensitive)
    const cards = await CardDb.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { location: { $regex: query, $options: "i" } },
      ],
    });

    res.json(cards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get a card by ID
app.get("/card/:id", (req, res) => {
  const cardId = req.params.id;

  // Find the card by ID in the database
  CardDb.findById(cardId)
    .then((card) => {
      if (!card) {
        return res.status(404).json({ message: "Card not found" });
      }

      res.status(200).json(card);
    })
    .catch((err) => {
      console.log("Error finding card", err);
      res.status(500).json({ message: "Error finding the card!" });
    });
});

// Modify a card
app.put("/card/:id", async (req, res) => {
  const cardId = req.params.id;
  const { description, location, image, calendar } = req.body;

  try {
    const card = await CardDb.findById(cardId);
    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    // Update the card fields
    card.description = description;
    card.location = location;
    card.image = image;
    card.calendar = calendar;

    // Save the updated card
    await card.save();

    res.status(200).json({ message: "Card updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
