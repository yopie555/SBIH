import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, ImageBackground, RefreshControl, Alert, Animated } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import axios, { AxiosError } from 'axios'
import { baseURL } from '../../constants/General'
import { useQuery } from 'react-query'
import Icon from 'react-native-vector-icons/Ionicons'
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
import { stateDataJumlahPenduduk } from '../../state/dataJP'

import headerImage from '../../assets/1.png'
import pendudukmiskin from '../../assets/pendudukmis.png'
import indexpembangunanmanusia from '../../assets/IPM.png'
import AngkaSekolah from '../../assets/ALS.png'
import pertumbuhanEkonomi from '../../assets/PE.png'
import pertumbuhanPenduduk from '../../assets/PP.png'
import privalensiStunting from '../../assets/PS.png'
import tingkatPengangguran from '../../assets/TPT.png'

const AnimatedCard = ({ children, delay = 0 }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(30)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                delay,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 500,
                delay,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <Animated.View
            style={{
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
            }}
        >
            {children}
        </Animated.View>
    );
};

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
    const { setDataJumlahPenduduk } = stateDataJumlahPenduduk()

    const [refreshing, setRefreshing] = useState(false);

    // Helper function to format numbers with null check
    const formatNumber = (num) => {
        if (!num && num !== 0) return '0';
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    // 1. Pertumbuhan Ekonomi
    const dataPE = useQuery('dataPE', async () => {
        const res = await axios.get(`${baseURL}/ekonomi/pe`)
        setDataPertumbuhanEkonomi(res?.data?.result)
        return res.data
    }, { retry: 0, keepPreviousData: true })

    // 2. Indeks Pembangunan Manusia
    const dataIPM = useQuery('dataIPM', async () => {
        const res = await axios.get(`${baseURL}/sosial/ipm`)
        setDataIPM(res?.data?.result)
        return res.data
    }, { retry: 0, keepPreviousData: true, enabled: dataPE.isSuccess })

    // 3. Tingkat Kemiskinan
    const datas = useQuery('dataJPM', async () => {
        const res = await axios.get(`${baseURL}/sosial/ppm`)
        setDataPenduduk(res?.data?.result)
        return res.data
    }, { retry: 0, keepPreviousData: true, enabled: dataIPM.isSuccess })

    // 5. Tingkat Inflasi
    const dataLI = useQuery('dataLI', async () => {
        const res = await axios.get(`${baseURL}/ekonomi/li`)
        setDataLajuInflasi(res?.data?.result)
        return res.data
    }, { retry: 0, keepPreviousData: true, enabled: datas.isSuccess })

    // 6. Tingkat Pengangguran Terbuka
    const dataPKK = useQuery('dataPKK', async () => {
        const res = await axios.get(`${baseURL}/sosial/pkk`)
        setDataPerkembanganKondisiKetenagakerjaan(res?.data?.result)
        return res.data
    }, { retry: 0, keepPreviousData: true, enabled: dataLI.isSuccess })

    // 7. Jumlah Penduduk
    const dataJP = useQuery('dataJP', async () => {
        const res = await axios.get(`${baseURL}/kependudukan/jp`)
        setDataJumlahPenduduk(res?.data?.result)
        return res.data
    }, { retry: 0, keepPreviousData: true, enabled: dataPKK.isSuccess })

    // Continue with other APIs
    const dataALS = useQuery('dataALS', async () => {
        const res = await axios.get(`${baseURL}/sosial/rls`)
        setDataLamaSekolah(res?.data?.result)
        return res.data
    }, { retry: 0, keepPreviousData: true, enabled: dataJP.isSuccess })

    const dataIG = useQuery('dataIG', async () => {
        const res = await axios.get(`${baseURL}/sosial/ig`)
        setDataIndeksGini(res?.data?.result)
        return res.data
    }, { retry: 0, keepPreviousData: true, enabled: dataALS.isSuccess })

    const dataIDB = useQuery('dataIdb', async () => {
        const res = await axios.get(`${baseURL}/sosial/idb`)
        setDataIndeksDayaBeli(res?.data?.result)
        return res.data
    }, { retry: 0, keepPreviousData: true, enabled: dataIG.isSuccess })

    const dataKW = useQuery('dataKW', async () => {
        const res = await axios.get(`${baseURL}/ekonomi/kw`)
        setDataKunjunganWisata(res?.data?.result)
        return res.data
    }, { retry: 0, keepPreviousData: true, enabled: dataIDB.isSuccess })

    const dataPP = useQuery('dataPP', async () => {
        const res = await axios.get(`${baseURL}/kependudukan/pp`)
        setDataPertumbuhanPenduduk(res?.data?.result)
        return res.data
    }, { retry: 0, keepPreviousData: true, enabled: dataKW.isSuccess })

    const dataPJD = useQuery('dataPJD', async () => {
        const res = await axios.get(`${baseURL}/infrastruktur/pjdd`)
        setDataPanjangJalanDibangun(res?.data?.result)
        return res.data
    }, { retry: 0, keepPreviousData: true, enabled: dataPP.isSuccess })

    const dataPRT = useQuery('dataPRT', async () => {
        const res = await axios.get(`${baseURL}/infrastruktur/prt`)
        setDataPenggunaanAirBersih(res?.data?.result)
        return res.data
    }, { retry: 0, keepPreviousData: true, enabled: dataPJD.isSuccess })

    const dataAMH = useQuery('dataAMH', async () => {
        const res = await axios.get(`${baseURL}/sosial/amh`)
        setDataAngkaMelekHuruf(res?.data?.result)
        return res.data
    }, { retry: 0, keepPreviousData: true, enabled: dataPRT.isSuccess })

    const dataAHH = useQuery('dataAHH', async () => {
        const res = await axios.get(`${baseURL}/sosial/ahh`)
        setDataAngkaHarapanHidup(res?.data?.result)
        return res.data
    }, { retry: 0, keepPreviousData: true, enabled: dataAMH.isSuccess })

    const dataAKHB = useQuery('dataAKHB', async () => {
        const res = await axios.get(`${baseURL}/sosial/akhb`)
        setDataAngkaKeberlangsunganHidupBayi(res?.data?.result)
        return res.data
    }, { retry: 0, keepPreviousData: true, enabled: dataAHH.isSuccess })

    const dataAKIM = useQuery('dataAKIM', async () => {
        const res = await axios.get(`${baseURL}/sosial/akim`)
        setDataAngkaKematianIbuMelahirkan(res?.data?.result)
        return res.data
    }, { retry: 0, keepPreviousData: true, enabled: dataAKHB.isSuccess })

    const dataIPG = useQuery('dataIPG', async () => {
        const res = await axios.get(`${baseURL}/sosial/ipg`)
        setDataIndeksPembangunanGender(res?.data?.result)
        return res.data
    }, { retry: 0, keepPreviousData: true, enabled: dataAKIM.isSuccess })

    const dataAPK = useQuery('dataAPK', async () => {
        const res = await axios.get(`${baseURL}/sosial/apk`)
        setDataAngkaPartisipasiKasar(res?.data?.result)
        return res.data
    }, { retry: 0, keepPreviousData: true, enabled: dataIPG.isSuccess })

    const dataAPM = useQuery('dataAPM', async () => {
        const res = await axios.get(`${baseURL}/sosial/apm`)
        setDataAngkaPartisipasiMurni(res?.data?.result)
        return res.data
    }, { retry: 0, keepPreviousData: true, enabled: dataAPK.isSuccess })

    const dataHLS = useQuery('dataHLS', async () => {
        const res = await axios.get(`${baseURL}/sosial/hls`)
        setDataAngkaHarapanLamaSekolah(res?.data?.result)
        return res.data
    }, { retry: 0, keepPreviousData: true, enabled: dataAPM.isSuccess })

    const dataJRTLH = useQuery('dataJRTLH', async () => {
        const res = await axios.get(`${baseURL}/sosial/jrtlh`)
        setDataJumlahRumahTidakLayakHuni(res?.data?.result)
        return res.data
    }, { retry: 0, keepPreviousData: true, enabled: dataHLS.isSuccess })

    const dataPPU = useQuery('dataPPU', async () => {
        const res = await axios.get(`${baseURL}/sosial/ppu`)
        setDataPersentasePendudukUsia(res?.data?.result)
        return res.data
    }, { retry: 0, keepPreviousData: true, enabled: dataJRTLH.isSuccess })

    const dataIPGG = useQuery('dataIPGG', async () => {
        const res = await axios.get(`${baseURL}/sosial/ipgg`)
        setDataIndeksPemberdayaanGender(res?.data?.result)
        return res.data
    }, { retry: 0, keepPreviousData: true, enabled: dataPPU.isSuccess })

    const dataPMA = useQuery('dataPMA', async () => {
        const res = await axios.get(`${baseURL}/ekonomi/pma`)
        setDataPMA(res?.data?.result)
        return res.data
    }, { retry: 0, keepPreviousData: true, enabled: dataIPGG.isSuccess })

    const dataPPB = useQuery('dataPPB', async () => {
        const res = await axios.get(`${baseURL}/pertanian/ppb`)
        setDataProduksiPerikananBudidaya(res?.data?.result)
        return res.data
    }, { retry: 0, keepPreviousData: true, enabled: dataPMA.isSuccess })

    const dataPPT = useQuery('dataPPT', async () => {
        const res = await axios.get(`${baseURL}/pertanian/ppt`)
        setDataProduksiPerikananTangkap(res?.data?.result)
        return res.data
    }, { retry: 0, keepPreviousData: true, enabled: dataPPB.isSuccess })

    const dataCPKUP = useQuery('dataCPKUP', async () => {
        const res = await axios.get(`${baseURL}/pertanian/cpkup`)
        setDataCapaianProduksiKomoditiUnggulanPerkebunan(res?.data?.result)
        return res.data
    }, { retry: 0, keepPreviousData: true, enabled: dataPPT.isSuccess })

    const dataCPKH = useQuery('dataCPKH', async () => {
        const res = await axios.get(`${baseURL}/pertanian/cpkh`)
        setDataCapaianProduksiKomoditiHortikultura(res?.data?.result)
        return res.data
    }, { retry: 0, keepPreviousData: true, enabled: dataCPKUP.isSuccess })

    const dataJPP = useQuery('dataJPP', async () => {
        const res = await axios.get(`${baseURL}/pertanian/jpp`)
        setDataJumlahProduksiPeternakan(res?.data?.result)
        return res.data
    }, { retry: 0, keepPreviousData: true, enabled: dataCPKH.isSuccess })

    const dataJBPK = useQuery('dataJBPK', async () => {
        const res = await axios.get(`${baseURL}/kependudukan/jpbk`)
        setDataJumlahPendudukBerdasarkanKecamatan(res?.data?.result)
        return res.data
    }, { retry: 0, keepPreviousData: true, enabled: dataJPP.isSuccess })

    const dataJPBKU = useQuery('dataJPBKU', async () => {
        const res = await axios.get(`${baseURL}/kependudukan/jpbku`)
        setDataJumlahPendudukBerdasarkanKelompokUmur(res?.data?.result)
        return res.data
    }, { retry: 0, keepPreviousData: true, enabled: dataJBPK.isSuccess })

    const dataPTKJ = useQuery('dataPTKJ', async () => {
        const res = await axios.get(`${baseURL}/infrastruktur/ptkj`)
        setDataPersentaseTingkatKemantapanJalan(res?.data?.result)
        return res.data
    }, { retry: 0, keepPreviousData: true, enabled: dataJPBKU.isSuccess })

    const dataVideo = useQuery('dataVideo', async () => {
        const res = await axios.get(`${baseURL}/video`)
        setDataVideo(res?.data?.result)
        return res.data
    }, { retry: 0, keepPreviousData: true, enabled: dataPTKJ.isSuccess })

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        Promise.all([
            dataPE.refetch(),
            dataIPM.refetch(),
            datas.refetch(),
            dataLI.refetch(),
            dataPKK.refetch(),
            dataJP.refetch(),
            dataALS.refetch(),
            dataIG.refetch(),
            dataIDB.refetch(),
            dataKW.refetch(),
            dataPP.refetch(),
            dataPJD.refetch(),
            dataPRT.refetch(),
            dataAMH.refetch(),
            dataAHH.refetch(),
            dataAKHB.refetch(),
            dataAKIM.refetch(),
            dataIPG.refetch(),
            dataAPK.refetch(),
            dataAPM.refetch(),
            dataHLS.refetch(),
            dataJRTLH.refetch(),
            dataPPU.refetch(),
            dataIPGG.refetch(),
            dataPMA.refetch(),
            dataPPB.refetch(),
            dataPPT.refetch(),
            dataCPKUP.refetch(),
            dataCPKH.refetch(),
            dataJPP.refetch(),
            dataJBPK.refetch(),
            dataJPBKU.refetch(),
            dataPTKJ.refetch(),
            dataVideo.refetch()
        ]).finally(() => setRefreshing(false));
    }, []);

    const dashboardCards = [
        {
            title: 'Pertumbuhan Ekonomi',
            icon: pertumbuhanEkonomi,
            iconName: 'trending-up',
            color: '#1e88e5',
            data: dataPE,
            getValue: () => dataPE?.data?.last_data?.[0]?.pertumbuhan_ekonomi ? `${dataPE.data.last_data[0].pertumbuhan_ekonomi} %` : '0 %',
            route: 'DetailPEDashboard',
        },
        {
            title: 'Indeks Pembangunan Manusia',
            icon: indexpembangunanmanusia,
            iconName: 'people',
            color: '#43a047',
            data: dataIPM,
            getValue: () => dataIPM?.data?.last_data?.[0]?.ipm ? `${dataIPM.data.last_data[0].ipm} %` : '0 %',
            route: 'DetailIPMDashboard',
        },
        {
            title: 'Tingkat Kemiskinan',
            icon: pendudukmiskin,
            iconName: 'hand-right',
            color: '#e53935',
            data: datas,
            getValue: () => datas?.data?.last_data?.[0]?.presentase ? `${datas.data.last_data[0].presentase} %` : '0 %',
            route: 'DetailDashboard',
        },
        {
            title: 'Privalensi Stunting',
            icon: privalensiStunting,
            iconName: 'fitness',
            color: '#fb8c00',
            data: { isFetched: true, isLoading: false },
            getValue: () => '3.49 %',
            year: '2023',
            route: 'DetailPSDashboard',
        },
        {
            title: 'Tingkat Inflasi',
            icon: AngkaSekolah,
            iconName: 'stats-chart',
            color: '#8e24aa',
            data: dataLI,
            getValue: () => dataLI?.data?.last_data?.[0]?.umum ? `${dataLI.data.last_data[0].umum} %` : '0 %',
            route: 'DetailLIDashboard',
        },
        {
            title: 'Tingkat Pengangguran Terbuka',
            icon: tingkatPengangguran,
            iconName: 'briefcase',
            color: '#00897b',
            data: dataPKK,
            getValue: () => dataPKK?.data?.last_data?.[0]?.tingkat_pengangguran ? `${dataPKK.data.last_data[0].tingkat_pengangguran} %` : '0 %',
            route: 'DetailPKKDashboard',
        },
        {
            title: 'Jumlah Penduduk',
            icon: pertumbuhanPenduduk,
            iconName: 'people-circle',
            color: '#3949ab',
            data: dataJP,
            getValue: () => {
                if (!dataJP?.data?.last_data?.[0]) {
                    return {
                        laki: '0',
                        perempuan: '0',
                        total: '0',
                    };
                }
                return {
                    laki: formatNumber(dataJP.data.last_data[0].laki),
                    perempuan: formatNumber(dataJP.data.last_data[0].perempuan),
                    total: formatNumber(dataJP.data.last_data[0].total),
                };
            },
            route: 'DetailJPDashboard',
            isPopulation: true,
        },
    ];

    return (
        <View style={styles.container}>
            <ImageBackground
                source={headerImage}
                style={styles.headerImage}
            >
                <View style={styles.statusIndicator}>
                    <View style={[styles.statusDot, { backgroundColor: dataVideo.isFetched ? '#4caf50' : '#f44336' }]} />
                    <Text style={styles.statusText}>{dataVideo.isFetched ? 'Online' : 'Loading'}</Text>
                </View>
            </ImageBackground>
            
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={['#0074BD']}
                    />
                }
                showsVerticalScrollIndicator={false}
            >

                {dashboardCards.map((card, index) => (
                    <AnimatedCard key={index} delay={index * 50}>
                        <TouchableOpacity
                            style={styles.modernCard}
                            onPress={() => {
                                if (card.data.isFetched) {
                                    navigation.navigate(card.route, { title: card.title })
                                } else {
                                    Alert.alert('Info', 'Data belum tersedia')
                                }
                            }}
                            activeOpacity={0.9}
                        >
                            <View style={[styles.cardGradient, { backgroundColor: card.color }]}>
                                <View style={styles.cardHeader}>
                                    <View style={styles.iconWrapper}>
                                        <Image source={card.icon} style={styles.cardIcon} />
                                    </View>
                                    <Icon name={card.iconName} size={28} color="rgba(255,255,255,0.9)" />
                                </View>
                                
                                <View style={styles.cardBody}>
                                    <Text style={styles.cardTitle} numberOfLines={2}>{card.title}</Text>
                                    
                                    {card.data.isLoading ? (
                                        <ActivityIndicator size="small" color="#fff" style={styles.loader} />
                                    ) : (
                                        <>
                                            <Text style={styles.cardYear}>
                                                Tahun {card.year || card.data?.data?.last_data?.[0]?.tahun || '-'}
                                            </Text>
                                            
                                            {card.isPopulation ? (
                                                <View style={styles.populationData}>
                                                    <Text style={styles.cardValue}>Laki: {card.getValue().laki} Orang</Text>
                                                    <Text style={styles.cardValue}>Perempuan: {card.getValue().perempuan} Orang</Text>
                                                    <Text style={styles.cardValueTotal}>Total: {card.getValue().total} Orang</Text>
                                                </View>
                                            ) : (
                                                <Text style={styles.cardValue}>{card.getValue()}</Text>
                                            )}
                                        </>
                                    )}
                                </View>

                                <View style={styles.cardFooter}>
                                    <Text style={styles.cardFooterText}>Tap untuk detail</Text>
                                    <Icon name="chevron-forward" size={20} color="rgba(255,255,255,0.8)" />
                                </View>
                            </View>
                        </TouchableOpacity>
                    </AnimatedCard>
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f7fa',
    },
    headerImage: {
        width: '100%',
        height: 180,
    },
    statusIndicator: {
        position: 'absolute',
        top: 15,
        right: 15,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        gap: 6,
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    statusText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    scrollContent: {
        paddingBottom: 30,
    },
    modernCard: {
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 16,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        overflow: 'hidden',
    },
    cardGradient: {
        padding: 20,
        minHeight: 140,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    iconWrapper: {
        width: 56,
        height: 56,
        backgroundColor: 'rgba(255,255,255,0.25)',
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardIcon: {
        width: 50,
        height: 50,
    },
    cardBody: {
        marginBottom: 12,
        minHeight: 60,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
        lineHeight: 26,
    },
    cardYear: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.9)',
        marginBottom: 6,
    },
    cardValue: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
        marginTop: 2,
    },
    cardValueTotal: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
        marginTop: 4,
    },
    populationData: {
        marginTop: 4,
    },
    loader: {
        marginVertical: 8,
    },
    cardFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 6,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.2)',
    },
    cardFooterText: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.85)',
        fontWeight: '500',
    },
})

export default Index