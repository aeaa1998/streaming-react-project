/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, TextInput } from "react-native";


const TextInputWrapper = (props) => {
    const { input, meta, ...inputProps } = props;
    return (
        <View>
            <TextInput
                {...inputProps}
                onChangeText={input.onChange}
                onBlur={input.onBlur}
                onFocus={input.onFocus}
                value={input.value}
            />
            {meta.error != '' && meta.touched && <Text style={{ fontSize: 12, color: 'red' }}>{meta.error}</Text>}
        </View>
    );
};

export default TextInputWrapper;
