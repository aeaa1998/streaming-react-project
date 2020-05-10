/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';

import { View, Text, Dimensions } from "react-native";
const FullScreenView = (props) => {
    const { width, height } = Dimensions.get('window');
    return (
        <View
            style={{
                backgroundImage: `url('https://i.pinimg.com/564x/13/bf/43/13bf439a8f63dc19b6f8cb3fdb771fb4.jpg')`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                height: height,
                width: width,
            }}
        >

            {props.children}

        </View>
    );
};


export default FullScreenView