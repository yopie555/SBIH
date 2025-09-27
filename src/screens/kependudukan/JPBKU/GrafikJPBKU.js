import { View, Text, Dimensions, Modal, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { LineChart } from "react-native-chart-kit";
import { stateDataJumlahPendudukBerdasarkanKelompokUmur } from '../../../state/dataJPBKU';
import { color } from '../../../constants/Helper';
import Icon from 'react-native-vector-icons/Ionicons';

const GrafikPP = (props) => {
  const { dataJumlahPendudukBerdasarkanKelompokUmur } = stateDataJumlahPendudukBerdasarkanKelompokUmur()
  const [dataFiltered, setDataFiltered] = React.useState(dataJumlahPendudukBerdasarkanKelompokUmur.filter(item => item.kelompok_umur == 1))
  const [title, setTitle] = React.useState("0-4 Tahun")
  const [selectedGroup, setSelectedGroup] = React.useState(1)
  const [modalVisible, setModalVisible] = React.useState(false)

  const ageGroups = [
    { id: 1, label: '0-4 Tahun', icon: 'body' },
    { id: 2, label: '5-9 Tahun', icon: 'school' },
    { id: 3, label: '10-14 Tahun', icon: 'bicycle' },
    { id: 4, label: '15-19 Tahun', icon: 'tennisball' },
    { id: 5, label: '20-24 Tahun', icon: 'briefcase' },
    { id: 6, label: '25-29 Tahun', icon: 'people' },
    { id: 7, label: '30-34 Tahun', icon: 'business' },
    { id: 8, label: '35-39 Tahun', icon: 'trending-up' },
    { id: 9, label: '40-44 Tahun', icon: 'analytics' },
    { id: 10, label: '45-49 Tahun', icon: 'book' },
    { id: 11, label: '50-54 Tahun', icon: 'newspaper' },
    { id: 12, label: '55-59 Tahun', icon: 'desktop' },
    { id: 13, label: '60-64 Tahun', icon: 'home' },
    { id: 14, label: '65-69 Tahun', icon: 'heart' },
    { id: 15, label: '70-74 Tahun', icon: 'leaf' },
    { id: 16, label: '75+ Tahun', icon: 'flower' },
  ]

  const handleSelectGroup = (group) => {
    setDataFiltered(dataJumlahPendudukBerdasarkanKelompokUmur.filter(item => item.kelompok_umur == group.id))
    setTitle(group.label)
    setSelectedGroup(group.id)
    setModalVisible(false)
  }

  const getAgeCategory = (groupId) => {
    if (groupId >= 1 && groupId <= 3) return { label: 'Anak', color: '#42A5F5' };
    if (groupId >= 4 && groupId <= 6) return { label: 'Remaja-Dewasa Muda', color: '#66BB6A' };
    if (groupId >= 7 && groupId <= 11) return { label: 'Dewasa', color: '#FFA726' };
    return { label: 'Lansia', color: '#EF5350' };
  };

  // Ambil 5 tahun terakhir
  const last5Years = dataFiltered?.slice(-5) || [];
  
  // Hitung statistik dari 5 tahun terakhir
  const values = last5Years.map(item => parseFloat(item.jumlah));
  const maxValue = values.length > 0 ? Math.max(...values) : 0;
  const minValue = values.length > 0 ? Math.min(...values) : 0;
  const avgValue = values.length > 0 ? (values.reduce((a, b) => a + b, 0) / values.length).toFixed(0) : 0;
  const latestValue = values.length > 0 ? values[values.length - 1] : 0;

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const category = getAgeCategory(selectedGroup);

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

      {/* Modal Filter */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Pilih Kelompok Umur</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                <Icon name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false}>
              {ageGroups.map((group) => (
                <TouchableOpacity 
                  key={group.id}
                  onPress={() => handleSelectGroup(group)}
                  style={[
                    styles.modalItem,
                    selectedGroup === group.id && styles.modalItemActive
                  ]}
                >
                  <Icon 
                    name={group.icon} 
                    size={24} 
                    color={selectedGroup === group.id ? '#00acc1' : '#666'} 
                  />
                  <Text style={[
                    styles.modalItemText,
                    selectedGroup === group.id && styles.modalItemTextActive
                  ]}>
                    {group.label}
                  </Text>
                  {selectedGroup === group.id && (
                    <Icon name="checkmark-circle" size={24} color="#00acc1" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Filter Button */}
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.filterButton}>
          <Icon name="filter" size={20} color="#00acc1" />
          <Text style={styles.filterButtonText}>{title}</Text>
          <Icon name="chevron-down" size={20} color="#00acc1" />
        </TouchableOpacity>

        {/* Category Badge */}
        <View style={[styles.categoryCard, { backgroundColor: category.color + '20' }]}>
          <Icon name="ribbon" size={24} color={category.color} />
          <Text style={[styles.categoryCardText, { color: category.color }]}>
            Kategori: {category.label}
          </Text>
        </View>

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
              <Text style={styles.statValue}>{formatNumber(maxValue)}</Text>
              <Text style={styles.statLabel}>Tertinggi</Text>
            </View>
            
            <View style={[styles.statCard, { backgroundColor: '#e53935' }]}>
              <Icon name="trending-down" size={24} color="#fff" />
              <Text style={styles.statValue}>{formatNumber(minValue)}</Text>
              <Text style={styles.statLabel}>Terendah</Text>
            </View>
            
            <View style={[styles.statCard, { backgroundColor: '#1e88e5' }]}>
              <Icon name="calculator" size={24} color="#fff" />
              <Text style={styles.statValue}>{formatNumber(avgValue)}</Text>
              <Text style={styles.statLabel}>Rata-rata</Text>
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
                  Jumlah Terkini: <Text style={[styles.currentValue, { color: '#00acc1' }]}>{formatNumber(latestValue)} Jiwa</Text>
                </Text>
                <View style={[styles.categoryBadge, { backgroundColor: category.color + '20' }]}>
                  <Text style={[styles.categoryText, { color: category.color }]}>
                    {category.label}
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
                  {latestValue > values[0] ? '↑' : '↓'} {formatNumber(Math.abs(latestValue - values[0]))} jiwa
                </Text>
              </View>
              <Text style={styles.trendDescription}>
                {latestValue > values[0] 
                  ? `Tren meningkat, jumlah penduduk kelompok ${title} bertambah` 
                  : `Tren menurun, jumlah penduduk kelompok ${title} berkurang`}
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
                <Text style={styles.infoText}>Kelompok umur: {title}</Text>
              </View>
              <View style={styles.infoRow}>
                <View style={styles.infoDot} />
                <Text style={styles.infoText}>Data periode {last5Years[0]?.tahun} - {last5Years[last5Years.length - 1]?.tahun}</Text>
              </View>
              <View style={styles.infoRow}>
                <View style={styles.infoDot} />
                <Text style={styles.infoText}>Jumlah dalam satuan jiwa/orang</Text>
              </View>
            </View>
          </View>
        )}

        {/* Category Legend */}
        <View style={styles.legendCard}>
          <Text style={styles.legendTitle}>Kategori Kelompok Umur:</Text>
          <View style={styles.legendContent}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#42A5F5' }]} />
              <Text style={styles.legendText}>Anak (0-14 tahun)</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#66BB6A' }]} />
              <Text style={styles.legendText}>Remaja-Dewasa Muda (15-29 tahun)</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#FFA726' }]} />
              <Text style={styles.legendText}>Dewasa (30-54 tahun)</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#EF5350' }]} />
              <Text style={styles.legendText}>Lansia (55+ tahun)</Text>
            </View>
          </View>
        </View>

        {/* Empty State */}
        {(!dataFiltered || dataFiltered.length === 0) && (
          <View style={styles.emptyState}>
            <Icon name="people-outline" size={80} color="#ccc" />
            <Text style={styles.emptyText}>Belum ada data untuk kelompok umur ini</Text>
          </View>
        )}
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  closeButton: {
    padding: 4,
  },
  modalScroll: {
    paddingHorizontal: 16,
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    marginTop: 8,
    gap: 12,
  },
  modalItemActive: {
    backgroundColor: '#E0F7FA',
    borderWidth: 2,
    borderColor: '#00acc1',
  },
  modalItemText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  modalItemTextActive: {
    color: '#00acc1',
    fontWeight: 'bold',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 30,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E0F7FA',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 10,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  filterButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00acc1',
    flex: 1,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    gap: 10,
    marginBottom: 16,
  },
  categoryCardText: {
    fontSize: 16,
    fontWeight: 'bold',
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
    fontSize: 15,
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
    textAlign: 'center',
  },
})