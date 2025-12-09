import { View, Text, Dimensions, StyleSheet, ScrollView } from 'react-native'
import React, { useMemo } from 'react'
import { LineChart } from "react-native-chart-kit";
import { stateDataAngkaMelekHuruf } from '../../../state/dataAMH';
import { color } from '../../../constants/Helper';
import Icon from 'react-native-vector-icons/Ionicons';

const GrafikAMH = (props) => {
  const {dataAngkaMelekHuruf} = stateDataAngkaMelekHuruf()

  // Handle case when no data is available
  if (!dataAngkaMelekHuruf || dataAngkaMelekHuruf.length === 0) {
    return (
      <View style={styles.container}>
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
        <View style={styles.noDataContainer}>
          <Icon name="alert-circle-outline" size={64} color="#ccc" />
          <Text style={styles.noDataText}>Data tidak tersedia</Text>
          <Text style={styles.noDataSubText}>Silakan refresh untuk memuat data</Text>
        </View>
      </View>
    );
  }

  // Get latest 5 records (data from API is already descending by year)
  // Then sort ascending for chart display
  const chartData = useMemo(() => {
    // Take first 5 records (latest years) since API returns descending
    const latest5Records = (dataAngkaMelekHuruf || []).slice(0, 5);
    
    // Filter valid data
    const validData = latest5Records.filter(item => {
      const value = parseFloat(item.jumlah);
      return !isNaN(value) && value >= 0;
    });
    
    // Sort ascending for chart (oldest to newest)
    const sortedForChart = validData.sort((a, b) => a.tahun - b.tahun);
    
    return {
      labels: sortedForChart.map(item => String(item.tahun)),
      data: sortedForChart.map(item => parseFloat(item.jumlah))
    };
  }, [dataAngkaMelekHuruf]);

  // Sort all data by year in ascending order for statistics
  const sortedData = useMemo(() => {
    return [...(dataAngkaMelekHuruf || [])].sort((a, b) => a.tahun - b.tahun);
  }, [dataAngkaMelekHuruf]);

  const chartLabels = chartData.labels;
  const dataOrang = chartData.data;

  // Statistik dengan pengecekan error
  const avgJumlah = dataOrang.length > 0 ? (dataOrang.reduce((a, b) => a + b, 0) / dataOrang.length).toFixed(0) : '0';
  const maxJumlah = dataOrang.length > 0 ? Math.max(...dataOrang) : 0;
  const minJumlah = dataOrang.length > 0 ? Math.min(...dataOrang) : 0;

  // Calculate yAxisInterval safely
  const yAxisInterval = useMemo(() => {
    if (dataOrang.length === 0) return 20000;
    const range = maxJumlah - minJumlah;
    if (range === 0) return 20000;
    const calculated = Math.ceil(range / 5);
    // Ensure it's a valid positive number
    return isNaN(calculated) || calculated <= 0 ? 20000 : calculated;
  }, [dataOrang.length, maxJumlah, minJumlah]);

  // Kategori AMH
  const getAMHCategory = (jumlah) => {
    const value = parseFloat(jumlah);
    if (value >= 150000) return { label: 'Sangat Tinggi', color: '#43a047' };
    if (value >= 100000) return { label: 'Tinggi', color: '#1e88e5' };
    if (value >= 50000) return { label: 'Sedang', color: '#fb8c00' };
    return { label: 'Rendah', color: '#e53935' };
  };

  const currentCategory = getAMHCategory(avgJumlah);

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
          <View style={styles.periodContent}>
            <Text style={styles.periodText}>
              Total Data: <Text style={styles.periodValue}>{dataAngkaMelekHuruf.length} Record</Text>
            </Text>
            <Text style={styles.periodText}>
              Chart Menampilkan: <Text style={styles.periodValue}>5 Record Terbaru</Text>
            </Text>
          </View>
        </View>

        {/* Statistics Cards */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: '#43a047' }]}>
            <Icon name="trending-up" size={24} color="#fff" />
            <Text style={styles.statValue}>{maxJumlah.toLocaleString('id-ID')}</Text>
            <Text style={styles.statLabel}>Tertinggi</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: '#e53935' }]}>
            <Icon name="trending-down" size={24} color="#fff" />
            <Text style={styles.statValue}>{minJumlah.toLocaleString('id-ID')}</Text>
            <Text style={styles.statLabel}>Terendah</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: '#00897b' }]}>
            <Icon name="calculator" size={24} color="#fff" />
            <Text style={styles.statValue}>{parseFloat(avgJumlah).toLocaleString('id-ID')}</Text>
            <Text style={styles.statLabel}>Rata-rata</Text>
          </View>
        </View>

  
        {/* Chart Card */}
        <View style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <Icon name="bar-chart" size={24} color="#00897b" />
            <Text style={styles.chartTitle}>Grafik Angka Melek Huruf</Text>
          </View>

          <View style={styles.chartWrapper}>
            {chartLabels.length > 0 && dataOrang.length > 0 ? (
              <LineChart
                key={`chart-${dataAngkaMelekHuruf.length}`}
                data={{
                  labels: chartLabels,
                  datasets: [
                    {
                      data: dataOrang,
                      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                      strokeWidth: 4
                    }
                  ]
                }}
              width={Dimensions.get("window").width - 48}
              height={280}
              yAxisSuffix=""
              yAxisInterval={yAxisInterval}
              fromZero={true}
              segments={4}
              formatYLabel={(value) => {
                const num = parseFloat(value);
                if (num >= 1000) {
                  return (num / 1000).toFixed(0) + 'K';
                }
                return num.toFixed(0);
              }}
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
                  fontSize: 10,
                  fontWeight: '600'
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                },
                propsForBackgroundLines: {
                  strokeDasharray: "5,5",
                  stroke: "rgba(255,255,255,0.2)"
                },
              }}
              bezier
              style={styles.chart}
            />
            ) : (
              <View style={styles.noChartContainer}>
                <Icon name="bar-chart-outline" size={48} color="#ccc" />
                <Text style={styles.noChartText}>Data tidak cukup untuk menampilkan grafik</Text>
              </View>
            )}
          </View>

          {/* Y-Axis Info */}
          <View style={styles.axisInfo}>
            <View style={styles.axisRow}>
              <Icon name="resize-outline" size={16} color="#666" />
              <Text style={styles.axisText}>Sumbu X: Tahun | Sumbu Y: Jumlah Penduduk</Text>
            </View>
          </View>

          {/* Current Value */}
          <View style={styles.currentValueContainer}>
            <Icon name="people-outline" size={20} color="#666" />
            <View style={styles.currentValueWrapper}>
              <Text style={styles.currentValueText}>
                Rata-rata Keseluruhan: <Text style={[styles.currentValue, { color: currentCategory.color }]}>{parseFloat(avgJumlah).toLocaleString('id-ID')}</Text>
              </Text>
              <View style={[styles.categoryBadge, { backgroundColor: currentCategory.color + '20' }]}>
                <Text style={[styles.categoryText, { color: currentCategory.color }]}>
                  {currentCategory.label}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Category Legend */}
        <View style={styles.legendCard}>
          <Text style={styles.legendTitle}>Kategori Angka Melek Huruf:</Text>
          <View style={styles.legendContent}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#43a047' }]} />
              <Text style={styles.legendText}>Sangat Tinggi (≥150.000)</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#1e88e5' }]} />
              <Text style={styles.legendText}>Tinggi (100.000 - 149.999)</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#fb8c00' }]} />
              <Text style={styles.legendText}>Sedang (50.000 - 99.999)</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#e53935' }]} />
              <Text style={styles.legendText}>Rendah {'(<50.000)'}</Text>
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
              <Text style={styles.infoText}>Menampilkan tren AMH 5 tahun terbaru</Text>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.infoDot} />
              <Text style={styles.infoText}>Sumbu X: Tahun | Sumbu Y: Jumlah Penduduk</Text>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.infoDot} />
              <Text style={styles.infoText}>AMH = Angka Melek Huruf (jumlah penduduk)</Text>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.infoDot} />
              <Text style={styles.infoText}>Total data: {dataAngkaMelekHuruf.length} Record | Chart: 5 Record Terbaru</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default GrafikAMH

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
  periodContent: {
    flex: 1,
    gap: 4,
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
  statLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
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
  legendCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    marginBottom: 16,
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
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  noDataText: {
    fontSize: 18,
    color: '#666',
    marginTop: 16,
    fontWeight: '600',
  },
  noDataSubText: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
  },
  noChartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    minHeight: 280,
  },
  noChartText: {
    fontSize: 14,
    color: '#999',
    marginTop: 16,
    textAlign: 'center',
  },
  })