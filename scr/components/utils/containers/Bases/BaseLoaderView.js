/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Keyboard, ActivityIndicator, View, Text } from 'react-native'
import ProgressLoader from '../../Loaders/ProgressLoader'
// AutoScrollableView
const BaseLoaderView = ({ style = {}, isLoading = false, fetchCorrectly = true, childrenView = undefined, ...props }) => {
    const computeView = (isLoading, fetchCorrectly) => {
        if (!fetchCorrectly && !isLoading) {
            return (props.errorComponent || <Text>Error</Text>)
        } else {
            if (isLoading) {
                return (<View style={{
                    flex: 1,
                    justifyContent: 'center'
                }}>
                    <ActivityIndicator size="large" color="gray" />
                </View>)
            } else if (fetchCorrectly) {
                return childrenView ? childrenView() : props.children
            }
        }
    }
    return (
        < View
            {...props}
            style={style}
        >
            {computeView(isLoading, fetchCorrectly)}
        </View >
    );
}


export default BaseLoaderView;
