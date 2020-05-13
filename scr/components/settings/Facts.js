/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, ImageBackground } from 'react-native'

function Facts({ item, navigation, ...props }) {
    return (
        <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white' }}>
            <ImageBackground source={{ uri: 'https://c4.wallpaperflare.com/wallpaper/266/1009/248/juice-wrld-juice-wrld-rip-hd-wallpaper-preview.jpg' }} style={styles.imageHeader}>
                <Text
                    style={{ flex: 1, fontSize: 44, color: 'white', textAlign: 'center', textAlignVertical: 'center' }}
                >STRME Facts</Text>
            </ImageBackground>
            <View style={{ flex: 0.7, padding: 10 }}>
                <Text style={styles.heading}>Misión</Text>
                <Text style={styles.content}>Sacar 140 puntos en este proyecto.</Text>
                <Text style={styles.heading}>Visión</Text>
                <Text style={styles.content}>Lograr nuestro primer promedio de 85.</Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    imageHeader: {
        flex: 0.3,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    heading: {
        fontSize: 26,
        fontWeight: 'bold',
        paddingTop: 16,
        paddingBottom: 8,
    },
    content: {
        fontSize: 18,
    }
});
export default Facts