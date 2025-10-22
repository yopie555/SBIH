import React, { useState } from 'react';  
import {  
  StyleSheet,  
  Text,  
  View,  
  Dimensions,
  ScrollView,
} from 'react-native';  
import { LineChart } from "react-native-chart-kit";  
import CategoryStore from '../../../components/CategoryStore';  
import { color } from '../../../constants/Helper';  
import { stateDataAtasDasarHargaBerlaku } from '../../../state/dataADHB';
import Icon from 'react-native-vector-icons/Ionicons';

const GrafikADHB = (props) => {  
    const [selectedCategoryId, setSelectedCategoryId] = useState(1);  
    const dataAtasDasarHargaBerlaku = stateDataAtasDasarHargaBerlaku();  
    
    // Hitung data grafik berdasarkan kategori yang dipilih
    const graphData = (() => {
        const filteredData = dataAtasDasarHargaBerlaku?.dataAtasDasarHargaBerlaku
            ?.filter(item => item.id === selectedCategoryId)
            .sort((a, b) => parseInt(a.tahun) - parseInt(b.tahun));

        if (!filteredData || filteredData.length === 0) {
            return null;
        }

        // Ambil 5 tahun terakhir
        const last5Years = filteredData.slice(-5);
        const values = last5Years.map(item => parseFloat(item.jumlah));
        const maxValue = Math.max(...values);
        const minValue = Math.min(...values);
        const avgValue = (values.reduce((a, b) => a + b, 0) / values.length);
        const latestValue = values[values.length - 1];

        return {
            last5Years,
            values,
            maxValue,
            minValue,
            avgValue,
            latestValue,
            labels: last5Years.map(item => item.tahun),
            datasets: [{
                data: values
            }]
        };
    })();

    const formatRupiah = (angka) => {
        if (!angka) return '-';
        const formatted = angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return `Rp ${formatted}`;
    };

    const formatToReadable = (num) => {
        if (!num || num === 0) return '0';
        
        if (num >= 1000000000000) {
            return (num / 1000000000000).toFixed(2) + ' T';
        } else if (num >= 1000000000) {
            return (num / 1000000000).toFixed(2) + ' M';
        } else if (num >= 1000000) {
            return (num / 1000000).toFixed(2) + ' Jt';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(2) + ' Rb';
        }
        return num.toFixed(2);
    };

    return (  
        <View style={styles.container}>  
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <Icon name="analytics" size={32} color="#2e7d32" />
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.headerTitle}>{props.route.params.title}</Text>
                        <View style={styles.sourceContainer}>
                            <Icon name="document-text-outline" size={16} color="#666" />
                            <Text style={styles.sourceText}>Sumber: <Text style={styles.sourceBPS}>BPS</Text></Text>
                        </View>
                    </View>
                </View>
            </View>
      
            <View style={styles.filterSection}>
                <CategoryStore   
                    onCategorySelect={(id) => {   
                        setSelectedCategoryId(id);  
                    }}   
                />
            </View>

            {graphData ? (
                <ScrollView 
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Period Info */}
                    <View style={styles.periodCard}>
                        <Icon name="time-outline" size={24} color="#2e7d32" />
                        <Text style={styles.periodText}>
                            Periode: <Text style={styles.periodValue}>{graphData.last5Years[0]?.tahun} - {graphData.last5Years[graphData.last5Years.length - 1]?.tahun}</Text>
                        </Text>
                    </View>

                    {/* Statistics Cards */}
                    <View style={styles.statsContainer}>
                        <View style={[styles.statCard, { backgroundColor: '#43a047' }]}>
                            <Icon name="trending-up" size={24} color="#fff" />
                            <Text style={styles.statValue}>{formatToReadable(graphData.maxValue)}</Text>
                            <Text style={styles.statLabel}>Tertinggi</Text>
                        </View>
                        
                        <View style={[styles.statCard, { backgroundColor: '#e53935' }]}>
                            <Icon name="trending-down" size={24} color="#fff" />
                            <Text style={styles.statValue}>{formatToReadable(graphData.minValue)}</Text>
                            <Text style={styles.statLabel}>Terendah</Text>
                        </View>
                        
                        <View style={[styles.statCard, { backgroundColor: '#1e88e5' }]}>
                            <Icon name="calculator" size={24} color="#fff" />
                            <Text style={styles.statValue}>{formatToReadable(graphData.avgValue)}</Text>
                            <Text style={styles.statLabel}>Rata-rata</Text>
                        </View>
                    </View>

                    {/* Chart Card */}
                    <View style={styles.chartCard}>
                        <View style={styles.chartHeader}>
                            <Icon name="bar-chart" size={24} color="#2e7d32" />
                            <Text style={styles.chartTitle}>Grafik Tren 5 Tahun Terakhir</Text>
                        </View>
                        
                        <View style={styles.chartWrapper}>
                            <LineChart  
                                data={{
                                    labels: graphData.labels,
                                    datasets: graphData.datasets
                                }}
                                width={Dimensions.get("window").width - 48}  
                                height={280}  
                                yAxisInterval={1}  
                                fromZero={true}
                                segments={5}
                                chartConfig={{  
                                    backgroundColor: "#2e7d32",  
                                    backgroundGradientFrom: "#2e7d32",  
                                    backgroundGradientTo: "#1b5e20",  
                                    decimalPlaces: 0,  
                                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,  
                                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,  
                                    style: {  
                                        borderRadius: 16,  
                                    },
                                    propsForLabels: {
                                        fontSize: 12,
                                        fontWeight: '600'
                                    },  
                                    propsForDots: {  
                                        r: "6",  
                                        strokeWidth: "3",  
                                        stroke: "#fff"  
                                    },
                                    propsForBackgroundLines: {
                                        strokeDasharray: "5,5",
                                        stroke: "rgba(255,255,255,0.2)"
                                    },
                                }}  
                                bezier  
                                style={styles.chart}  
                            />
                        </View>

                        {/* Current Value */}
                        <View style={styles.currentValueContainer}>
                            <Icon name="calendar-outline" size={20} color="#666" />
                            <View style={styles.currentValueWrapper}>
                                <Text style={styles.currentValueText}>
                                    ADHB Terkini: <Text style={styles.currentValue}>{formatRupiah(graphData.latestValue)}</Text>
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* Trend Analysis */}
                    <View style={styles.trendCard}>
                        <View style={styles.trendHeader}>
                            <Icon name="analytics-outline" size={24} color="#2e7d32" />
                            <Text style={styles.trendTitle}>Analisis Tren</Text>
                        </View>
                        <View style={styles.trendContent}>
                            <View style={styles.trendItem}>
                                <Text style={styles.trendLabel}>Perubahan:</Text>
                                <Text style={[styles.trendValue, { 
                                    color: graphData.latestValue > graphData.values[0] ? '#43a047' : '#e53935' 
                                }]}>
                                    {graphData.latestValue > graphData.values[0] ? '↑' : '↓'} {formatToReadable(Math.abs(graphData.latestValue - graphData.values[0]))}
                                </Text>
                            </View>
                            <Text style={styles.trendDescription}>
                                {graphData.latestValue > graphData.values[0] 
                                    ? 'Tren meningkat, nilai ekonomi berkembang positif' 
                                    : 'Tren menurun, perlu evaluasi dan strategi pemulihan'}
                            </Text>
                        </View>
                    </View>

                    {/* Info Card */}
                    <View style={styles.infoCard}>
                        <View style={styles.infoHeader}>
                            <Icon name="information-circle" size={24} color="#2e7d32" />
                            <Text style={styles.infoTitle}>Informasi Grafik</Text>
                        </View>
                        <View style={styles.infoContent}>
                            <View style={styles.infoRow}>
                                <View style={styles.infoDot} />
                                <Text style={styles.infoText}>Menampilkan data 5 tahun terakhir</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <View style={styles.infoDot} />
                                <Text style={styles.infoText}>ADHB = Atas Dasar Harga Berlaku</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <View style={styles.infoDot} />
                                <Text style={styles.infoText}>Data periode {graphData.last5Years[0]?.tahun} - {graphData.last5Years[graphData.last5Years.length - 1]?.tahun}</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <View style={styles.infoDot} />
                                <Text style={styles.infoText}>Pilih kategori untuk melihat data berbeda</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <View style={styles.infoDot} />
                                <Text style={styles.infoText}>T = Triliun, M = Miliar, Jt = Juta, Rb = Ribu</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            ) : (  
                <View style={styles.emptyState}>
                    <Icon name="document-outline" size={80} color="#ccc" />
                    <Text style={styles.emptyText}>Tidak ada data untuk kategori ini</Text>
                </View>
            )}  
        </View>  
    )  
}  

