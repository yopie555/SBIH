import { View, Text, Dimensions, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { LineChart } from "react-native-chart-kit";
import { stateDataPerkembanganKondisiKetenagakerjaan } from '../../../state/dataPKK';
import { color } from '../../../constants/Helper';
import Icon from 'react-native-vector-icons/Ionicons';

const GrafikPKK = (props) => {
  const {dataPerkembanganKondisiKetenagakerjaan} = stateDataPerkembanganKondisiKetenagakerjaan()
  
  // Ambil 5 tahun terakhir
  const last5Years = dataPerkembanganKondisiKetenagakerjaan.slice(-5);
  
  // Hitung statistik dari 5 tahun terakhir
  const values = last5Years.map(item => parseFloat(item.tingkat_pengangguran));
  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);
  const avgValue = (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2);
  const latestValue = values[values.length - 1];

  // Tentukan range untuk sumbu Y (0 sampai max + buffer)
  const yAxisMax = Math.ceil(maxValue) + 1;

  // Kategori Pengangguran
  const getPengangguranCategory = (tingkat) => {
    const value = parseFloat(tingkat);
    if (value < 3) return { label: 'Sangat Rendah', color: '#43a047' };
    if (value >= 3 && value < 5) return { label: 'Rendah', color: '#1e88e5' };
    if (value >= 5 && value < 7) return { label: 'Sedang', color: '#fb8c00' };
    return { label: 'Tinggi', color: '#e53935' };
  };

  const currentCategory = getPengangguranCategory(latestValue);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Icon name="analytics" size={32} color="#00897b" />
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
        <View style={styles.periodCard}>
          <Icon name="time-outline" size={24} color="#00897b" />
          <Text style={styles.periodText}>
            Periode: <Text style={styles.periodValue}>{last5Years[0]?.tahun} - {last5Years[last5Years.length - 1]?.tahun}</Text>
          </Text>
        </View>

        {/* Statistics Cards */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: '#e53935' }]}>
            <Icon name="trending-up" size={24} color="#fff" />
            <Text style={styles.statValue}>{maxValue}%</Text>
            <Text style={styles.statLabel}>Tertinggi</Text>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: '#43a047' }]}>
            <Icon name="trending-down" size={24} color="#fff" />
            <Text style={styles.statValue}>{minValue}%</Text>
            <Text style={styles.statLabel}>Terendah</Text>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: '#1e88e5' }]}>
            <Icon name="calculator" size={24} color="#fff" />
            <Text style={styles.statValue}>{avgValue}%</Text>
            <Text style={styles.statLabel}>Rata-rata</Text>
          </View>
        </View>

        {/* Chart Card */}
        <View style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <Icon name="bar-chart" size={24} color="#00897b" />
            <Text style={styles.chartTitle}>Tren Tingkat Pengangguran</Text>
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
              yAxisSuffix="%"
              yAxisInterval={1}
              fromZero={true}
              segments={5}
              chartConfig={{
                backgroundColor: "#00897b",
                backgroundGradientFrom: "#00897b",
                backgroundGradientTo: "#00695c",
                decimalPlaces: 1,
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

          {/* Y-Axis Info */}
          <View style={styles.axisInfo}>
            <View style={styles.axisRow}>
              <Icon name="resize-outline" size={16} color="#666" />
              <Text style={styles.axisText}>Sumbu Y: 0% - {yAxisMax}%</Text>
            </View>
          </View>

          {/* Current Value */}
          <View style={styles.currentValueContainer}>
            <Icon name="calendar-outline" size={20} color="#666" />
            <View style={styles.currentValueWrapper}>
              <Text style={styles.currentValueText}>
                TPT Terkini: <Text style={[styles.currentValue, { color: currentCategory.color }]}>{latestValue}%</Text>
              </Text>
              <View style={[styles.categoryBadge, { backgroundColor: currentCategory.color + '20' }]}>
                <Text style={[styles.categoryText, { color: currentCategory.color }]}>
                  {currentCategory.label}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Icon name="information-circle" size={24} color="#00897b" />
            <Text style={styles.infoTitle}>Informasi Grafik</Text>
          </View>
          <View style={styles.infoContent}>
            <View style={styles.infoRow}>
              <View style={styles.infoDot} />
              <Text style={styles.infoText}>Menampilkan data 5 tahun terakhir</Text>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.infoDot} />
              <Text style={styles.infoText}>Sumbu Y dimulai dari 0% hingga {yAxisMax}%</Text>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.infoDot} />
              <Text style={styles.infoText}>TPT = Tingkat Pengangguran Terbuka</Text>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.infoDot} />
              <Text style={styles.infoText}>Data periode {last5Years[0]?.tahun} - {last5Years[last5Years.length - 1]?.tahun}</Text>
            </View>
          </View>
        </View>

        {/* Category Legend */}
        <View style={styles.legendCard}>
          <Text style={styles.legendTitle}>Kategori Tingkat Pengangguran:</Text>
          <View style={styles.legendContent}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#43a047' }]} />
              <Text style={styles.legendText}>Sangat Rendah {`(<3%)`}</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#1e88e5' }]} />
              <Text style={styles.legendText}>Rendah (3-4.99%)</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#fb8c00' }]} />
              <Text style={styles.legendText}>Sedang (5-6.99%)</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#e53935' }]} />
              <Text style={styles.legendText}>Tinggi (≥7%)</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default GrafikPKK

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
    backgroundColor: '#E0F2F1',
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
    color: '#00897b',
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
    fontSize: 20,
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
  axisInfo: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    marginBottom: 12,
  },
  axisRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  axisText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  currentValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingTop: 12,
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
  infoCard: {
    backgroundColor: '#E0F2F1',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#00897b',
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
    backgroundColor: '#00897b',
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
})