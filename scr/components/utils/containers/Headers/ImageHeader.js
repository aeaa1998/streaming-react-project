/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View, ImageBackground, Text, StyleSheet } from 'react-native';
import { imageHeaderStyle } from '../../../../styles/images';
//imageHeaderDefault 0.3 flex

const ImageHeader = (
    {
        imgSrc = { uri: 'https://webdesigntips.blog/wp-content/uploads/2018/06/20-Free-Abstract-Material-Design-Backgrounds.jpg' },
        onPageLayout = (e) => { },
        textStyle = { flex: 0.8, fontSize: 36, color: 'white', textAlignVertical: 'center', fontWeight: '600', textAlign: 'center' },
        textTitle = "Header",
        style = {},
        ...props
    }
) => {
    return (
        <ImageBackground
            style={style}
            source={imgSrc}
            onLayout={onPageLayout}
            {...props}
        >
            <Text style={textStyle}>
                {textTitle}
            </Text>
            {props.children}
        </ImageBackground>
    );
};

export default ImageHeader;