export default GrafikADHB;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f7fa',
    },
    header: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    headerTextContainer: {
        flex: 1,
    },
    headerTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#1a1a1a',
        marginBottom: 4,
    },
    sourceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    sourceText: {
        fontSize: 13,
        color: '#666',
    },
    sourceBPS: {
        color: '#e53935',
        fontWeight: '600',
    },
    filterSection: {
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 30,
    },
    periodCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E8F5E9',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        gap: 12,
    },
    periodText: {
        fontSize: 14,
        color: '#666',
    },
    periodValue: {
        fontWeight: 'bold',
        color: '#2e7d32',
    },
    statsContainer: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 16,
    },
    statCard: {
        flex: 1,
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    statValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 8,
    },
    statLabel: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.9)',
        marginTop: 4,
    },
    chartCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    chartHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 16,
    },
    chartTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    chartWrapper: {
        alignItems: 'center',
        marginBottom: 12,
    },
    chart: {
        borderRadius: 16,
    },
    currentValueContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    currentValueWrapper: {
        flex: 1,
    },
    currentValueText: {
        fontSize: 14,
        color: '#666',
    },
    currentValue: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#2e7d32',
    },
    trendCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    trendHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 12,
    },
    trendTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    trendContent: {
        gap: 8,
    },
    trendItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    trendLabel: {
        fontSize: 14,
        color: '#666',
    },
    trendValue: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    trendDescription: {
        fontSize: 14,
        color: '#555',
        fontStyle: 'italic',
    },
    infoCard: {
        backgroundColor: '#E8F5E9',
        borderRadius: 12,
        padding: 16,
        borderLeftWidth: 4,
        borderLeftColor: '#2e7d32',
    },
    infoHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 12,
    },
    infoTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    infoContent: {
        gap: 8,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    infoDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#2e7d32',
    },
    infoText: {
        fontSize: 14,
        color: '#555',
        flex: 1,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
        flex: 1,
    },
    emptyText: {
        fontSize: 16,
        color: '#999',
        marginTop: 16,
    },
});