/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Modal, View, Text, ActivityIndicator, Button } from 'react-native';

export const ProgressLoader = ({ visible = false, message = null, loadingLabel = 'Cargando' }) => (
    <Modal onRequestClose={() => null} animationType="fade" transparent={true} visible={visible} style={{
        backgroundColor: 'rgba(52, 52, 52, 1)',
    }}>
        <View
            style={{
                flex: 1,
                backgroundColor: 'rgba(52, 52, 52, 0.5)',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <View style={{ borderRadius: 10, backgroundColor: 'white', paddingVertical: 32, paddingHorizontal: 64 }}>
                <Text style={{ fontSize: 20, fontWeight: '200', marginBottom: 16 }}>{loadingLabel}</Text>
                {message && <Text style={{ fontSize: 18, fontWeight: '200', marginBottom: 32, textAlign: 'center' }}>{message}</Text>}
                <ActivityIndicator size="large" />
            </View>
        </View>
    </Modal>
);

