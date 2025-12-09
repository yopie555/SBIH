import { StyleSheet, Text, View, ScrollView, Modal, TouchableOpacity, Animated } from 'react-native'
import React, { useRef, useEffect } from 'react'
import { stateDataJumlahPendudukBerdasarkanKelompokUmur } from '../../../state/dataJPBKU'
import { color, formatNumber } from '../../../constants/Helper'
import Icon from 'react-native-vector-icons/Ionicons'

const AnimatedCard = ({ children, delay = 0 }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(20)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 400,
                delay,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 400,
                delay,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <Animated.View
            style={{
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
            }}
        >
            {children}
        </Animated.View>
    );
};

const DetailPP = (props) => {
  const { dataJumlahPendudukBerdasarkanKelompokUmur } = stateDataJumlahPendudukBerdasarkanKelompokUmur()
  
  // Sort data dari tahun terbaru ke terlama untuk filter awal
  const initialFilteredData = dataJumlahPendudukBerdasarkanKelompokUmur
    ?.filter(item => item.kelompok_umur == 1)
    ?.sort((a, b) => {
      const yearA = parseInt(a.tahun) || 0;
      const yearB = parseInt(b.tahun) || 0;
      return yearB - yearA;
    }) || [];

  const [dataFiltered, setDataFiltered] = React.useState(initialFilteredData)
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
    // Filter dan sort data
    const filtered = dataJumlahPendudukBerdasarkanKelompokUmur
      ?.filter(item => item.kelompok_umur == group.id)
      ?.sort((a, b) => {
        const yearA = parseInt(a.tahun) || 0;
        const yearB = parseInt(b.tahun) || 0;
        return yearB - yearA; // Descending order (terbaru ke terlama)
      }) || [];
    
    setDataFiltered(filtered)
    setTitle(group.label)
    setSelectedGroup(group.id)
    setModalVisible(false)
  }

  const getStatusColor = (status) => {
    if (!status) return '#666';
    if (status.toLowerCase().includes('tetap')) return '#43a047';
    if (status.toLowerCase().includes('sementara')) return '#fb8c00';
    if (status.toLowerCase().includes('estimasi')) return '#1e88e5';
    return '#666';
  };

  const getAgeCategory = (groupId) => {
    if (groupId >= 1 && groupId <= 3) return { label: 'Anak', color: '#42A5F5' };
    if (groupId >= 4 && groupId <= 6) return { label: 'Remaja-Dewasa Muda', color: '#66BB6A' };
    if (groupId >= 7 && groupId <= 11) return { label: 'Dewasa', color: '#FFA726' };
    return { label: 'Lansia', color: '#EF5350' };
  };


  const category = getAgeCategory(selectedGroup);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Icon name="people" size={32} color="#00acc1" />
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
              {ageGroups.map((group, index) => (
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

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <Icon name="bar-chart" size={24} color="#fff" />
            <Text style={styles.summaryTitle}>Total Data</Text>
          </View>
          <Text style={styles.summaryValue}>{dataFiltered.length} Record</Text>
          {dataFiltered.length > 0 && (
            <Text style={styles.summarySubtitle}>
              Kelompok Umur: {title}
            </Text>
          )}
        </View>

        {dataFiltered.map((item, index) => {
          return (
            <AnimatedCard key={`${item.tahun}-${index}`} delay={index * 50}>
              <View style={styles.dataCard}>
                <View style={styles.cardHeader}>
                  <View style={styles.yearBadge}>
                    <Icon name="calendar" size={18} color="#00acc1" />
                    <Text style={styles.yearText}>{item?.tahun || '-'}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item?.status_data) + '20' }]}>
                    <View style={[styles.statusDot, { backgroundColor: getStatusColor(item?.status_data) }]} />
                    <Text style={[styles.statusText, { color: getStatusColor(item?.status_data) }]}>
                      {item?.status_data || 'N/A'}
                    </Text>
                  </View>
                </View>

                <View style={styles.cardBody}>
                  <View style={styles.populationContainer}>
                    <Icon name="people" size={32} color="#00acc1" />
                    <View style={styles.populationContent}>
                      <Text style={styles.populationValue}>
                        {formatNumber(item?.jumlah)}
                      </Text>
                      <Text style={styles.populationLabel}>Jiwa</Text>
                    </View>
                  </View>

                  <View style={styles.infoBox}>
                    <Icon name="information-circle" size={18} color="#00acc1" />
                    <Text style={styles.infoBoxText}>
                      Jumlah penduduk kelompok umur {title} pada tahun {item?.tahun || '-'}
                    </Text>
                  </View>
                </View>

                <View style={styles.cardFooter}>
                  <Icon name="information-circle-outline" size={16} color="#999" />
                  <Text style={styles.footerText}>Jumlah Penduduk (Jiwa)</Text>
                </View>
              </View>
            </AnimatedCard>
          )
        })}

        {dataFiltered.length === 0 && (
          <View style={styles.emptyState}>
            <Icon name="people-outline" size={80} color="#ccc" />
            <Text style={styles.emptyText}>Belum ada data untuk kelompok umur ini</Text>
          </View>
        )}

        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Icon name="information-circle" size={24} color="#00acc1" />
            <Text style={styles.infoTitle}>Tentang Data Kelompok Umur</Text>
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoText}>
              Data penduduk berdasarkan kelompok umur menunjukkan distribusi demografi 
              yang penting untuk perencanaan layanan pendidikan, kesehatan, dan sosial 
              sesuai dengan kebutuhan setiap kelompok usia. Data diurutkan dari tahun terbaru.
            </Text>
          </View>
        </View>

        {/* Age Category Info */}
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
      </ScrollView>
    </View>
  )
}

export default DetailPP

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
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E0F7FA',
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    gap: 10,
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
    marginHorizontal: 16,
    marginTop: 12,
    padding: 12,
    borderRadius: 12,
    gap: 10,
  },
  categoryCardText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 30,
  },
  summaryCard: {
    backgroundColor: '#00acc1',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  summaryTitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.95)',
    fontWeight: '600',
  },
  summaryValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  summarySubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
  },
  dataCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  yearBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0F7FA',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  yearText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00acc1',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  cardBody: {
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
    gap: 12,
  },
  populationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  populationContent: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  populationValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00acc1',
  },
  populationLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0F7FA',
    borderRadius: 8,
    padding: 12,
    gap: 10,
  },
  infoBoxText: {
    fontSize: 13,
    color: '#006064',
    flex: 1,
    fontWeight: '500',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 12,
  },
  footerText: {
    fontSize: 12,
    color: '#999',
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
    paddingLeft: 36,
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
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