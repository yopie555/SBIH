import { View, Text, Dimensions, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { LineChart } from "react-native-chart-kit";
import { stateDataJumlahPenduduk } from '../../../state/dataJP';
import { color, formatNumber } from '../../../constants/Helper';
import Icon from 'react-native-vector-icons/Ionicons';

const GrafikJP = (props) => {
  const { dataJumlahPenduduk } = stateDataJumlahPenduduk()

  // Urutkan data berdasarkan tahun dari terdahulu hingga sekarang, lalu ambil 5 tahun terakhir
  const sortedData = [...(dataJumlahPenduduk || [])].sort((a, b) => parseInt(a.tahun) - parseInt(b.tahun));
  const last5Years = sortedData.slice(-5);
  
  // Data untuk grafik
  const lakiData = last5Years.map(item => parseInt(item.laki));
  const perempuanData = last5Years.map(item => parseInt(item.perempuan));
  const totalData = last5Years.map(item => parseInt(item.total));
  
  // Statistik
  const latestData = last5Years[last5Years.length - 1];
  const maxTotal = Math.max(...totalData);
  const minTotal = Math.min(...totalData);
  

  // Hitung persentase gender
  const lakiPct = ((parseInt(latestData.laki) / parseInt(latestData.total)) * 100).toFixed(1);
  const perempuanPct = ((parseInt(latestData.perempuan) / parseInt(latestData.total)) * 100).toFixed(1);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Icon name="analytics" size={32} color="#3949ab" />
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
          <Icon name="time-outline" size={24} color="#3949ab" />
          <Text style={styles.periodText}>
            Periode: <Text style={styles.periodValue}>{last5Years[0]?.tahun} - {last5Years[last5Years.length - 1]?.tahun}</Text>
          </Text>
        </View>

        {/* Current Statistics */}
        <View style={styles.currentStatsCard}>
          <Text style={styles.currentStatsTitle}>Data Terkini ({latestData.tahun})</Text>
          <View style={styles.currentStatsContent}>
            <View style={styles.currentStatItem}>
              <Icon name="male" size={24} color="#1e88e5" />
              <View style={styles.currentStatText}>
                <Text style={styles.currentStatLabel}>Laki-laki</Text>
                <Text style={[styles.currentStatValue, { color: '#1e88e5' }]}>
                  {formatNumber(latestData.laki)}
                </Text>
                <Text style={styles.currentStatPct}>{lakiPct}%</Text>
              </View>
            </View>

            <View style={styles.currentStatDivider} />

            <View style={styles.currentStatItem}>
              <Icon name="female" size={24} color="#e91e63" />
              <View style={styles.currentStatText}>
                <Text style={styles.currentStatLabel}>Perempuan</Text>
                <Text style={[styles.currentStatValue, { color: '#e91e63' }]}>
                  {formatNumber(latestData.perempuan)}
                </Text>
                <Text style={styles.currentStatPct}>{perempuanPct}%</Text>
              </View>
            </View>

            <View style={styles.currentStatDivider} />

            <View style={styles.currentStatItem}>
              <Icon name="people" size={24} color="#3949ab" />
              <View style={styles.currentStatText}>
                <Text style={styles.currentStatLabel}>Total</Text>
                <Text style={[styles.currentStatValue, { color: '#3949ab' }]}>
                  {formatNumber(latestData.total)}
                </Text>
                <Text style={styles.currentStatPct}>100%</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Chart Card */}
        <View style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <Icon name="bar-chart" size={24} color="#3949ab" />
            <Text style={styles.chartTitle}>Tren Jumlah Penduduk</Text>
          </View>
          
          <View style={styles.chartWrapper}>
            <LineChart
              data={{
                labels: last5Years.map(item => item.tahun),
                datasets: [
                  {
                    data: lakiData,
                    color: (opacity = 1) => `rgba(30, 136, 229, ${opacity})`,
                    strokeWidth: 3
                  },
                  {
                    data: perempuanData,
                    color: (opacity = 1) => `rgba(233, 30, 99, ${opacity})`,
                    strokeWidth: 3
                  }
                ],
                legend: ["Laki-laki", "Perempuan"]
              }}
              width={Dimensions.get("window").width - 48}
              height={280}
              yAxisInterval={1}
              fromZero={true}
              chartConfig={{
                backgroundColor: "#3949ab",
                backgroundGradientFrom: "#3949ab",
                backgroundGradientTo: "#283593",
                decimalPlaces: 0,
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

          {/* Legend Custom */}
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
            <Icon name="information-circle" size={24} color="#3949ab" />
            <Text style={styles.infoTitle}>Informasi Grafik</Text>
          </View>
          <View style={styles.infoContent}>
            <View style={styles.infoRow}>
              <View style={styles.infoDot} />
              <Text style={styles.infoText}>Menampilkan perbandingan jumlah penduduk berdasarkan gender</Text>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.infoDot} />
              <Text style={styles.infoText}>Data 5 tahun terakhir ({last5Years[0]?.tahun} - {last5Years[last5Years.length - 1]?.tahun})</Text>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.infoDot} />
              <Text style={styles.infoText}>Garis biru = Laki-laki, Garis pink = Perempuan</Text>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.infoDot} />
              <Text style={styles.infoText}>Total penduduk terkini: {formatNumber(latestData.total)} orang</Text>
            </View>
          </View>
        </View>

        {/* Gender Ratio Card */}
        <View style={styles.ratioCard}>
          <Text style={styles.ratioTitle}>Rasio Gender ({latestData.tahun})</Text>
          <View style={styles.ratioBar}>
            <View style={[styles.ratioBarFill, { width: `${lakiPct}%`, backgroundColor: '#1e88e5' }]}>
              <Text style={styles.ratioBarText}>{lakiPct}%</Text>
            </View>
            <View style={[styles.ratioBarFill, { width: `${perempuanPct}%`, backgroundColor: '#e91e63' }]}>
              <Text style={styles.ratioBarText}>{perempuanPct}%</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default GrafikJP

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
    backgroundColor: '#E8EAF6',
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
    color: '#3949ab',
  },
  currentStatsCard: {
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
  currentStatsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  currentStatsContent: {
    flexDirection: 'row',
  },
  currentStatItem: {
    flex: 1,
    alignItems: 'center',
  },
  currentStatText: {
    alignItems: 'center',
    marginTop: 8,
  },
  currentStatLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  currentStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  currentStatPct: {
    fontSize: 11,
    color: '#999',
  },
  currentStatDivider: {
    width: 1,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 8,
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
    backgroundColor: '#E8EAF6',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#3949ab',
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
    backgroundColor: '#3949ab',
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    flex: 1,
  },
  ratioCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  ratioTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  ratioBar: {
    flexDirection: 'row',
    height: 40,
    borderRadius: 8,
    overflow: 'hidden',
  },
  ratioBarFill: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratioBarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
})