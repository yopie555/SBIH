import { View, Text, Dimensions, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { LineChart } from "react-native-chart-kit";
import { stateDataPersentasePendudukUsia } from '../../../state/dataPPU';
import { color } from '../../../constants/Helper';
import Icon from 'react-native-vector-icons/Ionicons';

const GrafikPPU = (props) => {
  const {dataPersentasePendudukUsia} = stateDataPersentasePendudukUsia()
  
  const dataLaki = dataPersentasePendudukUsia.map(item => parseFloat(item.laki));
  const dataPerempuan = dataPersentasePendudukUsia.map(item => parseFloat(item.perempuan));
  const dataTotal = dataPersentasePendudukUsia.map(item => parseFloat(item.total));

  // Statistik
  const avgLaki = (dataLaki.reduce((a, b) => a + b, 0) / dataLaki.length).toFixed(2);
  const avgPerempuan = (dataPerempuan.reduce((a, b) => a + b, 0) / dataPerempuan.length).toFixed(2);
  const avgTotal = (dataTotal.reduce((a, b) => a + b, 0) / dataTotal.length).toFixed(2);

  // Gap Gender
  const genderGap = Math.abs(avgLaki - avgPerempuan).toFixed(2);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Icon name="analytics" size={32} color="#1976d2" />
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

          <View style={styles.genderDivider} />

          <View style={styles.genderSummaryItem}>
            <Icon name="people" size={24} color="#1976d2" />
            <View style={styles.genderSummaryContent}>
              <Text style={styles.genderSummaryLabel}>Total</Text>
              <Text style={[styles.genderSummaryValue, { color: '#1976d2' }]}>
                {avgTotal}%
              </Text>
              <Text style={styles.genderSummarySubtext}>Rata-rata</Text>
            </View>
          </View>
        </View>

        {/* Chart Card */}
        <View style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <Icon name="bar-chart" size={24} color="#1976d2" />
            <Text style={styles.chartTitle}>Perbandingan Gender per Pendidikan</Text>
          </View>
          
          <View style={styles.chartWrapper}>
            <LineChart
              data={{
                labels: dataPersentasePendudukUsia.map(item => item.pendidikan),
                datasets: [
                  {
                    data: dataLaki,
                    color: (opacity = 1) => `rgba(30, 136, 229, ${opacity})`,
                    strokeWidth: 3
                  },
                  {
                    data: dataPerempuan,
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
                backgroundColor: "#1976d2",
                backgroundGradientFrom: "#1976d2",
                backgroundGradientTo: "#1565c0",
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

        {/* Gender Gap Card */}
        <View style={styles.gapCard}>
          <Text style={styles.gapTitle}>Kesenjangan Gender</Text>
          <View style={styles.gapContent}>
            <View style={styles.gapItem}>
              <Text style={styles.gapLabel}>Selisih Rata-rata:</Text>
              <Text style={[styles.gapValue, { color: '#1976d2' }]}>
                {genderGap}%
              </Text>
            </View>
            <Text style={styles.gapDescription}>
              {parseFloat(genderGap) < 2 
                ? 'Distribusi gender cukup seimbang' 
                : 'Terdapat kesenjangan gender yang perlu diperhatikan'}
            </Text>
          </View>
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Icon name="information-circle" size={24} color="#1976d2" />
            <Text style={styles.infoTitle}>Informasi Grafik</Text>
          </View>
          <View style={styles.infoContent}>
            <View style={styles.infoRow}>
              <View style={styles.infoDot} />
              <Text style={styles.infoText}>Perbandingan persentase berdasarkan tingkat pendidikan</Text>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.infoDot} />
              <Text style={styles.infoText}>Garis biru = Laki-laki, Garis pink = Perempuan</Text>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.infoDot} />
              <Text style={styles.infoText}>Total {dataPersentasePendudukUsia.length} kategori pendidikan</Text>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.infoDot} />
              <Text style={styles.infoText}>PPU = Persentase Penduduk Usia (dalam %)</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default GrafikPPU

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
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  genderSummaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  genderSummaryContent: {
    alignItems: 'center',
    marginTop: 8,
  },
  genderSummaryLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  genderSummaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  genderSummarySubtext: {
    fontSize: 10,
    color: '#999',
  },
  genderDivider: {
    width: 1,
    backgroundColor: '#e0e0e0',
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
  gapCard: {
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
  infoCard: {
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#1976d2',
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
    backgroundColor: '#1976d2',
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    flex: 1,
  },
})