import { View, Text, Dimensions, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { LineChart } from "react-native-chart-kit";
import { stateDataAngkaPartisipasiMurni } from '../../../state/dataAPM';
import { color } from '../../../constants/Helper';
import Icon from 'react-native-vector-icons/Ionicons';

const GrafikAPM = (props) => {
  const { dataAngkaPartisipasiMurni } = stateDataAngkaPartisipasiMurni()
  const [expanded, setExpanded] = useState(false);
  const [dataFiltered, setDataFiltered] = useState(dataAngkaPartisipasiMurni.filter(item => item.no === 1))
  const [selectedLevel, setSelectedLevel] = useState('SD')

  // Ambil 5 tahun terakhir dari data yang difilter
  const last5Years = dataFiltered.slice(-5);
  
  // Hitung statistik dari 5 tahun terakhir
  const values = last5Years.map(item => parseFloat(item.apm));
  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);
  const avgValue = (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1);
  const latestValue = values[values.length - 1];

  const getLevelColor = (level) => {
    if (level === 'SD') return '#4caf50';
    if (level === 'SMP') return '#2196f3';
    if (level === 'SMA') return '#ff9800';
    return '#666';
  };

  const handleFilterChange = (no, title) => {
    setDataFiltered(dataAngkaPartisipasiMurni.filter(item => item.no === no));
    setSelectedLevel(title);
    setExpanded(false);
  };

  const filterOptions = [
    { no: 1, title: 'SD', subtitle: '7-12 Tahun', icon: 'school' },
    { no: 2, title: 'SMP', subtitle: '13-15 Tahun', icon: 'book' },
    { no: 3, title: 'SMA', subtitle: '16-18 Tahun', icon: 'library' },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Icon name="analytics" size={32} color="#7e57c2" />
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
        {/* Filter Accordion */}
        <View style={styles.filterContainer}>
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => setExpanded(!expanded)}
          >
            <View style={styles.filterButtonContent}>
              <Icon name="filter" size={20} color="#7e57c2" />
              <Text style={styles.filterButtonText}>
                Jenjang: <Text style={styles.filterButtonValue}>{selectedLevel}</Text>
              </Text>
            </View>
            <Icon 
              name={expanded ? "chevron-up" : "chevron-down"} 
              size={20} 
              color="#7e57c2" 
            />
          </TouchableOpacity>

          {expanded && (
            <View style={styles.filterOptions}>
              {filterOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.filterOption,
                    selectedLevel === option.title && styles.filterOptionSelected
                  ]}
                  onPress={() => handleFilterChange(option.no, option.title)}
                >
                  <Icon 
                    name={option.icon} 
                    size={24} 
                    color={selectedLevel === option.title ? getLevelColor(option.title) : '#666'} 
                  />
                  <View style={styles.filterOptionContent}>
                    <Text style={[
                      styles.filterOptionTitle,
                      selectedLevel === option.title && { color: getLevelColor(option.title) }
                    ]}>
                      {option.title}
                    </Text>
                    <Text style={styles.filterOptionSubtitle}>{option.subtitle}</Text>
                  </View>
                  {selectedLevel === option.title && (
                    <Icon name="checkmark-circle" size={20} color={getLevelColor(option.title)} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Period Info */}
        <View style={styles.periodCard}>
          <Icon name="time-outline" size={24} color={getLevelColor(selectedLevel)} />
          <Text style={styles.periodText}>
            Periode: <Text style={[styles.periodValue, { color: getLevelColor(selectedLevel) }]}>
              {last5Years[0]?.tahun} - {last5Years[last5Years.length - 1]?.tahun}
            </Text>
          </Text>
        </View>

        {/* Statistics Cards */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: '#43a047' }]}>
            <Icon name="trending-up" size={24} color="#fff" />
            <Text style={styles.statValue}>{maxValue}%</Text>
            <Text style={styles.statLabel}>Tertinggi</Text>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: '#e53935' }]}>
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
            <Icon name="bar-chart" size={24} color={getLevelColor(selectedLevel)} />
            <Text style={styles.chartTitle}>Tren APM {selectedLevel} (5 Tahun)</Text>
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
                backgroundColor: getLevelColor(selectedLevel),
                backgroundGradientFrom: getLevelColor(selectedLevel),
                backgroundGradientTo: getLevelColor(selectedLevel),
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

          {/* Current Value */}
          <View style={styles.currentValueContainer}>
            <Icon name="calendar-outline" size={20} color="#666" />
            <View style={styles.currentValueWrapper}>
              <Text style={styles.currentValueText}>
                APM {selectedLevel} Terkini: <Text style={[styles.currentValue, { color: getLevelColor(selectedLevel) }]}>{latestValue}%</Text>
              </Text>
            </View>
          </View>
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Icon name="information-circle" size={24} color="#7e57c2" />
            <Text style={styles.infoTitle}>Informasi Grafik</Text>
          </View>
          <View style={styles.infoContent}>
            <View style={styles.infoRow}>
              <View style={styles.infoDot} />
              <Text style={styles.infoText}>Menampilkan data 5 tahun terakhir</Text>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.infoDot} />
              <Text style={styles.infoText}>APM ≤ 100% (hanya siswa usia sesuai)</Text>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.infoDot} />
              <Text style={styles.infoText}>Data periode {last5Years[0]?.tahun} - {last5Years[last5Years.length - 1]?.tahun}</Text>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.infoDot} />
              <Text style={styles.infoText}>APM lebih rendah dari APK karena tidak menghitung siswa di luar usia standar</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default GrafikAPM

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
  filterContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  filterButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  filterButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  filterButtonText: {
    fontSize: 16,
    color: '#666',
  },
  filterButtonValue: {
    fontWeight: 'bold',
    color: '#7e57c2',
  },
  filterOptions: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  filterOptionSelected: {
    backgroundColor: '#f5f5f5',
  },
  filterOptionContent: {
    flex: 1,
  },
  filterOptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  filterOptionSubtitle: {
    fontSize: 12,
    color: '#999',
  },
  periodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    gap: 12,
    elevation: 1,
  },
  periodText: {
    fontSize: 14,
    color: '#666',
  },
  periodValue: {
    fontWeight: 'bold',
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
    fontSize: 16,
  },
  infoCard: {
    backgroundColor: '#EDE7F6',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#7e57c2',
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
    backgroundColor: '#7e57c2',
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    flex: 1,
  },
})