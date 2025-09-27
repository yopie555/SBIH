import { View, Text, Dimensions, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { LineChart } from "react-native-chart-kit";
import { stateDataJumlahPendudukBerdasarkanKecamatan } from '../../../state/dataJBPK';
import { color } from '../../../constants/Helper';
import Icon from 'react-native-vector-icons/Ionicons';

const GrafikPP = (props) => {
  const { dataJumlahPendudukBerdasarkanKecamatan } = stateDataJumlahPendudukBerdasarkanKecamatan()
  
  const dataPresentaseLaki = dataJumlahPendudukBerdasarkanKecamatan.map(item => parseInt(item.laki))
  const dataPresentasePerempuan = dataJumlahPendudukBerdasarkanKecamatan.map(item => parseInt(item.perempuan))
  
  // Hitung statistik
  const totalLaki = dataPresentaseLaki.reduce((sum, val) => sum + val, 0);
  const totalPerempuan = dataPresentasePerempuan.reduce((sum, val) => sum + val, 0);
  const totalPenduduk = totalLaki + totalPerempuan;
  const genderRatio = ((totalLaki / totalPerempuan) * 100).toFixed(1);
  
  const maxLaki = Math.max(...dataPresentaseLaki);
  const maxPerempuan = Math.max(...dataPresentasePerempuan);
  const minLaki = Math.min(...dataPresentaseLaki);
  const minPerempuan = Math.min(...dataPresentasePerempuan);
  
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Cari kecamatan dengan penduduk terbanyak
  const maxTotalIndex = dataJumlahPendudukBerdasarkanKecamatan.reduce((maxIdx, item, idx, arr) => {
    const currentTotal = parseInt(item.laki) + parseInt(item.perempuan);
    const maxTotal = parseInt(arr[maxIdx].laki) + parseInt(arr[maxIdx].perempuan);
    return currentTotal > maxTotal ? idx : maxIdx;
  }, 0);
  
  const kecamatanTerbanyak = dataJumlahPendudukBerdasarkanKecamatan[maxTotalIndex];

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
        {/* Summary Stats */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: '#1e88e5' }]}>
            <Icon name="male" size={28} color="#fff" />
            <Text style={styles.statValue}>{formatNumber(totalLaki)}</Text>
            <Text style={styles.statLabel}>Total Laki-laki</Text>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: '#e91e63' }]}>
            <Icon name="female" size={28} color="#fff" />
            <Text style={styles.statValue}>{formatNumber(totalPerempuan)}</Text>
            <Text style={styles.statLabel}>Total Perempuan</Text>
          </View>
        </View>

        {/* Gender Ratio Card */}
        <View style={styles.ratioCard}>
          <View style={styles.ratioHeader}>
            <Icon name="git-compare" size={24} color="#00acc1" />
            <Text style={styles.ratioTitle}>Rasio Jenis Kelamin</Text>
          </View>
          <Text style={styles.ratioValue}>{genderRatio}</Text>
          <Text style={styles.ratioSubtitle}>Laki-laki per 100 Perempuan</Text>
          <Text style={styles.ratioDescription}>
            {genderRatio > 100 
              ? `Jumlah laki-laki lebih banyak ${((genderRatio - 100)).toFixed(1)}%`
              : genderRatio < 100
              ? `Jumlah perempuan lebih banyak ${((100 - genderRatio)).toFixed(1)}%`
              : 'Jumlah laki-laki dan perempuan seimbang'}
          </Text>
        </View>

        {/* Chart Card */}
        <View style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <Icon name="bar-chart" size={24} color="#00acc1" />
            <Text style={styles.chartTitle}>Perbandingan per Kecamatan</Text>
          </View>
          
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

          <ScrollView horizontal showsHorizontalScrollIndicator={true}>
            <LineChart
              data={{
                labels: dataJumlahPendudukBerdasarkanKecamatan.map(item => item.kecamatan),
                datasets: [
                  {
                    data: dataPresentaseLaki,
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
              width={Math.max(Dimensions.get("window").width - 48, dataJumlahPendudukBerdasarkanKecamatan.length * 80)}
              height={280}
              yAxisInterval={1}
              fromZero={true}
              chartConfig={{
                backgroundColor: "#00acc1",
                backgroundGradientFrom: "#00acc1",
                backgroundGradientTo: "#0097a7",
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
                  stroke: "rgba(255,255,255,0.2)"
                },
              }}
              bezier
              style={styles.chart}
            />
          </ScrollView>
        </View>

        {/* Highlight Card */}
        <View style={styles.highlightCard}>
          <View style={styles.highlightHeader}>
            <Icon name="trophy" size={24} color="#fb8c00" />
            <Text style={styles.highlightTitle}>Kecamatan Terpadat</Text>
          </View>
          <Text style={styles.highlightDistrict}>{kecamatanTerbanyak.kecamatan}</Text>
          <View style={styles.highlightStats}>
            <View style={styles.highlightItem}>
              <Icon name="male" size={20} color="#1e88e5" />
              <Text style={styles.highlightValue}>{formatNumber(kecamatanTerbanyak.laki)}</Text>
            </View>
            <View style={styles.highlightDivider} />
            <View style={styles.highlightItem}>
              <Icon name="female" size={20} color="#e91e63" />
              <Text style={styles.highlightValue}>{formatNumber(kecamatanTerbanyak.perempuan)}</Text>
            </View>
          </View>
          <Text style={styles.highlightTotal}>
            Total: {formatNumber(parseInt(kecamatanTerbanyak.laki) + parseInt(kecamatanTerbanyak.perempuan))} jiwa
          </Text>
        </View>

        {/* Min-Max Stats */}
        <View style={styles.minMaxCard}>
          <Text style={styles.minMaxTitle}>Statistik Detail</Text>
          <View style={styles.minMaxContent}>
            <View style={styles.minMaxRow}>
              <Icon name="trending-up" size={20} color="#43a047" />
              <View style={styles.minMaxInfo}>
                <Text style={styles.minMaxLabel}>Tertinggi (Laki-laki)</Text>
                <Text style={styles.minMaxValue}>{formatNumber(maxLaki)} jiwa</Text>
              </View>
            </View>
            <View style={styles.minMaxRow}>
              <Icon name="trending-down" size={20} color="#e53935" />
              <View style={styles.minMaxInfo}>
                <Text style={styles.minMaxLabel}>Terendah (Laki-laki)</Text>
                <Text style={styles.minMaxValue}>{formatNumber(minLaki)} jiwa</Text>
              </View>
            </View>
            <View style={styles.minMaxDivider} />
            <View style={styles.minMaxRow}>
              <Icon name="trending-up" size={20} color="#43a047" />
              <View style={styles.minMaxInfo}>
                <Text style={styles.minMaxLabel}>Tertinggi (Perempuan)</Text>
                <Text style={styles.minMaxValue}>{formatNumber(maxPerempuan)} jiwa</Text>
              </View>
            </View>
            <View style={styles.minMaxRow}>
              <Icon name="trending-down" size={20} color="#e53935" />
              <View style={styles.minMaxInfo}>
                <Text style={styles.minMaxLabel}>Terendah (Perempuan)</Text>
                <Text style={styles.minMaxValue}>{formatNumber(minPerempuan)} jiwa</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Icon name="information-circle" size={24} color="#00acc1" />
            <Text style={styles.infoTitle}>Informasi Grafik</Text>
          </View>
          <View style={styles.infoContent}>
            <View style={styles.infoRow}>
              <View style={styles.infoDot} />
              <Text style={styles.infoText}>Grafik menampilkan perbandingan jumlah penduduk laki-laki dan perempuan</Text>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.infoDot} />
              <Text style={styles.infoText}>Garis biru mewakili jumlah laki-laki per kecamatan</Text>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.infoDot} />
              <Text style={styles.infoText}>Garis pink mewakili jumlah perempuan per kecamatan</Text>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.infoDot} />
              <Text style={styles.infoText}>Scroll horizontal untuk melihat semua kecamatan</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default GrafikPP

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
    textAlign: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 4,
    textAlign: 'center',
  },
  ratioCard: {
    backgroundColor: '#E0F7FA',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
  },
  ratioHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  ratioTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  ratioValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#00acc1',
    marginVertical: 8,
  },
  ratioSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  ratioDescription: {
    fontSize: 13,
    color: '#006064',
    fontStyle: 'italic',
    textAlign: 'center',
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
    marginBottom: 12,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 12,
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
    color: '#555',
    fontWeight: '500',
  },
  chart: {
    borderRadius: 16,
    marginVertical: 8,
  },
  highlightCard: {
    backgroundColor: '#FFF3E0',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#fb8c00',
  },
  highlightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  highlightTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  highlightDistrict: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fb8c00',
    marginBottom: 12,
  },
  highlightStats: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    gap: 16,
  },
  highlightItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  highlightDivider: {
    width: 1,
    backgroundColor: '#e0e0e0',
  },
  highlightValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  highlightTotal: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontWeight: '500',
  },
  minMaxCard: {
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
  minMaxTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  minMaxContent: {
    gap: 12,
  },
  minMaxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  minMaxInfo: {
    flex: 1,
  },
  minMaxLabel: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  minMaxValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  minMaxDivider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 4,
  },
  infoCard: {
    backgroundColor: '#E0F7FA',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#00acc1',
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
})