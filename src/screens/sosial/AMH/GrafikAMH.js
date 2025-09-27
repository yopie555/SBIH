import { View, Text, Dimensions, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { LineChart } from "react-native-chart-kit";
import { stateDataAngkaMelekHuruf } from '../../../state/dataAMH';
import { color } from '../../../constants/Helper';
import Icon from 'react-native-vector-icons/Ionicons';

const GrafikAMH = (props) => {
  const {dataAngkaMelekHuruf} = stateDataAngkaMelekHuruf()

  const kel_umur = dataAngkaMelekHuruf.map(item => item.kel_umur)
  const dataPresentasLaki = dataAngkaMelekHuruf.map(item => parseFloat(item.laki))
  const dataPresentasePerempuan = dataAngkaMelekHuruf.map(item => parseFloat(item.perempuan))

  // Statistik
  const avgLaki = (dataPresentasLaki.reduce((a, b) => a + b, 0) / dataPresentasLaki.length).toFixed(2);
  const avgPerempuan = (dataPresentasePerempuan.reduce((a, b) => a + b, 0) / dataPresentasePerempuan.length).toFixed(2);
  const maxLaki = Math.max(...dataPresentasLaki);
  const minLaki = Math.min(...dataPresentasLaki);
  const maxPerempuan = Math.max(...dataPresentasePerempuan);
  const minPerempuan = Math.min(...dataPresentasePerempuan);

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
        {/* Gender Stats Summary */}
        <View style={styles.genderSummary}>
          <View style={styles.genderSummaryItem}>
            <Icon name="male" size={24} color="#1e88e5" />
            <View style={styles.genderSummaryContent}>
              <Text style={styles.genderSummaryLabel}>Laki-laki</Text>
              <Text style={[styles.genderSummaryValue, { color: '#1e88e5' }]}>
                {avgLaki}%
              </Text>
              <Text style={styles.genderSummarySubtext}>Rata-rata</Text>
            </View>
          </View>

          <View style={styles.genderDivider} />

          <View style={styles.genderSummaryItem}>
            <Icon name="female" size={24} color="#e91e63" />
            <View style={styles.genderSummaryContent}>
              <Text style={styles.genderSummaryLabel}>Perempuan</Text>
              <Text style={[styles.genderSummaryValue, { color: '#e91e63' }]}>
                {avgPerempuan}%
              </Text>
              <Text style={styles.genderSummarySubtext}>Rata-rata</Text>
            </View>
          </View>
        </View>

        {/* Statistics Cards */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Tertinggi</Text>
            <View style={styles.statValues}>
              <View style={styles.statValueItem}>
                <Icon name="male" size={16} color="#1e88e5" />
                <Text style={[styles.statValue, { color: '#1e88e5' }]}>{maxLaki}%</Text>
              </View>
              <View style={styles.statValueItem}>
                <Icon name="female" size={16} color="#e91e63" />
                <Text style={[styles.statValue, { color: '#e91e63' }]}>{maxPerempuan}%</Text>
              </View>
            </View>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Terendah</Text>
            <View style={styles.statValues}>
              <View style={styles.statValueItem}>
                <Icon name="male" size={16} color="#1e88e5" />
                <Text style={[styles.statValue, { color: '#1e88e5' }]}>{minLaki}%</Text>
              </View>
              <View style={styles.statValueItem}>
                <Icon name="female" size={16} color="#e91e63" />
                <Text style={[styles.statValue, { color: '#e91e63' }]}>{minPerempuan}%</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Chart Card */}
        <View style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <Icon name="bar-chart" size={24} color="#00897b" />
            <Text style={styles.chartTitle}>Grafik Perbandingan Gender</Text>
          </View>
          
          <View style={styles.chartWrapper}>
            <LineChart
              data={{
                labels: kel_umur,
                datasets: [
                  {
                    data: dataPresentasLaki,
                    color: (opacity = 1) => `rgba(30, 136, 229, ${opacity})`,
                    strokeWidth: 3
                  },
                  {
                    data: dataPresentasePerempuan,
                    color: (opacity = 1) => `rgba(233, 30, 99, ${opacity})`,
                    strokeWidth: 3
                  }
                ],
                legend: ["Laki-laki", "Perempuan"]
              }}
              width={Dimensions.get("window").width - 48}
              height={280}
              yAxisSuffix="%"
              yAxisInterval={1}
              fromZero={true}
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
                  r: "5",
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
          </View>

          {/* Custom Legend */}
          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#1e88e5' }]} />
              <Text style={styles.legendText}>Laki-laki</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#e91e63' }]} />
              <Text style={styles.legendText}>Perempuan</Text>
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
              <Text style={styles.infoText}>Perbandingan AMH berdasarkan kelompok umur</Text>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.infoDot} />
              <Text style={styles.infoText}>Garis biru = Laki-laki, Garis pink = Perempuan</Text>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.infoDot} />
              <Text style={styles.infoText}>Total {dataAngkaMelekHuruf.length} kelompok umur</Text>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.infoDot} />
              <Text style={styles.infoText}>AMH = Angka Melek Huruf (dalam %)</Text>
            </View>
          </View>
        </View>

        {/* Gap Analysis */}
        <View style={styles.gapCard}>
          <Text style={styles.gapTitle}>Analisis Gap Gender</Text>
          <View style={styles.gapContent}>
            <View style={styles.gapItem}>
              <Text style={styles.gapLabel}>Selisih Rata-rata:</Text>
              <Text style={[styles.gapValue, { color: avgLaki > avgPerempuan ? '#1e88e5' : '#e91e63' }]}>
                {Math.abs(avgLaki - avgPerempuan).toFixed(2)}%
              </Text>
            </View>
            <Text style={styles.gapDescription}>
              {avgLaki > avgPerempuan 
                ? 'Laki-laki memiliki tingkat melek huruf lebih tinggi' 
                : avgPerempuan > avgLaki 
                ? 'Perempuan memiliki tingkat melek huruf lebih tinggi'
                : 'Tingkat melek huruf setara'}
            </Text>
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
  genderSummary: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  genderSummaryItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  genderSummaryContent: {
    flex: 1,
  },
  genderSummaryLabel: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  genderSummaryValue: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  genderSummarySubtext: {
    fontSize: 11,
    color: '#999',
  },
  genderDivider: {
    width: 1,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 16,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    fontWeight: '600',
  },
  statValues: {
    gap: 8,
  },
  statValueItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
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
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
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
  gapCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  gapTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  gapContent: {
    gap: 8,
  },
  gapItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  gapLabel: {
    fontSize: 14,
    color: '#666',
  },
  gapValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  gapDescription: {
    fontSize: 14,
    color: '#555',
    fontStyle: 'italic',
  },
})