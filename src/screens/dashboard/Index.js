import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

import pendudukmiskin from '../../assets/pendudukmis.png'

const Index = () => {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <TouchableOpacity 
            style={styles.cardDashbord}
            onPress={() => navigation.navigate('DetailDashboard')}
            >
                <View style={{ flexDirection: 'row' }}>
                    <Image source={pendudukmiskin} style={styles.iconImage} />
                    <View style={{paddingHorizontal: 10, width: '82%'}}>
                        <Text style={{fontWeight: 'bold', fontSize: 18}}>Jumlah Penduduk Miskin</Text>
                        <Text>15%</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cardDashbord: {
        width: '90%',
        height: 100,
        backgroundColor: '#ababab',
        padding: 10,
        marginHorizontal: '5%',
        justifyContent: 'center',
        borderRadius: 10,
        marginVertical: 5
    },
    iconImage: {
        height: 50,
        width: 50,
    }
})

export default Index