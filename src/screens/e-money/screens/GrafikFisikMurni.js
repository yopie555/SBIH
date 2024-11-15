import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { stateDataTahun } from '../../../state/dataTahun';

const GrafikAnggaranFisik = ({ route }) => {
    const {dataTahun} = stateDataTahun()

    const [loading, setLoading] = useState(true);
    const url = `https://simonev21.bintankab.go.id/mobile/chartmurni/fisik/${dataTahun}/12`;  // Gunakan tahun yang dipilih

    return (
        <View style={{ flex: 1 }}>
            {loading && (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#0074BD" />
                    <Text>Loading Grafik...</Text>
                </View>
            )}
            
            <WebView
                source={{ uri: url }}
                onLoad={() => setLoading(false)}
                style={{ flex: 1 }}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default GrafikAnggaranFisik;
