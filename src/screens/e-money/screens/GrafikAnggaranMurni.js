import React from 'react';  
import { View, Text, ActivityIndicator, StyleSheet, Dimensions, ScrollView } from 'react-native';  
import { stateDataAnggaran } from '../../../state/dataAnggaran';  
import { LineChart } from "react-native-chart-kit";
import Icon from 'react-native-vector-icons/Ionicons';

const GrafikAnggaranMurni = () => {  
    const { dataAnggaran } = stateDataAnggaran();  
    const data = dataAnggaran?.chart_keuangan_murni?.[0] || [];
    const data1 = dataAnggaran?.chart_keuangan_murni?.[1] || [];
    const isDataReady = Array.isArray(data) && Array.isArray(data1) && data.length > 0 && data1.length > 0;

    // Calculate statistics
    const calculateStats = (dataset) => {
        if (!dataset || dataset.length === 0) return { max: 0, min: 0, avg: 0 };
        const max = Math.max(...dataset);
        const min = Math.min(...dataset);
        const avg = (dataset.reduce((a, b) => a + b, 0) / dataset.length).toFixed(1);
        return { max, min, avg };
    };

    const targetStats = calculateStats(data);
    const realisasiStats = calculateStats(data1);

    const formatNumber = (num) => {
        if (!num && num !== 0) return '0';
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    return (  
        <ScrollView 
            style={styles.container}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
        >  
            {isDataReady ? (
                <>
                    {/* Info Card */}
                    <View style={styles.infoCard}>
                        <View style={styles.infoHeader}>
                            <Icon name="information-circle" size={24} color="#0074BD" />
                            <Text style={styles.infoTitle}>Grafik Keuangan APBD Murni</Text>
                        </View>
                        <Text style={styles.infoText}>
                            Grafik perbandingan Target dan Realisasi Keuangan APBD Murni per bulan
                        </Text>
                    </View>

                    {/* Chart Card */}
                    <View style={styles.chartCard}>
                        <LineChart  
                            data={{  
                                labels: [  
                                    "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",  
                                    "Jul", "Agu", "Sep", "Okt", "Nov", "Des"  
                                ],  
                                datasets: [  
                                    {  
                                        data: data,  
                                        color: (opacity = 1) => `rgba(67, 160, 71, ${opacity})`,
                                        strokeWidth: 3
                                    },  
                                    {  
                                        data: data1,  
                                        color: (opacity = 1) => `rgba(251, 140, 0, ${opacity})`,
                                        strokeWidth: 3
                                    }  
                                ],  
                                legend: ["Target", "Realisasi"]
                            }}  
                            width={Dimensions.get("window").width - 48}
                            height={280}  
                            yAxisInterval={1}
                            chartConfig={{  
                                backgroundColor: "#0074BD",  
                                backgroundGradientFrom: "#0074BD",  
                                backgroundGradientTo: "#005a9c",  
                                decimalPlaces: 0,
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,  
                                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,  
                                style: {  
                                    borderRadius: 16,
                                },  
                                propsForLabels: {  
                                    fontSize: 11,
                                    fontWeight: '600'
                                },  
                                propsForDots: {  
                                    r: "5",  
                                    strokeWidth: "2",  
                                    stroke: "#fff"  
                                },  
                                propsForBackgroundLines: {  
                                    strokeDasharray: "5,5",
                                    stroke: 'rgba(255,255,255,0.2)'
                                },  
                            }}  
                            bezier  
                            style={styles.chart}
                        />
                    </View>

                    {/* Legend Card */}
                    <View style={styles.legendCard}>
                        <Text style={styles.legendTitle}>Keterangan:</Text>
                        <View style={styles.legendContent}>
                            <View style={styles.legendItem}>
                                <View style={[styles.legendDot, { backgroundColor: 'rgba(67, 160, 71, 1)' }]} />
                                <Text style={styles.legendText}>Target Keuangan</Text>
                            </View>
                            <View style={styles.legendItem}>
                                <View style={[styles.legendDot, { backgroundColor: 'rgba(251, 140, 0, 1)' }]} />
                                <Text style={styles.legendText}>Realisasi Keuangan</Text>
                            </View>
                        </View>
                    </View>

                    {/* Statistics Cards */}
                    <View style={styles.statsContainer}>
                        {/* Target Stats */}
                        <View style={[styles.statCard, { borderLeftColor: 'rgba(67, 160, 71, 1)' }]}>
                            <View style={styles.statHeader}>
                                <Icon name="flag" size={20} color="rgba(67, 160, 71, 1)" />
                                <Text style={styles.statTitle}>Target</Text>
                            </View>
                            <View style={styles.statBody}>
                                <View style={styles.statItem}>
                                    <Text style={styles.statLabel}>Maksimal</Text>
                                    <Text style={styles.statValue}>{formatNumber(targetStats.max)}</Text>
                                </View>
                                <View style={styles.statItem}>
                                    <Text style={styles.statLabel}>Minimal</Text>
                                    <Text style={styles.statValue}>{formatNumber(targetStats.min)}</Text>
                                </View>
                                <View style={styles.statItem}>
                                    <Text style={styles.statLabel}>Rata-rata</Text>
                                    <Text style={styles.statValue}>{formatNumber(targetStats.avg)}</Text>
                                </View>
                            </View>
                        </View>

                        {/* Realisasi Stats */}
                        <View style={[styles.statCard, { borderLeftColor: 'rgba(251, 140, 0, 1)' }]}>
                            <View style={styles.statHeader}>
                                <Icon name="checkmark-circle" size={20} color="rgba(251, 140, 0, 1)" />
                                <Text style={styles.statTitle}>Realisasi</Text>
                            </View>
                            <View style={styles.statBody}>
                                <View style={styles.statItem}>
                                    <Text style={styles.statLabel}>Maksimal</Text>
                                    <Text style={styles.statValue}>{formatNumber(realisasiStats.max)}</Text>
                                </View>
                                <View style={styles.statItem}>
                                    <Text style={styles.statLabel}>Minimal</Text>
                                    <Text style={styles.statValue}>{formatNumber(realisasiStats.min)}</Text>
                                </View>
                                <View style={styles.statItem}>
                                    <Text style={styles.statLabel}>Rata-rata</Text>
                                    <Text style={styles.statValue}>{formatNumber(realisasiStats.avg)}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </>
            ) : (  
                <View style={styles.loaderContainer}>  
                    <ActivityIndicator size="large" color="#0074BD" />  
                    <Text style={styles.loaderText}>Memuat data grafik...</Text>  
                </View>  
            )}  
        </ScrollView>  
    );  
};  

const styles = StyleSheet.create({  
    container: {
        flex: 1,
        backgroundColor: '#f5f7fa',
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 40,
    },
    infoCard: {
        backgroundColor: '#E3F2FD',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderLeftWidth: 4,
        borderLeftColor: '#0074BD',
    },
    infoHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 8,
    },
    infoTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    infoText: {
        fontSize: 14,
        color: '#555',
        lineHeight: 20,
    },
    chartCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        alignItems: 'center',
    },
    chart: {
        borderRadius: 16,
    },
    legendCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    legendTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 12,
    },
    legendContent: {
        gap: 10,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    legendDot: {
        width: 16,
        height: 16,
        borderRadius: 8,
    },
    legendText: {
        fontSize: 14,
        color: '#555',
    },
    statsContainer: {
        gap: 12,
        marginBottom: 20,
    },
    statCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        borderLeftWidth: 4,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    statHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 12,
    },
    statTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    statBody: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statItem: {
        flex: 1,
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
    },
    statValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    loaderContainer: {  
        flex: 1,  
        justifyContent: 'center',  
        alignItems: 'center',
        minHeight: 400,
        gap: 12,
    },
    loaderText: {
        fontSize: 14,
        color: '#666',
        marginTop: 8,
    },
});  

export default GrafikAnggaranMurni;