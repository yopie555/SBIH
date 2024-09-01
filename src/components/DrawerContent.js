import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

import LogoBintan from '../assets/bintan.png'

const DrawerContent = () => {
    return (
        <View style={styles.container}>
            <View style={styles.titleHeader}>
                <Image source={LogoBintan} style={{ width: 100, height: 100 }} />
                <Text style={styles.titleText}>Smart Bintan in Hands</Text>
            </View>
        </View>
    )
}

export default DrawerContent

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    titleHeader: {
        padding: 10,
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#0074BD',
    },
    titleText: {
        color: 'white'
    }
})