import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import BIH from '../../assets/bih.png'
import { color } from '../../constants/Helper'

const TentangKami = () => {
    return (
        <View style={styles.container}>
            <Image source={BIH} style={{ width: 150, height: 150, borderRadius: 20 }} />
            <View style={styles.title}>
                <Text style={{ fontSize: 26, fontWeight: 'bold', color: color.black }}>BAPELITBANG</Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: color.black }}>Kabupaten Bintan</Text>
            </View>
            <View style={styles.textDeskripsi}>
                <Text style={{fontSize: 18, fontWeight: 'bold', color: color.black}}>Deskripsi</Text>
                <Text style={{fontSize: 14, textAlign: 'justify', color: color.black}}>Aplikasi ini adalah wujud dari sistem peragaan data Daerah Kabupaten Bintan yang dikembangkan oleh Bappeda Litbang Kabupaten Bintan {'\n'}Aplikasi ini mempublikasikan berbagai data umum penting Kabupaten Bintan yang diambil dari berbagai sumber resmi. Data yang di publikasikan merupakan data yang di tampilkan dalam bentuk tabel dan grafik lengkap dengan deskripsinya. Selain itu terdapat data visual dalam bentuk video dan publikasi ekspose pembangunan Kabupaten Bintan</Text>
            </View>
            <View style={styles.textDeskripsi}>
                <Text style={{fontSize: 18, fontWeight: 'bold', color: color.black}}>Kontak</Text>
                <Text style={{fontSize: 14, textAlign: 'justify', color: color.black}}>Alamat</Text>
                <Text style={{fontSize: 14, textAlign: 'justify', color: color.black}}>Jalan Jendral A. Yani, KM 5 Atas</Text>
                <Text style={{fontSize: 14, textAlign: 'justify', color: color.black}}>Tanjungpinang Provinsi Kepulauan Riau</Text>
                <Text style={{fontSize: 14, textAlign: 'justify', color: color.black}}>Email</Text>
                <Text style={{fontSize: 14, textAlign: 'justify', color: color.black}}>bapelitbang@bapelitbang.bintankab.go.id</Text>
                <Text style={{fontSize: 14, textAlign: 'justify', color: color.black}}>Telp : 0771-29647</Text>
            </View>
        </View>
    )
}

export default TentangKami

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d5d9e6',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
    },
    title: {
        marginVertical: 10,
        marginTop: 20,
        alignItems: 'center',
    },
    textDeskripsi: {
        marginVertical: 10,
        marginHorizontal: 20,
        alignItems: 'center'
    }
})