import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import * as React from 'react';
import { List } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon2 from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';

import LogoBintan from '../assets/bintan.png'

const DrawerContent = () => {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <View style={styles.titleHeader}>
                <Image source={LogoBintan} style={{ width: 100, height: 100 }} />
                <Text style={styles.titleText}>Smart Bintan in Hands</Text>
            </View>
            <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center' }}
                onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}
            >
                <Icon name="home" size={30} color="black" style={{ marginVertical: 10, marginHorizontal: 10 }} />
                <Text style={{ marginVertical: 10, marginHorizontal: 10, color: 'black', fontSize: 12  }}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center' }}
                onPress={()=> navigation.navigate('TentangKami')}
            >
                <Icon2 name="infocirlce" size={26} color="black" style={{ marginVertical: 10, marginHorizontal: 10 }} />
                <Text style={{ marginVertical: 10, marginHorizontal: 10, color: 'black', fontSize: 12  }}>Tentang Kami</Text>
            </TouchableOpacity>
            {/* separator */}
            <View style={{ borderBottomWidth: 1, borderBottomColor: 'black', marginVertical: 5 }}></View>


            <List.Section title="Kategori" titleStyle={{ fontSize: 12 }}>
                <List.Accordion
                    title="Sosial"
                    titleStyle={{ fontSize: 12 }}
                    left={props => {
                        const { key, ...restProps } = props;
                        return <List.Icon {...restProps} icon="folder" />;
                    }}>
                    <List.Item titleNumberOfLines={2} title="% Penduduk Miskin" titleStyle={{ fontSize: 12 }} onPress={() => navigation.navigate('DetailDashboard')} />
                    <List.Item titleNumberOfLines={2} title="Index Pembangunan Manusia" titleStyle={{ fontSize: 12 }} onPress={() => navigation.navigate('DetailIPMDashboard')} />
                    <List.Item titleNumberOfLines={2} title="Angka Rata-Rata Lama Sekolah" titleStyle={{ fontSize: 12 }} onPress={() => navigation.navigate('DetailRLSDashboard')} />
                    <List.Item titleNumberOfLines={2} title="Angka Melek Huruf" titleStyle={{ fontSize: 12 }} onPress={() => navigation.navigate('DetailAMHDashboard')} />
                    <List.Item titleNumberOfLines={2} title="Angka Harapan Hidup" titleStyle={{ fontSize: 12 }} onPress={() => navigation.navigate('DetailAHHDashboard')} />
                    <List.Item titleNumberOfLines={2} title="Angka Keberlangsungan Hidup Bayi" titleStyle={{ fontSize: 12 }} onPress={() => navigation.navigate('DetailAKHBDashboard')}/>
                    <List.Item titleNumberOfLines={3} titleMaxFontSizeMultiplier={18} title="Angka Kematian Ibu Melahirkan" titleStyle={{ fontSize: 12 }} onPress={() => navigation.navigate('DetailAKIMDashboard')}/>
                    <List.Item titleNumberOfLines={2} title="Perkembangan Kondisi Ketenagakerjaan" titleStyle={{ fontSize: 12 }} onPress={() => navigation.navigate('DetailPKKDashboard')}/>
                    <List.Item titleNumberOfLines={2} title="Index Pembangunan Gender" titleStyle={{ fontSize: 12 }} onPress={() => navigation.navigate('DetailIPGDashboard')} />
                    <List.Item titleNumberOfLines={2} title="Angka Partisipasi Kasar" titleStyle={{ fontSize: 12 }} onPress={() => navigation.navigate('DetailAPKDashboard')}  />
                    <List.Item titleNumberOfLines={2} title="Angka Partisipasi Murni" titleStyle={{ fontSize: 12 }} onPress={() => navigation.navigate('DetailAPMDashboard')}  />
                    <List.Item titleNumberOfLines={2} title="Angka Harapan Lama Sekolah" titleStyle={{ fontSize: 12 }} onPress={() => navigation.navigate('DetailHLSDashboard')} />
                    <List.Item titleNumberOfLines={2} title="Jumlah Rumah Tidak Layak Huni yang Di Rehab" titleStyle={{ fontSize: 12 }} onPress={() => navigation.navigate('DetailJRTLHDashboard')} />
                    <List.Item titleNumberOfLines={2} title="Index Gini" titleStyle={{ fontSize: 12 }} onPress={() => navigation.navigate("DetailIGDashboard")} />
                    {/* <List.Item titleNumberOfLines={2} title="Index Daya Beli (Purchasing Power Parity)" onPress={() => navigation.navigate("DetailIDBDashboard")} /> */}
                    <List.Item titleNumberOfLines={3} titleMaxFontSizeMultiplier={18} title="% Penduduk Usia 15 Tahun Ke Atas Menurut Pendidikan yang Di Tamatkan" titleStyle={{ fontSize: 12 }} onPress={() => navigation.navigate("DetailPPUDashboard")}/>
                    <List.Item titleNumberOfLines={2} title="Index pemberdayaan Gender" titleStyle={{ fontSize: 12 }} onPress={() => navigation.navigate("DetailIPGGDashboard")}/>

                </List.Accordion>
                <List.Accordion
                    title="Ekonomi"
                    titleStyle={{ fontSize: 12 }}
                    left={props => {
                        const { key, ...restProps } = props;
                        return <List.Icon {...restProps} icon="folder" />;
                    }}>
                    <List.Item titleNumberOfLines={2} title="Pertumbuhan Ekonomi" titleStyle={{ fontSize: 12 }} onPress={() => navigation.navigate("DetailPEDashboard")} />
                    <List.Item titleNumberOfLines={2} title="Tingkat Inflasi" titleStyle={{ fontSize: 12 }} onPress={() => navigation.navigate("DetailLIDashboard")} />
                    <List.Item titleNumberOfLines={2} title="Kunjungan Wisata" titleStyle={{ fontSize: 12 }} onPress={() => navigation.navigate("DetailKWDashboard")} />
                    <List.Item titleNumberOfLines={2} title="Realisasi Investasi PMA / PMDN" titleStyle={{ fontSize: 12 }} onPress={() => navigation.navigate("DetailPMADashboard")}/>
                    <List.Item titleNumberOfLines={2} title="PDRB ADHB" titleStyle={{ fontSize: 12 }} onPress={() => navigation.navigate("DetailADHBDashboard")} />
                    <List.Item titleNumberOfLines={2} title="PDRB ADHK" titleStyle={{ fontSize: 12 }} onPress={() => navigation.navigate("DetailADHKDashboard")}/>
                </List.Accordion>
                <List.Accordion
                    title="Pertanian dan Perikanan"
                    titleStyle={{ fontSize: 12 }}
                    left={props => {
                        const { key, ...restProps } = props;
                        return <List.Icon {...restProps} icon="folder" />;
                    }}>
                    <List.Item titleNumberOfLines={2} title="Produksi Perikanan Budidaya" titleStyle={{ fontSize: 12 }} onPress={() => navigation.navigate("DetailPPBDashboard")}/>
                    <List.Item titleNumberOfLines={2} title="Produksi Perikanan Tangkap" titleStyle={{ fontSize: 12 }} onPress={() => navigation.navigate("DetailPPTDashboard")}/>
                    <List.Item titleNumberOfLines={3} title="Capaian Produksi Komoditi Unggulan Perkebunan" titleStyle={{ fontSize: 12 }} onPress={() => navigation.navigate("DetailCPKUPDashboard")} />
                    <List.Item titleNumberOfLines={2} title="Capaian Produksi Komoditi Hortikultura" titleStyle={{ fontSize: 12 }} onPress={() => navigation.navigate("DetailCPKHDashboard")} />
                    <List.Item titleNumberOfLines={2} title="Jumlah Produksi Peternakan" titleStyle={{ fontSize: 12 }} onPress={() => navigation.navigate("DetailJPPDashboard")}/>
                </List.Accordion>
                <List.Accordion
                    title="Kependudukan"
                    titleStyle={{ fontSize: 12 }}
                    left={props => {
                        const { key, ...restProps } = props;
                        return <List.Icon {...restProps} icon="folder" />;
                    }}>
                    <List.Item titleNumberOfLines={2} title="Pertumbuhan Penduduk" titleStyle={{ fontSize: 12 }} onPress={() => navigation.navigate("DetailPPDashboard")}/>
                    <List.Item titleNumberOfLines={2} title="Jumlah Penduduk" titleStyle={{ fontSize: 12 }} onPress={() => navigation.navigate("DetailJPDashboard")}/>
                    <List.Item titleNumberOfLines={3} title="Jumlah Penduduk Berdasarkan Kelompok Umur" titleStyle={{ fontSize: 12 }} onPress={() => navigation.navigate("DetailJPBKUDashboard")}/>
                    <List.Item titleNumberOfLines={3} title="Jumlah Penduduk berdasarkan Kecamatan" titleStyle={{ fontSize: 12 }} onPress={() => navigation.navigate("DetailJPBKDashboard")}/>
                </List.Accordion>
                <List.Accordion
                    title="Infrastruktur"
                    titleStyle={{ fontSize: 12 }}
                    left={props => {
                        const { key, ...restProps } = props;
                        return <List.Icon {...restProps} icon="folder" />;
                    }}>
                    <List.Item titleNumberOfLines={3} title="Panjang Jalan yang Di Bangun dan Ditingkatkan" titleStyle={{ fontSize: 12 }} onPress={() => navigation.navigate("DetailPJDDDashboard")} />
                    <List.Item titleNumberOfLines={3} title="% Rumah Tangga yang Menggunakan Air Bersih" titleStyle={{ fontSize: 12 }} onPress={() => navigation.navigate("DetailPRTDashboard")} />
                    <List.Item titleNumberOfLines={3} title="% Tingkat Kemantapan Jalan (Mantap Sempurna)" titleStyle={{ fontSize: 12 }} onPress={() => navigation.navigate("DetailPTKJDashboard")} />
                </List.Accordion>
                <List.Accordion
                    title="Video"
                    titleStyle={{ fontSize: 12 }}
                    left={props => {
                        const { key, ...restProps } = props;
                        return <List.Icon {...restProps} icon="folder" />;
                    }}>
                    <List.Item titleNumberOfLines={2} title="Video" titleStyle={{ fontSize: 12 }} onPress={() => navigation.navigate('DetailVideoDashboard')} />
                </List.Accordion>
            </List.Section>
            {/* separator with text inline */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
                <View style={{ borderBottomWidth: 1, borderBottomColor: 'black', flex: 1 }}></View>
                <Text style={{ marginHorizontal: 5, color: 'black', fontSize: 12  }}>E-money</Text>
                <View style={{ borderBottomWidth: 1, borderBottomColor: 'black', flex: 1 }}></View>
            </View>
            <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center' }}
                onPress={() => navigation.navigate('DashboardAnggaranMurni')}
            >
                <Icon name="chart-box" size={30} color="black" style={{ marginVertical: 10, marginHorizontal: 10  }} />
                <Text style={{ marginVertical: 10, marginHorizontal: 10, color: 'black', fontSize: 12  }}>Anggaran Murni dan Perubahan</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center' }}
            >
                <Icon name="chart-tree" size={30} color="black" style={{ marginVertical: 10, marginHorizontal: 10 }} />
                <Text style={{ marginVertical: 10, marginHorizontal: 10, color: 'black'  }}>Realisasi OPD</Text>
            </TouchableOpacity> */}
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
        color: 'white',
        fontSize: 12
    }
})