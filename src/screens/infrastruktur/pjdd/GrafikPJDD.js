import { View, Text, Dimensions, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { LineChart } from "react-native-chart-kit";
import { stateDataPanjangJalanDibangun } from '../../../state/dataPJD';
import { color } from '../../../constants/Helper';
import Icon from 'react-native-vector-icons/Ionicons';

const GrafikPJDD = (props) => {
  const { dataPanjangJalanDibangun } = stateDataPanjangJalanDibangun()
  
  // Ambil 5 tahun terakhir
  const last5Years = dataPanjangJalanDibangun?.slice(-5) || [];
  
  // Hitung statistik dari 5 tahun terakhir
  const values = last5Years.map(item => parseFloat(item.panjang));
  const maxValue = values.length > 0 ? Math.max(...values) : 0;
  const minValue = values.length > 0 ? Math.min(...values) : 0;
  const avgValue = values.length > 0 ? (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2) : 0;
  const latestValue = values.length > 0 ? values[values.length - 1] : 0;
  const totalValue = values.length > 0 ? values.reduce((a, b) => a + b, 0).toFixed(2) : 0;

  const formatNumber = (num) => {
    const numValue = parseFloat(num);
    if (Number.isInteger(numValue)) {
      return numValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    return numValue.toFixed(2).replace(/\./g, ',');
  };

  // Kategori Pembangunan
  const getRoadCategory = (panjang) => {
    const value = parseFloat(panjang);
    if (value >= 10) return { label: 'Sangat Tinggi', color: '#43a047' };
    if (value >= 5 && value < 10) return { label: 'Tinggi', color: '#1e88e5' };
    if (value >= 2 && value < 5) return { label: 'Sedang', color: '#fb8c00' };
    return { label: 'Rendah', color: '#e53935' };
  };

  const currentCategory = getRoadCategory(latestValue);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Icon name="analytics" size={32} color="#00acc1" />
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>{props.route.params.title}</Text>
            <View style={styles.sourceContainer}>
              <Icon name="document-text-outline" size={16} color="#666" />
              <Text style={styles.sourceText}>Sumber: <Text style={styles.sourceBPS}>BPS</Text></Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Period Info */}
        {last5Years.length > 0 && (
          <View style={styles.periodCard}>
            <Icon name="time-outline" size={24} color="#00acc1" />
            <Text style={styles.periodText}>
              Periode: <Text style={styles.periodValue}>{last5Years[0]?.tahun} - {last5Years[last5Years.length - 1]?.tahun}</Text>
            </Text>
          </View>
        )}

        {/* Statistics Cards */}
        {values.length > 0 && (
          <View style={styles.statsContainer}>
            <View style={[styles.statCard, { backgroundColor: '#43a047' }]}>
              <Icon name="trending-up" size={24} color="#fff" />
              <Text style={styles.statValue}>{formatNumber(maxValue)} Km</Text>
              <Text style={styles.statLabel}>Tertinggi</Text>
            </View>
            
            <View style={[styles.statCard, { backgroundColor: '#e53935' }]}>
              <Icon name="trending-down" size={24} color="#fff" />
              <Text style={styles.statValue}>{formatNumber(minValue)} Km</Text>
              <Text style={styles.statLabel}>Terendah</Text>
            </View>
            
            <View style={[styles.statCard, { backgroundColor: '#1e88e5' }]}>
              <Icon name="calculator" size={24} color="#fff" />
              <Text style={styles.statValue}>{formatNumber(avgValue)} Km</Text>
              <Text style={styles.statLabel}>Rata-rata</Text>
            </View>
          </View>
        )}

        {/* Total Card */}
        {values.length > 0 && (
          <View style={styles.totalCard}>
            <Icon name="layers" size={28} color="#00acc1" />
            <View style={styles.totalContent}>
              <Text style={styles.totalLabel}>Total Pembangunan 5 Tahun</Text>
              <Text style={styles.totalValue}>{formatNumber(totalValue)} Km</Text>
            </View>
          </View>
        )}

        {/* Chart Card */}
        {last5Years.length > 0 && (
          <View style={styles.chartCard}>
            <View style={styles.chartHeader}>
              <Icon name="bar-chart" size={24} color="#00acc1" />
              <Text style={styles.chartTitle}>Grafik Tren 5 Tahun Terakhir</Text>
            </View>
            
            <View style={styles.chartWrapper}>
              <LineChart
                data={{
                  labels: last5Years.map(item => item.tahun),
                  datasets: [{
                    data: values
                  }]
                }}
                width={Dimensions.get("window").width - 48}
                height={280}
                yAxisInterval={1}
                fromZero={true}
                segments={5}
                chartConfig={{
                  backgroundColor: "#00acc1",
                  backgroundGradientFrom: "#00acc1",
                  backgroundGradientTo: "#0097a7",
                  decimalPlaces: 2,
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
                  Pembangunan Terkini: <Text style={[styles.currentValue, { color: currentCategory.color }]}>{formatNumber(latestValue)} Km</Text>
                </Text>
                <View style={[styles.categoryBadge, { backgroundColor: currentCategory.color + '20' }]}>
                  <Text style={[styles.categoryText, { color: currentCategory.color }]}>
                    {currentCategory.label}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Trend Analysis */}
        {values.length > 1 && (
          <View style={styles.trendCard}>
            <View style={styles.trendHeader}>
              <Icon name="analytics-outline" size={24} color="#00acc1" />
              <Text style={styles.trendTitle}>Analisis Tren</Text>
            </View>
            <View style={styles.trendContent}>
              <View style={styles.trendItem}>
                <Text style={styles.trendLabel}>Perubahan:</Text>
                <Text style={[styles.trendValue, { 
                  color: latestValue > values[0] ? '#43a047' : '#e53935' 
                }]}>
                  {latestValue > values[0] ? '↑' : '↓'} {formatNumber(Math.abs(latestValue - values[0]))} Km
                </Text>
              </View>
              <Text style={styles.trendDescription}>
                {latestValue > values[0] 
                  ? 'Tren meningkat, pembangunan jalan berkembang positif' 
                  : 'Tren menurun, perlu percepatan pembangunan infrastruktur'}
              </Text>
            </View>
          </View>
        )}

        {/* Info Card */}
        {last5Years.length > 0 && (
          <View style={styles.infoCard}>
            <View style={styles.infoHeader}>
              <Icon name="information-circle" size={24} color="#00acc1" />
              <Text style={styles.infoTitle}>Informasi Grafik</Text>
            </View>
            <View style={styles.infoContent}>
              <View style={styles.infoRow}>
                <View style={styles.infoDot} />
                <Text style={styles.infoText}>Menampilkan data 5 tahun terakhir</Text>
              </View>
              <View style={styles.infoRow}>
                <View style={styles.infoDot} />
                <Text style={styles.infoText}>Panjang jalan dalam satuan kilometer (Km)</Text>
              </View>
              <View style={styles.infoRow}>
                <View style={styles.infoDot} />
                <Text style={styles.infoText}>Data periode {last5Years[0]?.tahun} - {last5Years[last5Years.length - 1]?.tahun}</Text>
              </View>
              <View style={styles.infoRow}>
                <View style={styles.infoDot} />
                <Text style={styles.infoText}>Semakin tinggi nilai, semakin banyak pembangunan jalan</Text>
              </View>
            </View>
          </View>
        )}

        {/* Category Legend */}
        <View style={styles.legendCard}>
          <Text style={styles.legendTitle}>Kategori Pembangunan:</Text>
          <View style={styles.legendContent}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#43a047' }]} />
              <Text style={styles.legendText}>Sangat Tinggi (≥10 Km)</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#1e88e5' }]} />
              <Text style={styles.legendText}>Tinggi (5 - 9,99 Km)</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#fb8c00' }]} />
              <Text style={styles.legendText}>Sedang (2 - 4,99 Km)</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#e53935' }]} />
              <Text style={styles.legendText}>Rendah (&lt;2 Km)</Text>
            </View>
          </View>
        </View>

        {/* Empty State */}
        {(!dataPanjangJalanDibangun || dataPanjangJalanDibangun.length === 0) && (
          <View style={styles.emptyState}>
            <Icon name="git-network-outline" size={80} color="#ccc" />
            <Text style={styles.emptyText}>Belum ada data tersedia</Text>
          </View>
        )}
      </ScrollView>
    </View>
  )
}

export default GrafikPJDD

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
  scrollContent: {
    padding: 16,
    paddingBottom: 30,
  },
  periodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0F7FA',
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
    color: '#00acc1',
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
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
    textAlign: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 4,
  },
  totalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    gap: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  totalContent: {
    flex: 1,
  },
  totalLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  totalValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00acc1',
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
    marginBottom: 6,
  },
  currentValue: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
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
    backgroundColor: '#E0F7FA',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#00acc1',
    marginBottom: 16,
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
    backgroundColor: '#00acc1',
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    flex: 1,
  },
  legendCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  legendTitle: {
    fontSize: 16,
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
    gap: 12,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 14,
    color: '#555',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 16,
  },
})