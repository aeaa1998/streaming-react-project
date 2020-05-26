/* eslint-disable react/self-closing-comp */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { TouchableOpacity, Modal, StyleSheet, TouchableWithoutFeedback } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(52, 52, 52, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const DismissableModal = ({ visible = false, setVisibleState = () => { }, ...props }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={() => { setVisibleState(false) }}
        >
            <TouchableOpacity
                onPressOut={() => setVisibleState(false)}
                style={styles.container}
                activeOpacity={1}
            >
                <TouchableWithoutFeedback>
                    {props.children}
                </TouchableWithoutFeedback>
            </TouchableOpacity>
        </Modal>
    );
}

export default DismissableModal
