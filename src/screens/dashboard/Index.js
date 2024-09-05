import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { baseURL } from '../../constants/General'

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
import penggunaanAirBersih from '../../assets/PAB.png'

const Index = () => {
    const navigation = useNavigation()
    const [dataJPM, setDataJPM] = useState(null)
    const [dataIPM, setDataIPM] = useState(null)
    const [dataALS, setDataALS] = useState(null)
    const [dataIG, setDataIG] = useState(null)
    const [dataIDB, setDataIDB] = useState(null)
    const [dataPE, setDataPE] = useState(null)
    const [dataKW, setDataKW] = useState(null)
    const [dataPP, setDataPP] = useState(null)
    const [dataPJD, setDataPJD] = useState(null)
    const [dataPAB, setDataPAB] = useState(null)

    //get data multiple endpoint
    const getData = async () => {
        try {
            const resJPM = await axios.get(`${baseURL}/sosial/ppm`)
            const resIPM = await axios.get(`${baseURL}/sosial/ipm`)
            const resALS = await axios.get(`${baseURL}/sosial/rls`)
            const resIG = await axios.get(`${baseURL}/sosial/ig`)
            const resIDB = await axios.get(`${baseURL}/sosial/idb`)
            const resPE = await axios.get(`${baseURL}/ekonomi/pe`)
            const resKW = await axios.get(`${baseURL}/ekonomi/kw`)
            const resPP = await axios.get(`${baseURL}/kependudukan/pp`)
            const resPJD = await axios.get(`${baseURL}/infrastruktur/pjdd`)
            const resPAB = await axios.get(`${baseURL}/infrastruktur/prt`)
            setDataJPM(resJPM.data)
            setDataIPM(resIPM.data)
            setDataALS(resALS.data)
            setDataIG(resIG.data)
            setDataIDB(resIDB.data)
            setDataPE(resPE.data)
            setDataKW(resKW.data)
            setDataPP(resPP.data)
            setDataPJD(resPJD.data)
            setDataPAB(resPAB.data)
        } catch (error) {
            console.log("errror", error)
        }
    }

    useEffect(() => {
        getData()
        return () => { }
    }, [])

    // useEffect(() => {
    //     if (dataJPM !== null && dataJPM !== undefined) {
    //         // console.log(JSON.stringify(dataJPM.last_data[0].tahun))
    //     }
    // }, [dataJPM])x    

    return (
        <View style={styles.container}>
            <Image
                source={headerImage}
                style={{ width: '100%', height: 180 }}
            />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <TouchableOpacity
                    style={styles.cardDashbord}
                    onPress={() => navigation.navigate('DetailDashboard', {
                        title: "Data Penduduk Miskin",
                        data: dataJPM.result
                    })}
                >
                    <View style={styles.innerCard}>
                        <Image source={pendudukmiskin} style={styles.iconImage} />
                        <View style={{ paddingHorizontal: 10, width: '82%' }}>
                            <Text style={styles.titleText}>Jumlah Penduduk Miskin</Text>
                            {dataJPM !== null && dataJPM !== undefined ?
                                <Text style={styles.subTitleText}>Tahun {dataJPM.last_data[0].tahun}</Text>
                                : <ActivityIndicator size="small" color="#fff" />
                            }
                            {
                                dataJPM !== null && dataJPM !== undefined ?
                                    <Text style={styles.subTitleText}>{dataJPM.last_data[0].presentase} %</Text>
                                    : <ActivityIndicator size="small" color="#fff" />
                            }
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.cardDashbord}
                    onPress={() => navigation.navigate('DetailIPMDashboard', {
                        title: "Indeks Pembangunan Manusia",
                        data: dataIPM.result
                    })}
                >
                    <View style={styles.innerCard}>
                        <Image source={indexpembangunanmanusia} style={styles.iconImage} />
                        <View style={{ paddingHorizontal: 10, width: '84%' }}>
                            <Text numberOfLines={2} style={styles.titleText}>Indeks Pembangunan Manusia</Text>
                            {
                                dataIPM !== null && dataIPM !== undefined ?
                                    <Text style={styles.subTitleText}>Tahun {dataIPM.last_data[0].tahun}</Text>
                                    : <ActivityIndicator size="small" color="#fff" />
                            }
                            {
                                dataIPM !== null && dataIPM !== undefined ?
                                    <Text style={styles.subTitleText}>{dataIPM.last_data[0].ipm} %</Text>
                                    : <ActivityIndicator size="small" color="#fff" />
                            }
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.cardDashbord}
                    onPress={() => navigation.navigate('DetailRLSDashboard', {
                        title: "Angka Rata-Rata Lama Sekolah",
                        data: dataALS.result
                    })}
                >
                    <View style={styles.innerCard}>
                        <Image source={AngkaSekolah} style={styles.iconImage} />
                        <View style={{ paddingHorizontal: 10, width: '82%' }}>
                            <Text style={styles.titleText}>Angka Rata-Rata Lama Sekolah</Text>
                            {dataALS !== null && dataALS !== undefined ?
                                <Text style={styles.subTitleText}>Tahun {dataALS.last_data[0].tahun}</Text>
                                : <ActivityIndicator size="small" color="#fff" />
                            }
                            {dataALS !== null && dataALS !== undefined ?
                                <Text style={styles.subTitleText}>{dataALS.last_data[0].rls} %</Text>
                                : <ActivityIndicator size="small" color="#fff" />
                            }
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.cardDashbord}
                    onPress={() => navigation.navigate('DetailIGDashboard', {
                        title: "Indeks Gini",
                        data: dataIG.result
                    })}
                >
                    <View style={styles.innerCard}>
                        <Image source={indexGini} style={styles.iconImage} />
                        <View style={{ paddingHorizontal: 10, width: '82%' }}>
                            <Text style={styles.titleText}>Indeks Gini</Text>
                            {dataIG !== null && dataIG !== undefined ?
                                <Text style={styles.subTitleText}>Tahun {dataIG.last_data[0].tahun}</Text>
                                : <ActivityIndicator size="small" color="#fff" />
                            }
                            {dataIG !== null && dataIG !== undefined ?
                                <Text style={styles.subTitleText}>{dataIG.last_data[0].gini_ratio} point</Text>
                                : <ActivityIndicator size="small" color="#fff" />
                            }
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.cardDashbord}
                    onPress={() => navigation.navigate('DetailIDBDashboard', {
                        title: "Indeks Daya Beli",
                        data: dataIDB.result
                    }
                    )}
                >
                    <View style={styles.innerCard}>
                        <Image source={indexDayaBeli} style={styles.iconImage} />
                        <View style={{ paddingHorizontal: 10, width: '82%' }}>
                            <Text style={styles.titleText}>Indeks Daya Beli</Text>
                            {dataIDB !== null && dataIDB !== undefined ?
                                <Text style={styles.subTitleText}>Tahun {dataIDB.last_data[0].tahun}</Text>
                                : <ActivityIndicator size="small" color="#fff" />
                            }
                            {dataIDB !== null && dataIDB !== undefined ?
                                <Text style={styles.subTitleText}>{dataIDB.last_data[0].daya_beli} Juta Rupiah</Text>
                                : <ActivityIndicator size="small" color="#fff" />
                            }
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.cardDashbord}
                    onPress={() => navigation.navigate('DetailPEDashboard', {
                        title: "Pertumbuhan Ekonomi",
                        data: dataPE.result
                    })}
                >
                    <View style={styles.innerCard}>
                        <Image source={pertumbuhanEkonomi} style={styles.iconImage} />
                        <View style={{ paddingHorizontal: 10, width: '82%' }}>
                            <Text style={styles.titleText}>Pertumbuhan Ekonomi</Text>
                            {
                                dataPE !== null && dataPE !== undefined ?
                                    <Text style={styles.subTitleText}>Tahun {dataPE.last_data[0].tahun}</Text>
                                    : <ActivityIndicator size="small" color="#fff" />
                            }
                            {
                                dataPE !== null && dataPE !== undefined ?
                                    <Text style={styles.subTitleText}>{dataPE.last_data[0].pertumbuhan_ekonomi} %</Text>
                                    : <ActivityIndicator size="small" color="#fff" />
                            }
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.cardDashbord}
                    onPress={() => navigation.navigate('DetailKWDashboard', {
                        title: "Kunjungan Wisata",
                        data: dataKW.result
                    })}
                >
                    <View style={styles.innerCard}>
                        <Image source={kunjunganWisata} style={styles.iconImage} />
                        <View style={{ paddingHorizontal: 10, width: '82%' }}>
                            <Text style={styles.titleText}>Kunjungan Wisata</Text>
                            {
                                dataKW !== null && dataKW !== undefined ?
                                    <Text style={styles.subTitleText}>Tahun {dataKW.last_data[0].tahun}</Text>
                                    : <ActivityIndicator size="small" color="#fff" />
                            }
                            {
                                dataKW !== null && dataKW !== undefined ?
                                    <Text style={styles.subTitleText}>{dataKW.last_data[0].jumlah} Orang</Text>
                                    : <ActivityIndicator size="small" color="#fff" />
                            }
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.cardDashbord}
                    onPress={() => navigation.navigate('DetailPPDashboard', {
                        title: "Pertumbuhan Penduduk",
                        data: dataPP.result
                    })}
                >
                    <View style={styles.innerCard}>
                        <Image source={pertumbuhanPenduduk} style={styles.iconImage} />
                        <View style={{ paddingHorizontal: 10, width: '82%' }}>
                            <Text style={styles.titleText}>Pertumbuhan Penduduk</Text>
                            {
                                dataPP !== null && dataPP !== undefined ?
                                    <Text style={styles.subTitleText}>Tahun {dataPP.last_data[0].tahun}</Text>
                                    : <ActivityIndicator size="small" color="#fff" />
                            }
                            {
                                dataPP !== null && dataPP !== undefined ?
                                    <Text style={styles.subTitleText}>{dataPP.last_data[0].laju} %</Text>
                                    : <ActivityIndicator size="small" color="#fff" />
                            }
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.cardDashbord}
                    onPress={() => navigation.navigate('DetailPJDDDashboard',{
                        title: "Panjang Jalan Dibangun",
                        data: dataPJD.result
                    })}
                >
                    <View style={styles.innerCard}>
                        <Image source={panjangJalanDibangun} style={styles.iconImage} />
                        <View style={{ paddingHorizontal: 10, width: '82%' }}>
                            <Text style={styles.titleText}>Panjang Jalan Dibangun</Text>
                            {
                                dataPJD !== null && dataPJD !== undefined ?
                                    <Text style={styles.subTitleText}>Tahun {dataPJD.last_data[0].tahun}</Text>
                                    : <ActivityIndicator size="small" color="#fff" />
                            }
                            {
                                dataPJD !== null && dataPJD !== undefined ?
                                    <Text style={styles.subTitleText}>{dataPJD.last_data[0].panjang} Km</Text>
                                    : <ActivityIndicator size="small" color="#fff" />
                            }
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.cardDashbord}
                    onPress={() => navigation.navigate('DetailPRTDashboard',
                        {
                            title: "Persentase Penggunaan Air Bersih",
                            data: dataPAB.result
                        }
                    )}
                >
                    <View style={styles.innerCard}>
                        <Image source={penggunaanAirBersih} style={styles.iconImage} />
                        <View style={{ paddingHorizontal: 10, width: '82%' }}>
                            <Text style={styles.titleText}>Persentase Penggunaan Air Bersih</Text>
                            {
                                dataPAB !== null && dataPAB !== undefined ?
                                    <Text style={styles.subTitleText}>Tahun {dataPAB.last_data[0].tahun}</Text>
                                    : <ActivityIndicator size="small" color="#fff" />
                            }
                            {
                                dataPAB !== null && dataPAB !== undefined ?
                                    <Text style={styles.subTitleText}>{dataPAB.last_data[0].nilai} %</Text>
                                    : <ActivityIndicator size="small" color="#fff" />
                            }
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
        height: 'auto',
        backgroundColor: '#0074BD',
        padding: 10,
        marginHorizontal: '5%',
        justifyContent: 'center',
        borderRadius: 10,
        marginVertical: 5
    },
    innerCard: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5
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