import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import * as React from 'react';
import { List } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon2 from 'react-native-vector-icons/AntDesign'

import LogoBintan from '../assets/bintan.png'

const DrawerContent = () => {
    return (
        <View style={styles.container}>
            <View style={styles.titleHeader}>
                <Image source={LogoBintan} style={{ width: 100, height: 100 }} />
                <Text style={styles.titleText}>Smart Bintan in Hands</Text>
            </View>
            <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center' }}
            >
                <Icon name="home" size={30} color="black" style={{ marginVertical: 10, marginHorizontal: 10 }} />
                <Text style={{ marginVertical: 10, marginHorizontal: 10 }}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center' }}
            >
                <Icon2 name="setting" size={30} color="black" style={{ marginVertical: 10, marginHorizontal: 10 }} />
                <Text style={{ marginVertical: 10, marginHorizontal: 10 }}>Tentang Kami</Text>
            </TouchableOpacity>
            {/* separator */}
            <View style={{ borderBottomWidth: 1, borderBottomColor: 'black', marginVertical: 5 }}></View>


            <List.Section title="Kategori">
                <List.Accordion
                    title="Sosial"
                    left={props => <List.Icon {...props} icon="folder" />}>
                    <List.Item titleNumberOfLines={2} title="Persentase Penduduk Miskin" />
                    <List.Item titleNumberOfLines={2} title="Index Pembangunan Manusia (IPM)" />
                    <List.Item titleNumberOfLines={2} title="Angka Rata-Rata Lama Sekolah (RLS)" />
                    <List.Item titleNumberOfLines={2} title="Angka Melek Huruf (AMH)" />
                    <List.Item titleNumberOfLines={2} title="Angka Haraoan Hidup (AHH)" />
                    <List.Item titleNumberOfLines={2} title="Angka Keberlangsungan Hidup Bayi (AKBH)" />
                    <List.Item titleNumberOfLines={3} titleMaxFontSizeMultiplier={18} title="Angka Kematian Ibu Melahirkan per 100.000 kelahiran hidup" />
                    <List.Item titleNumberOfLines={2} title="Perkembangan Kondisi Ketenagakerjaan di Kabupaten Bintan" />
                    <List.Item titleNumberOfLines={2} title="Index Pembangunan Gender" />
                    <List.Item titleNumberOfLines={2} title="Angka Partisipasi Kasar" />
                    <List.Item titleNumberOfLines={2} title="Angka Harapan Lama Sekolah (HLS)" />
                    <List.Item titleNumberOfLines={2} title="Jumlah Rumah Tidak Layak Huni yang Di Rehab" />
                    <List.Item titleNumberOfLines={2} title="Index Gini" />
                    <List.Item titleNumberOfLines={2} title="Index Daya Beli (Purchasing Power Parity)" />
                    <List.Item titleNumberOfLines={3} titleMaxFontSizeMultiplier={18} title="Persentase Penduduk Usia 15 Tahun Ke Atas Menurut Pendidikan yang Di Tamatkan" />
                    <List.Item titleNumberOfLines={2} title="Index pemberdayaan Gender" />

                </List.Accordion>
                <List.Accordion
                    title="Ekonomi"
                    left={props => <List.Icon {...props} icon="folder" />}>
                    <List.Item titleNumberOfLines={2} title="Pertumbuhan Ekonomi" />
                    <List.Item titleNumberOfLines={2} title="Laju Inflasi" />
                    <List.Item titleNumberOfLines={2} title="Kunjungan Wisata" />
                    <List.Item titleNumberOfLines={2} title="Realisasi Investasi PMA/PMDN" />
                    <List.Item titleNumberOfLines={2} title="Distribusi PDRB Atas Dasar Harga Berlaku (ADHB)" />
                    <List.Item titleNumberOfLines={2} title="Distribusi PDRB Atas Dasar Harga Konstan (ADHK)" />
                </List.Accordion>
                <List.Accordion
                    title="Pertanian dan Perikanan"
                    left={props => <List.Icon {...props} icon="folder" />}>
                    <List.Item title="Produksi Perikanan Budidaya" />
                    <List.Item title="Produksi Perikanan Tangkap" />
                    <List.Item title="Capaikan Produksi Komoditi Unggulan Perkebunan" />
                    <List.Item title="Capaikan Produksi Komoditi Hortikultura" />
                    <List.Item title="Jumlah Produksi Peternakan" />
                </List.Accordion>
                <List.Accordion
                    title="Kependudukan"
                    left={props => <List.Icon {...props} icon="folder" />}>
                    <List.Item title="Pertumbuhan Penduduk" />
                    <List.Item title="Jumlah Penduduk" />
                    <List.Item title="Jumlah Penduduk Berdasarkan Kelompok Umur" />
                    <List.Item title="Jumlah Penduduk berdasarkan Kecamatan Tahun 2021" />
                </List.Accordion>
                <List.Accordion
                    title="Infrastruktur"
                    left={props => <List.Icon {...props} icon="folder" />}>
                    <List.Item title="Panjang Jalan yang Di Bangun dan Ditingkatkan" />
                    <List.Item title="Persentase Rumah Tangga (RT) yang Menggunakan Air Bersih" />
                    <List.Item title="Persentase Tingkat Kemantapan Jalan (Mantap Sempurna)" />
                </List.Accordion>
                <List.Accordion
                    title="Video"
                    left={props => <List.Icon {...props} icon="folder" />}>
                    <List.Item title="List Video" />
                </List.Accordion>
            </List.Section>
            {/* separator with text inline */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
                <View style={{ borderBottomWidth: 1, borderBottomColor: 'black', flex: 1 }}></View>
                <Text style={{ marginHorizontal: 5 }}>E-money</Text>
                <View style={{ borderBottomWidth: 1, borderBottomColor: 'black', flex: 1 }}></View>
            </View>
            <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center' }}
            >
                <Icon name="chart-box" size={30} color="black" style={{ marginVertical: 10, marginHorizontal: 10 }} />
                <Text style={{ marginVertical: 10, marginHorizontal: 10 }}>Anggaran Murni dan Perubahan</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center' }}
            >
                <Icon name="chart-tree" size={30} color="black" style={{ marginVertical: 10, marginHorizontal: 10 }} />
                <Text style={{ marginVertical: 10, marginHorizontal: 10 }}>Realisasi OPD</Text>
            </TouchableOpacity>
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