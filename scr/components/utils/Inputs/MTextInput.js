/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, Dimensions, ImageBackground, StyleSheet, TextInput, Button } from "react-native";
export const MTextInput = (props) => {
    const { input, ...inputProps } = props;
    return (
        <View>
            {/* <Text style={{ fontSize: 16, textAlign: "left" }} >{label}</Text> */}
            <TextInput
                onChangeText={(text) => input.onChange(text)}
                {...input}
                {...inputProps}
                style={{ marginTop: 8, fontSize: 18, borderColor: 'gray', borderWidth: 1 }}
            />
        </View>
    )
};
