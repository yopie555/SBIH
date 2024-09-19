import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { baseURL } from '../../constants/General'
import { useQuery } from 'react-query'
import { stateDataPenduduk } from '../../state/dataPenduduk'
import { stateDataIPM } from '../../state/dataIPM'
import { stateDataLamaSekolah } from '../../state/dataRLS'
import { stateDataIndeksGini } from '../../state/dataIG'
import { stateDataIndeksDayaBeli } from '../../state/dataIDB'
import { stateDataPertumbuhanEkonomi } from '../../state/dataPE'
import { stateDataKunjunganWisata } from '../../state/dataKW'
import { stateDataPertumbuhanPenduduk } from '../../state/dataPP'
import { stateDataPanjangJalanDibangun } from '../../state/dataPJD'
import { stateDataPenggunaanAirBersih } from '../../state/dataPRT'
import { stateDataAngkaMelekHuruf } from '../../state/dataAMH'
import { stateDataAngkaHarapanHidup } from '../../state/dataAHH'
import { stateDataAngkaKeberlangsunganHidupBayi } from '../../state/dataAKHB'
import { stateDataAngkaKematianIbuMelahirkan } from '../../state/dataAKIM'
import { stateDataPerkembanganKondisiKetenagakerjaan } from '../../state/dataPKK'
import { stateDataIndeksPembangunanGender } from '../../state/dataIPG'
import { stateDataAngkaPartisipasiKasar } from '../../state/dataAPK'
import { stateDataAngkaPartisipasiMurni } from '../../state/dataAPM'
import { stateDataAngkaHarapanLamaSekolah } from '../../state/dataHLS'
import { stateDataJumlahRumahTidakLayakHuni } from '../../state/dataJRTLH'
import { stateDataPersentasePendudukUsia } from '../../state/dataPPU'
import { stateDataIndeksPemberdayaanGender } from '../../state/dataIPGG'
import { stateDataLajuInflasi } from '../../state/dataLI'
import { stateDataAtasDasarHargaBerlaku } from '../../state/dataADHB'
import { stateDataPMA } from '../../state/dataPMA'
import { stateDataProduksiPerikananBudidaya } from '../../state/dataPPB'
import { stateDataProduksiPerikananTangkap } from '../../state/dataPPT'
import { stateDataCapaianProduksiKomoditiUnggulanPerkebunan } from '../../state/dataCPKUP'
import { stateDataCapaianProduksiKomoditiHortikultura } from '../../state/dataCPKH'
import { stateDataJumlahProduksiPeternakan } from '../../state/dataJPP'
import { stateDataJumlahPendudukBerdasarkanKecamatan } from '../../state/dataJBPK'
import { stateDataJumlahPendudukBerdasarkanKelompokUmur } from '../../state/dataJPBKU'
import { stateDataPersentaseTingkatKemantapanJalan } from '../../state/dataPTKJ'
import { stateDataVideo } from '../../state/dataVideo'

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
    const { setDataPenduduk } = stateDataPenduduk()
    const { setDataIPM } = stateDataIPM()
    const { setDataLamaSekolah } = stateDataLamaSekolah()
    const { setDataIndeksGini } = stateDataIndeksGini()
    const { setDataIndeksDayaBeli } = stateDataIndeksDayaBeli()
    const { setDataPertumbuhanEkonomi } = stateDataPertumbuhanEkonomi()
    const { setDataKunjunganWisata } = stateDataKunjunganWisata()
    const { setDataPertumbuhanPenduduk } = stateDataPertumbuhanPenduduk()
    const { setDataPanjangJalanDibangun } = stateDataPanjangJalanDibangun()
    const { setDataPenggunaanAirBersih } = stateDataPenggunaanAirBersih()
    const { setDataAngkaMelekHuruf } = stateDataAngkaMelekHuruf()
    const { setDataAngkaHarapanHidup } = stateDataAngkaHarapanHidup()
    const { setDataAngkaKeberlangsunganHidupBayi } = stateDataAngkaKeberlangsunganHidupBayi()
    const { setDataAngkaKematianIbuMelahirkan } = stateDataAngkaKematianIbuMelahirkan()
    const { setDataPerkembanganKondisiKetenagakerjaan } = stateDataPerkembanganKondisiKetenagakerjaan()
    const { setDataIndeksPembangunanGender } = stateDataIndeksPembangunanGender()
    const { setDataAngkaPartisipasiKasar } = stateDataAngkaPartisipasiKasar()
    const { setDataAngkaPartisipasiMurni } = stateDataAngkaPartisipasiMurni()
    const { setDataAngkaHarapanLamaSekolah } = stateDataAngkaHarapanLamaSekolah()
    const { setDataJumlahRumahTidakLayakHuni } = stateDataJumlahRumahTidakLayakHuni()
    const { setDataPersentasePendudukUsia } = stateDataPersentasePendudukUsia()
    const { setDataIndeksPemberdayaanGender } = stateDataIndeksPemberdayaanGender()
    const { setDataLajuInflasi } = stateDataLajuInflasi()
    const { setDataAtasDasarHargaBerlaku } = stateDataAtasDasarHargaBerlaku()
    const { setDataPMA } = stateDataPMA()
    const { setDataProduksiPerikananBudidaya } = stateDataProduksiPerikananBudidaya()
    const { setDataProduksiPerikananTangkap } = stateDataProduksiPerikananTangkap()
    const { setDataCapaianProduksiKomoditiUnggulanPerkebunan } = stateDataCapaianProduksiKomoditiUnggulanPerkebunan()
    const { setDataCapaianProduksiKomoditiHortikultura } = stateDataCapaianProduksiKomoditiHortikultura()
    const { setDataJumlahProduksiPeternakan } = stateDataJumlahProduksiPeternakan()
    const { setDataJumlahPendudukBerdasarkanKecamatan } = stateDataJumlahPendudukBerdasarkanKecamatan()
    const { setDataJumlahPendudukBerdasarkanKelompokUmur } = stateDataJumlahPendudukBerdasarkanKelompokUmur()
    const { setDataPersentaseTingkatKemantapanJalan } = stateDataPersentaseTingkatKemantapanJalan()
    const { setDataVideo } = stateDataVideo()
    // console.log('state', state);

    const datas = useQuery('dataJPM', async () => {
        const res = await axios.get(`${baseURL}/sosial/ppm`)
        setDataPenduduk(res?.data?.result)
        return res.data
    }, {
        retry: 0,
        keepPreviousData: true,
    })

    const dataIPM = useQuery('dataIPM', async () => {
        const res = await axios.get(`${baseURL}/sosial/ipm`)
        setDataIPM(res?.data?.result)
        return res.data
    }, {
        retry: 0,
        keepPreviousData: true,
        enabled: datas.isSuccess
    })

    const dataALS = useQuery('dataALS', async () => {
        const res = await axios.get(`${baseURL}/sosial/rls`)
        setDataLamaSekolah(res?.data?.result)
        return res.data
    }, {
        retry: 0,
        keepPreviousData: true,
        enabled: dataIPM.isSuccess
    })

    const dataIG = useQuery('dataIG', async () => {
        const res = await axios.get(`${baseURL}/sosial/ig`)
        setDataIndeksGini(res?.data?.result)
        return res.data
    }
        , {
            retry: 0,
            keepPreviousData: true,
            enabled: dataALS.isSuccess
        })

    const dataIDB = useQuery('dataIdb', async () => {
        const res = await axios.get(`${baseURL}/sosial/idb`)
        setDataIndeksDayaBeli(res?.data?.result)
        return res.data
    }, {
        retry: 0,
        keepPreviousData: true,
        enabled: dataIG.isSuccess
    })

    const dataPE = useQuery('dataPE', async () => {
        const res = await axios.get(`${baseURL}/ekonomi/pe`)
        setDataPertumbuhanEkonomi(res?.data?.result)
        return res.data
    }, {
        retry: 0,
        keepPreviousData: true,
        enabled: dataIDB.isSuccess
    })

    const dataKW = useQuery('dataKW', async () => {
        const res = await axios.get(`${baseURL}/ekonomi/kw`)
        setDataKunjunganWisata(res?.data?.result)
        return res.data
    }, {
        retry: 0,
        keepPreviousData: true,
        enabled: dataPE.isSuccess
    })

    const dataPP = useQuery('dataPP', async () => {
        const res = await axios.get(`${baseURL}/kependudukan/pp`)
        setDataPertumbuhanPenduduk(res?.data?.result)
        return res.data
    }, {
        retry: 0,
        keepPreviousData: true,
        enabled: dataKW.isSuccess
    })

    const dataPJD = useQuery('dataPJD', async () => {
        const res = await axios.get(`${baseURL}/infrastruktur/pjdd`)
        setDataPanjangJalanDibangun(res?.data?.result)
        return res.data
    }, {
        retry: 0,
        keepPreviousData: true,
        enabled: dataPP.isSuccess
    })

    const dataPRT = useQuery('dataPRT', async () => {
        const res = await axios.get(`${baseURL}/infrastruktur/prt`)
        setDataPenggunaanAirBersih(res?.data?.result)
        return res.data
    }, {
        retry: 0,
        keepPreviousData: true,
        enabled: dataPJD.isSuccess
    })

    const dataAMH = useQuery('dataAMH', async () => {
        const res = await axios.get(`${baseURL}/sosial/amh`)
        setDataAngkaMelekHuruf(res?.data?.result)
        return res.data
    }, {
        retry: 0,
        keepPreviousData: true,
        enabled: dataPJD.isSuccess
    })

    const dataAHH = useQuery('dataAHH', async () => {
        const res = await axios.get(`${baseURL}/sosial/ahh`)
        setDataAngkaHarapanHidup(res?.data?.result)
        return res.data
    }, {
        retry: 0,
        keepPreviousData: true,
        enabled: dataAMH.isSuccess
    })

    const dataAKHB = useQuery('dataAKHB', async () => {
        const res = await axios.get(`${baseURL}/sosial/akhb`)
        setDataAngkaKeberlangsunganHidupBayi(res?.data?.result)
        return res.data
    }, {
        retry: 0,
        keepPreviousData: true,
        enabled: dataAHH.isSuccess
    })

    const dataAKIM = useQuery('dataAKIM', async () => {
        const res = await axios.get(`${baseURL}/sosial/akim`)
        setDataAngkaKematianIbuMelahirkan(res?.data?.result)
        return res.data
    }, {
        retry: 0,
        keepPreviousData: true,
        enabled: dataAKHB.isSuccess
    })

    const dataPKK = useQuery('dataPKK', async () => {
        const res = await axios.get(`${baseURL}/sosial/pkk`)
        setDataPerkembanganKondisiKetenagakerjaan(res?.data?.result)
        return res.data
    }, {
        retry: 0,
        keepPreviousData: true,
        enabled: dataAKIM.isSuccess
    })

    const dataIPG = useQuery('dataIPG', async () => {
        const res = await axios.get(`${baseURL}/sosial/ipg`)
        setDataIndeksPembangunanGender(res?.data?.result)
        return res.data
    }, {
        retry: 0,
        keepPreviousData: true,
        enabled: dataPKK.isSuccess
    })

    const dataAPK = useQuery('dataAPK', async () => {
        const res = await axios.get(`${baseURL}/sosial/apk`)
        setDataAngkaPartisipasiKasar(res?.data?.result)
        return res.data
    }, {
        retry: 0,
        keepPreviousData: true,
        enabled: dataIPG.isSuccess
    })

    const dataAPM = useQuery('dataAPM', async () => {
        const res = await axios.get(`${baseURL}/sosial/apm`)
        setDataAngkaPartisipasiMurni(res?.data?.result)
        return res.data
    }, {
        retry: 0,
        keepPreviousData: true,
        enabled: dataAPK.isSuccess
    })

    const dataHLS = useQuery('dataHLS', async () => {
        const res = await axios.get(`${baseURL}/sosial/hls`)
        setDataAngkaHarapanLamaSekolah(res?.data?.result)
        return res.data
    }, {
        retry: 0,
        keepPreviousData: true,
        enabled: dataAPM.isSuccess
    })

    const dataJRTLH = useQuery('dataJRTLH', async () => {
        const res = await axios.get(`${baseURL}/sosial/jrtlh`)
        setDataJumlahRumahTidakLayakHuni(res?.data?.result)
        return res.data
    }, {
        retry: 0,
        keepPreviousData: true,
        enabled: dataHLS.isSuccess
    })

    const dataPPU = useQuery('dataPPU', async () => {
        const res = await axios.get(`${baseURL}/sosial/ppu`)
        setDataPersentasePendudukUsia(res?.data?.result)
        return res.data
    }, {
        retry: 0,
        keepPreviousData: true,
        enabled: dataJRTLH.isSuccess
    })

    const dataIPGG = useQuery('dataIPGG', async () => {
        const res = await axios.get(`${baseURL}/sosial/ipgg`)
        setDataIndeksPemberdayaanGender(res?.data?.result)
        return res.data
    }, {
        retry: 0,
        keepPreviousData: true,
        enabled: dataPPU.isSuccess
    })

    const dataLI = useQuery('dataLI', async () => {
        const res = await axios.get(`${baseURL}/ekonomi/li`)
        setDataLajuInflasi(res?.data?.result)
        return res.data
    }, {
        retry: 0,
        keepPreviousData: true,
        enabled: dataIPGG.isSuccess
    })

    const dataPMA = useQuery('dataPMA', async () => {
        const res = await axios.get(`${baseURL}/ekonomi/pma`)
        setDataPMA(res?.data?.result)
        return res.data
    }, {
        retry: 0,
        keepPreviousData: true,
        enabled: dataLI.isSuccess
    })

    const dataPPB = useQuery('dataPPB', async () => {
        const res = await axios.get(`${baseURL}/pertanian/ppb`)
        setDataProduksiPerikananBudidaya(res?.data?.result)
        return res.data
    }, {
        retry: 0,
        keepPreviousData: true,
        enabled: dataPMA.isSuccess
    })

    const dataPPT = useQuery('dataPPT', async () => {
        const res = await axios.get(`${baseURL}/pertanian/ppt`)
        setDataProduksiPerikananTangkap(res?.data?.result)
        return res.data
    }, {
        retry: 0,
        keepPreviousData: true,
        enabled: dataPPB.isSuccess
    })

    const dataCPKUP = useQuery('dataCPKUP', async () => {
        const res = await axios.get(`${baseURL}/pertanian/cpkup`)
        setDataCapaianProduksiKomoditiUnggulanPerkebunan(res?.data?.result)
        return res.data
    }, {
        retry: 0,
        keepPreviousData: true,
        enabled: dataPPT.isSuccess
    })

    const dataCPKH = useQuery('dataCPKH', async () => {
        const res = await axios.get(`${baseURL}/pertanian/cpkh`)
        setDataCapaianProduksiKomoditiHortikultura(res?.data?.result)
        return res.data
    }, {
        retry: 0,
        keepPreviousData: true,
        enabled: dataCPKUP.isSuccess
    })

    const dataJPP = useQuery('dataJPP', async () => {
        const res = await axios.get(`${baseURL}/pertanian/jpp`)
        setDataJumlahProduksiPeternakan(res?.data?.result)
        return res.data
    }, {
        retry: 0,
        keepPreviousData: true,
        enabled: dataCPKH.isSuccess
    })

    const dataJBPK = useQuery('dataJBPK', async () => {
        const res = await axios.get(`${baseURL}/kependudukan/jpbk`)
        setDataJumlahPendudukBerdasarkanKecamatan(res?.data?.result)
        return res.data
    }, {
        retry: 0,
        keepPreviousData: true,
        enabled: dataJPP.isSuccess
    })

    const dataJPBKU = useQuery('dataJPBKU', async () => {
        const res = await axios.get(`${baseURL}/kependudukan/jpbku`)
        setDataJumlahPendudukBerdasarkanKelompokUmur(res?.data?.result)
        return res.data
    }, {
        retry: 0,
        keepPreviousData: true,
        enabled: dataJBPK.isSuccess
    })

    const dataPTKJ = useQuery('dataPTKJ', async () => {
        const res = await axios.get(`${baseURL}/infrastruktur/ptkj`)
        setDataPersentaseTingkatKemantapanJalan(res?.data?.result)
        return res.data
    }, {
        retry: 0,
        keepPreviousData: true,
        enabled: dataJPBKU.isSuccess
    })

    const dataVideo = useQuery('dataVideo', async () => {
        const res = await axios.get(`${baseURL}/video`)
        setDataVideo(res?.data?.result)
        return res.data
    }, {
        retry: 0,
        keepPreviousData: true,
        enabled: dataPTKJ.isSuccess
    })


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
                        // data: datas.data.last_data
                    })}
                >
                    <View style={styles.innerCard}>
                        <Image source={pendudukmiskin} style={styles.iconImage} />
                        <View style={{ paddingHorizontal: 10, width: '82%' }}>
                            <Text style={styles.titleText}>Jumlah Penduduk Miskin</Text>
                            {
                                datas.isLoading === false ?
                                    <Text style={styles.subTitleText}>Tahun {datas?.data?.last_data[0].tahun}</Text>
                                    : <ActivityIndicator size="small" color="#fff" />
                            }
                            {
                                datas.isLoading === false ?
                                    <Text style={styles.subTitleText}>{datas?.data?.last_data[0].presentase} Orang</Text>
                                    : <ActivityIndicator size="small" color="#fff" />
                            }
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.cardDashbord}
                    onPress={() => navigation.navigate('DetailIPMDashboard', {
                        title: "Indeks Pembangunan Manusia",
                    })}
                >
                    <View style={styles.innerCard}>
                        <Image source={indexpembangunanmanusia} style={styles.iconImage} />
                        <View style={{ paddingHorizontal: 10, width: '84%' }}>
                            <Text numberOfLines={2} style={styles.titleText}>Indeks Pembangunan Manusia</Text>
                            {dataIPM.isLoading === false ?
                                <Text style={styles.subTitleText}>Tahun {dataIPM?.data?.last_data[0].tahun}</Text>
                                : <ActivityIndicator size="small" color="#fff" />
                            }
                            {dataIPM.isLoading === false ?
                                <Text style={styles.subTitleText}>{dataIPM?.data?.last_data[0].ipm} %</Text>
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
                            {dataALS.isLoading === false ?
                                <Text style={styles.subTitleText}>Tahun {dataALS?.data?.last_data[0].tahun}</Text>
                                : <ActivityIndicator size="small" color="#fff" />
                            }
                            {dataALS.isLoading === false ?
                                <Text style={styles.subTitleText}>{dataALS?.data?.last_data[0].rls} Tahun</Text>
                                : <ActivityIndicator size="small" color="#fff" />
                            }
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.cardDashbord}
                    onPress={() => navigation.navigate('DetailIGDashboard', {
                        title: "Indeks Gini",
                    })}
                >
                    <View style={styles.innerCard}>
                        <Image source={indexGini} style={styles.iconImage} />
                        <View style={{ paddingHorizontal: 10, width: '82%' }}>
                            <Text style={styles.titleText}>Indeks Gini</Text>
                            {dataIG.isLoading === false ?
                                <Text style={styles.subTitleText}>Tahun {dataIG?.data?.last_data[0].tahun}</Text>
                                : <ActivityIndicator size="small" color="#fff" />
                            }
                            {dataIG.isLoading === false ?
                                <Text style={styles.subTitleText}>{dataIG?.data?.last_data[0].gini_ratio} Point</Text>
                                : <ActivityIndicator size="small" color="#fff" />
                            }
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.cardDashbord}
                    onPress={() => navigation.navigate('DetailIDBDashboard', {
                        title: "Indeks Daya Beli"
                    }
                    )}
                >
                    <View style={styles.innerCard}>
                        <Image source={indexDayaBeli} style={styles.iconImage} />
                        <View style={{ paddingHorizontal: 10, width: '82%' }}>
                            <Text style={styles.titleText}>Indeks Daya Beli</Text>

                            {
                                dataIDB.isLoading === false ?
                                    <Text style={styles.subTitleText}>Tahun {dataIDB?.data?.last_data[0].tahun}</Text>
                                    : <ActivityIndicator size="small" color="#fff" />
                            }
                            {
                                dataIDB.isLoading === false ?
                                    <Text style={styles.subTitleText}>{dataIDB?.data?.last_data[0].daya_beli} Juta Rupiah</Text>
                                    : <ActivityIndicator size="small" color="#fff" />
                            }
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.cardDashbord}
                    onPress={() => navigation.navigate('DetailPEDashboard', {
                        title: "Pertumbuhan Ekonomi",
                    })}
                >
                    <View style={styles.innerCard}>
                        <Image source={pertumbuhanEkonomi} style={styles.iconImage} />
                        <View style={{ paddingHorizontal: 10, width: '82%' }}>
                            <Text style={styles.titleText}>Pertumbuhan Ekonomi</Text>
                            {
                                dataPE.isLoading === false ?
                                    <Text style={styles.subTitleText}>Tahun {dataPE?.data?.last_data[0].tahun}</Text>
                                    : <ActivityIndicator size="small" color="#fff" />
                            }
                            {
                                dataPE.isLoading === false ?
                                    <Text style={styles.subTitleText}>{dataPE?.data?.last_data[0].pertumbuhan_ekonomi} %</Text>
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
                                dataKW.isLoading === false ?
                                    <Text style={styles.subTitleText}>Tahun {dataKW?.data?.last_data[0].tahun}</Text>
                                    : <ActivityIndicator size="small" color="#fff" />
                            }
                            {
                                dataKW.isLoading === false ?
                                    <Text style={styles.subTitleText}>{dataKW?.data?.last_data[0].jumlah} Orang</Text>
                                    : <ActivityIndicator size="small" color="#fff" />
                            }
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.cardDashbord}
                    onPress={() => navigation.navigate('DetailPPDashboard', {
                        title: "Pertumbuhan Penduduk",
                    })}
                >
                    <View style={styles.innerCard}>
                        <Image source={pertumbuhanPenduduk} style={styles.iconImage} />
                        <View style={{ paddingHorizontal: 10, width: '82%' }}>
                            <Text style={styles.titleText}>Pertumbuhan Penduduk</Text>
                            {
                                dataPP.isLoading === false ?
                                    <Text style={styles.subTitleText}>Tahun {dataPP?.data?.last_data[0].tahun}</Text>
                                    : <ActivityIndicator size="small" color="#fff" />
                            }
                            {
                                dataPP.isLoading === false ?
                                    <Text style={styles.subTitleText}>{dataPP?.data?.last_data[0].laju} %</Text>
                                    : <ActivityIndicator size="small" color="#fff" />
                            }
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.cardDashbord}
                    onPress={() => navigation.navigate('DetailPJDDDashboard', {
                        title: "Panjang Jalan Dibangun",
                    })}
                >
                    <View style={styles.innerCard}>
                        <Image source={panjangJalanDibangun} style={styles.iconImage} />
                        <View style={{ paddingHorizontal: 10, width: '82%' }}>
                            <Text style={styles.titleText}>Panjang Jalan Dibangun</Text>
                            {
                                dataPJD.isLoading === false ?
                                    <Text style={styles.subTitleText}>Tahun {dataPJD?.data?.last_data[0].tahun}</Text>
                                    : <ActivityIndicator size="small" color="#fff" />
                            }
                            {
                                dataPJD.isLoading === false ?
                                    <Text style={styles.subTitleText}>{dataPJD?.data?.last_data[0].panjang} Km</Text>
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
                        }
                    )}
                >
                    <View style={styles.innerCard}>
                        <Image source={penggunaanAirBersih} style={styles.iconImage} />
                        <View style={{ paddingHorizontal: 10, width: '82%' }}>
                            <Text style={styles.titleText}>Persentase Penggunaan Air Bersih</Text>
                            {
                                dataPRT.isLoading === false ?
                                    <Text style={styles.subTitleText}>Tahun {dataPRT?.data?.last_data[0].tahun}</Text>
                                    : <ActivityIndicator size="small" color="#fff" />
                            }
                            {
                                dataPRT.isLoading === false ?
                                    <Text style={styles.subTitleText}>{dataPRT?.data?.last_data[0].nilai} %</Text>
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