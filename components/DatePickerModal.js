// DatePickerModal.js
import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { COLORS, FONTS } from "../constants";
import DatePicker from "react-native-modern-datepicker";

const DatePickerModal = ({
  open,
  onClose,
  startDate,
  selectedDate,
  onChangeDate,
  setSelectedStartDate,
}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={open}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            margin: 20,
            backgroundColor: COLORS.primary,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 20,
            padding: 35,
            width: "90%",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          <DatePicker
            mode="calendar"
            minimumDate={startDate}
            selected={selectedDate}
            onDateChanged={onChangeDate}
            onSelectedChange={(date) => setSelectedStartDate(date)}
            options={{
              backgroundColor: COLORS.primary,
              textHeaderColor: "#469ab6",
              textDefaultColor: COLORS.white,
              selectedTextColor: COLORS.white,
              mainColor: "#469ab6",
              textSecondaryColor: COLORS.white,
              borderColor: "rgba(122,146,165,0.1)",
            }}
          />

          <TouchableOpacity onPress={onClose}>
            <Text style={{ ...FONTS.body3, color: COLORS.white }}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default DatePickerModal;
