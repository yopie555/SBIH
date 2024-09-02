import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

import headerImage from '../../assets/1.png'
import pendudukmiskin from '../../assets/pendudukmis.png'
import indexpembangunanmanusia from '../../assets/IPM.png'
import AngkaSekolah from '../../assets/ALS.png'
import indexGini from '../../assets/IG.png'
import indexDayaBeli from '../../assets/IDB.png'
import pertumbuhanEkonomi from '../../assets/PE.png'
import kunjunganWisata from '../../assets/KW.png'
import pertumbuhanPenduduk from '../../assets/PP.png'
import panjangJalanDibangun from '../../assets/PJD.png'

const Index = () => {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <Image
                source={headerImage}
                style={{ width: '100%', height: 180 }}
            />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <TouchableOpacity
                    style={styles.cardDashbord}
                    onPress={() => navigation.navigate('DetailDashboard')}
                >
                    <View style={{ flexDirection: 'row', alignItems:'center' }}>
                        <Image source={pendudukmiskin} style={styles.iconImage} />
                        <View style={{ paddingHorizontal: 10, width: '82%' }}>
                            <Text style={styles.titleText}>Jumlah Penduduk Miskin</Text>
                            <Text style={styles.subTitleText}>Tahun 2024</Text>
                            <Text style={styles.subTitleText}>15%</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.cardDashbord}
                    onPress={() => navigation.navigate('DetailDashboard')}
                >
                    <View style={{ flexDirection: 'row',  alignItems:'center', padding: 'auto'  }}>
                        <Image source={indexpembangunanmanusia} style={styles.iconImage} />
                        <View style={{ paddingHorizontal: 10, width: '84%' }}>
                            <Text numberOfLines={2} style={styles.titleText}>Indeks Pembangunan Manusia</Text>
                            <Text style={styles.subTitleText}>Tahun 2024</Text>
                            <Text style={styles.subTitleText}>15%</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.cardDashbord}
                    onPress={() => navigation.navigate('DetailDashboard')}
                >
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={AngkaSekolah} style={styles.iconImage} />
                        <View style={{ paddingHorizontal: 10, width: '82%' }}>
                            <Text style={styles.titleText}>Angka Lulusan Sekolah</Text>
                            <Text style={styles.subTitleText}>15%</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.cardDashbord}
                    onPress={() => navigation.navigate('DetailDashboard')}
                >
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={indexGini} style={styles.iconImage} />
                        <View style={{ paddingHorizontal: 10, width: '82%' }}>
                            <Text style={styles.titleText}>Indeks Gini</Text>
                            <Text style={styles.subTitleText}>15%</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.cardDashbord}
                    onPress={() => navigation.navigate('DetailDashboard')}
                >
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={indexDayaBeli} style={styles.iconImage} />
                        <View style={{ paddingHorizontal: 10, width: '82%' }}>
                            <Text style={styles.titleText}>Indeks Daya Beli</Text>
                            <Text style={styles.subTitleText}>15%</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.cardDashbord}
                    onPress={() => navigation.navigate('DetailDashboard')}
                >
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={pertumbuhanEkonomi} style={styles.iconImage} />
                        <View style={{ paddingHorizontal: 10, width: '82%' }}>
                            <Text style={styles.titleText}>Pertumbuhan Ekonomi</Text>
                            <Text style={styles.subTitleText}>15%</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.cardDashbord}
                    onPress={() => navigation.navigate('DetailDashboard')}
                >
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={kunjunganWisata} style={styles.iconImage} />
                        <View style={{ paddingHorizontal: 10, width: '82%' }}>
                            <Text style={styles.titleText}>Kunjungan Wisata</Text>
                            <Text style={styles.subTitleText}>15%</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.cardDashbord}
                    onPress={() => navigation.navigate('DetailDashboard')}
                >
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={pertumbuhanPenduduk} style={styles.iconImage} />
                        <View style={{ paddingHorizontal: 10, width: '82%' }}>
                            <Text style={styles.titleText}>Pertumbuhan Penduduk</Text>
                            <Text style={styles.subTitleText}>15%</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.cardDashbord}
                    onPress={() => navigation.navigate('DetailDashboard')}
                >
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={panjangJalanDibangun} style={styles.iconImage} />
                        <View style={{ paddingHorizontal: 10, width: '82%' }}>
                            <Text style={styles.titleText}>Panjang Jalan Dibangun</Text>
                            <Text style={styles.subTitleText}>15%</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </ScrollView>
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
        backgroundColor: '#0074BD',
        padding: 10,
        marginHorizontal: '5%',
        justifyContent: 'center',
        borderRadius: 10,
        marginVertical: 5
    },
    iconImage: {
        height: 50,
        width: 50,
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
    },
    subTitleText: {
        color: 'white'
    }
})

export default Index