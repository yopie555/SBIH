import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React from 'react'
import BIH from '../../assets/bih.png'
import { color } from '../../constants/Helper'
import Icon from 'react-native-vector-icons/Ionicons'

const TentangKami = () => {
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.content}>
                {/* Header Section */}
                <View style={styles.headerSection}>
                    <View style={styles.logoContainer}>
                        <Image source={BIH} style={styles.logo} />
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.mainTitle}>BAPELITBANG</Text>
                        <Text style={styles.subtitle}>Kabupaten Bintan</Text>
                    </View>
                </View>

                {/* Description Section */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Icon name="information-circle" size={24} color="#0074BD" />
                        <Text style={styles.cardTitle}>Deskripsi</Text>
                    </View>
                    <Text style={styles.descriptionText}>
                        Aplikasi ini adalah wujud dari sistem peragaan data Daerah Kabupaten Bintan yang dikembangkan oleh Bappeda Litbang Kabupaten Bintan.{'\n\n'}
                        Aplikasi ini mempublikasikan berbagai data umum penting Kabupaten Bintan yang diambil dari berbagai sumber resmi. Data yang di publikasikan merupakan data yang di tampilkan dalam bentuk tabel dan grafik lengkap dengan deskripsinya. Selain itu terdapat data visual dalam bentuk video dan publikasi ekspose pembangunan Kabupaten Bintan.
                    </Text>
                </View>

                {/* Contact Section */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Icon name="call" size={24} color="#0074BD" />
                        <Text style={styles.cardTitle}>Kontak</Text>
                    </View>

                    <View style={styles.contactItem}>
                        <Icon name="location" size={20} color="#666" style={styles.contactIcon} />
                        <View style={styles.contactTextContainer}>
                            <Text style={styles.contactLabel}>Alamat</Text>
                            <Text style={styles.contactText}>Jalan Jendral A. Yani, KM 5 Atas</Text>
                            <Text style={styles.contactText}>Tanjungpinang, Provinsi Kepulauan Riau</Text>
                        </View>
                    </View>

                    <View style={styles.contactItem}>
                        <Icon name="mail" size={20} color="#666" style={styles.contactIcon} />
                        <View style={styles.contactTextContainer}>
                            <Text style={styles.contactLabel}>Email</Text>
                            <Text style={styles.contactText}>bapelitbang@bapelitbang.bintankab.go.id</Text>
                        </View>
                    </View>

                    <View style={styles.contactItem}>
                        <Icon name="call" size={20} color="#666" style={styles.contactIcon} />
                        <View style={styles.contactTextContainer}>
                            <Text style={styles.contactLabel}>Telepon</Text>
                            <Text style={styles.contactText}>0771-29647</Text>
                        </View>
                    </View>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Smart Bintan in Hands</Text>
                    <Text style={styles.footerSubtext}>Versi 1.0.0</Text>
                </View>
            </View>
        </ScrollView>
    )
}

export default TentangKami

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f7fa',
    },
    content: {
        padding: 20,
        paddingBottom: 40,
    },
    headerSection: {
        alignItems: 'center',
        marginBottom: 24,
    },
    logoContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 20,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        marginBottom: 20,
    },
    logo: {
        width: 120,
        height: 120,
        borderRadius: 12,
    },
    titleContainer: {
        alignItems: 'center',
    },
    mainTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#0074BD',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1a1a1a',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        gap: 12,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    descriptionText: {
        fontSize: 15,
        lineHeight: 24,
        color: '#555',
        textAlign: 'justify',
    },
    contactItem: {
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'flex-start',
    },
    contactIcon: {
        marginTop: 2,
        marginRight: 12,
    },
    contactTextContainer: {
        flex: 1,
    },
    contactLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: 6,
    },
    contactText: {
        fontSize: 14,
        color: '#555',
        lineHeight: 20,
    },
    footer: {
        alignItems: 'center',
        marginTop: 24,
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    footerText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#0074BD',
        marginBottom: 4,
    },
    footerSubtext: {
        fontSize: 13,
        color: '#999',
    },
})