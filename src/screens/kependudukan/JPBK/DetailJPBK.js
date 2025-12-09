import { StyleSheet, Text, View, ScrollView, Animated, TouchableOpacity, Modal, FlatList } from 'react-native'
import React, { useRef, useEffect, useState } from 'react'
import { stateDataJumlahPendudukBerdasarkanKecamatan } from '../../../state/dataJBPK'
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
  const { dataJumlahPendudukBerdasarkanKecamatan } = stateDataJumlahPendudukBerdasarkanKecamatan()
  const [selectedYear, setSelectedYear] = useState('Semua Tahun');
  const [modalVisible, setModalVisible] = useState(false);

  // Ekstrak tahun unik dari data
  const uniqueYears = [...new Set(dataJumlahPendudukBerdasarkanKecamatan?.map(item => item.tahun) || [])]
    .sort((a, b) => parseInt(b) - parseInt(a)); // Urut dari terbaru ke terlama

  // Kelompokkan data berdasarkan tahun
  const groupDataByYear = (data) => {
    const grouped = {};
    data?.forEach(item => {
      if (!grouped[item.tahun]) {
        grouped[item.tahun] = [];
      }
      grouped[item.tahun].push(item);
    });
    return grouped;
  };

  const groupedData = groupDataByYear(dataJumlahPendudukBerdasarkanKecamatan);

  // Filter data berdasarkan tahun yang dipilih
  const getFilteredData = () => {
    if (selectedYear === 'Semua Tahun') {
      return dataJumlahPendudukBerdasarkanKecamatan || [];
    }
    return groupedData[selectedYear] || [];
  };

  const filteredData = getFilteredData();

  // Sort data dari total penduduk tertinggi ke terendah
  const sortedData = filteredData
    ?.sort((a, b) => {
      const totalA = (parseInt(a.laki) || 0) + (parseInt(a.perempuan) || 0);
      const totalB = (parseInt(b.laki) || 0) + (parseInt(b.perempuan) || 0);
      return totalB - totalA; // Descending order (tertinggi ke terendah)
    }) || [];

  const getStatusColor = (status) => {
    if (!status) return '#666';
    if (status.toLowerCase().includes('tetap')) return '#43a047';
    if (status.toLowerCase().includes('sementara')) return '#fb8c00';
    if (status.toLowerCase().includes('estimasi')) return '#1e88e5';
    return '#666';
  };

  const getPopulationCategory = (total) => {
    const value = parseInt(total) || 0;
    if (value >= 15000) return { label: 'Sangat Padat', color: '#e53935', icon: 'people' };
    if (value >= 10000 && value < 15000) return { label: 'Padat', color: '#fb8c00', icon: 'people-circle' };
    if (value >= 5000 && value < 10000) return { label: 'Sedang', color: '#1e88e5', icon: 'person' };
    return { label: 'Rendah', color: '#43a047', icon: 'body' };
  };


  const calculateGenderRatio = (laki, perempuan) => {
    const lakiNum = parseInt(laki) || 0;
    const perempuanNum = parseInt(perempuan) || 0;
    if (perempuanNum === 0) return '0.0';
    const ratio = (lakiNum / perempuanNum * 100).toFixed(1);
    return ratio;
  };

  // Hitung total keseluruhan
  const totalLaki = sortedData.reduce((sum, item) => sum + (parseInt(item?.laki) || 0), 0);
  const totalPerempuan = sortedData.reduce((sum, item) => sum + (parseInt(item?.perempuan) || 0), 0);
  const totalPenduduk = totalLaki + totalPerempuan;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Icon name="map" size={32} color="#00acc1" />
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
        {/* Year Dropdown */}
        <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownLabel}>Pilih Tahun:</Text>
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={() => setModalVisible(true)}
          >
            <View style={styles.dropdownContent}>
              <Icon name="calendar" size={20} color="#00acc1" />
              <Text style={styles.dropdownText}>
                {selectedYear === 'Semua Tahun' ? 'Semua Tahun' : selectedYear}
              </Text>
              <Icon name="chevron-down" size={20} color="#666" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Year Selection Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Pilih Tahun</Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Icon name="close" size={24} color="#666" />
                </TouchableOpacity>
              </View>

              <FlatList
                data={['Semua Tahun', ...uniqueYears]}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.yearItem}
                    onPress={() => {
                      setSelectedYear(item);
                      setModalVisible(false);
                    }}
                  >
                    <View style={styles.yearItemContent}>
                      <Icon name="calendar-outline" size={20} color="#00acc1" />
                      <Text style={styles.yearItemText}>{item}</Text>
                      {selectedYear === item && (
                        <Icon name="checkmark" size={20} color="#00acc1" />
                      )}
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>

        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <Icon name="stats-chart" size={24} color="#fff" />
            <Text style={styles.summaryTitle}>Total Penduduk</Text>
          </View>
          <Text style={styles.summaryValue}>{formatNumber(totalPenduduk)} Jiwa</Text>
          <View style={styles.summaryDetail}>
            <View style={styles.summaryItem}>
              <Icon name="male" size={20} color="rgba(255,255,255,0.9)" />
              <Text style={styles.summaryItemText}>{formatNumber(totalLaki)} Laki-laki</Text>
            </View>
            <View style={styles.summaryItem}>
              <Icon name="female" size={20} color="rgba(255,255,255,0.9)" />
              <Text style={styles.summaryItemText}>{formatNumber(totalPerempuan)} Perempuan</Text>
            </View>
          </View>
          <Text style={styles.summarySubtitle}>
            {selectedYear === 'Semua Tahun' ? `${Object.keys(groupedData).length} Record` : '1 Tahun'} • {sortedData.length} Kecamatan
          </Text>
        </View>

        {sortedData.map((item, index) => {
          const total = (parseInt(item?.laki) || 0) + (parseInt(item?.perempuan) || 0);
          const category = getPopulationCategory(total);
          const genderRatio = calculateGenderRatio(item?.laki, item?.perempuan);
          const percentageMale = total > 0 ? (((parseInt(item?.laki) || 0) / total) * 100).toFixed(1) : '0.0';
          const percentageFemale = total > 0 ? (((parseInt(item?.perempuan) || 0) / total) * 100).toFixed(1) : '0.0';

          return (
            <AnimatedCard key={`${item.kecamatan}-${index}`} delay={index * 50}>
              <View style={styles.dataCard}>
                <View style={styles.cardHeader}>
                  <View style={styles.districtBadge}>
                    <Icon name="location" size={18} color="#00acc1" />
                    <Text style={styles.districtText}>{item?.kecamatan || 'N/A'}</Text>
                  </View>
                  <View style={styles.cardHeaderRight}>
                    <View style={styles.yearBadge}>
                      <Icon name="calendar" size={14} color="#00acc1" />
                      <Text style={styles.yearText}>{item?.tahun || 'N/A'}</Text>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item?.status_data) + '20' }]}>
                      <View style={[styles.statusDot, { backgroundColor: getStatusColor(item?.status_data) }]} />
                      <Text style={[styles.statusText, { color: getStatusColor(item?.status_data) }]}>
                        {item?.status_data || 'N/A'}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.cardBody}>
                  <View style={styles.totalContainer}>
                    <Icon name={category.icon} size={32} color={category.color} />
                    <View style={styles.totalContent}>
                      <Text style={[styles.totalValue, { color: category.color }]}>
                        {formatNumber(total)}
                      </Text>
                      <Text style={styles.totalLabel}>Total Jiwa</Text>
                    </View>
                  </View>
                  
                  <View style={[styles.categoryBadge, { backgroundColor: category.color + '20' }]}>
                    <Icon name="analytics" size={16} color={category.color} />
                    <Text style={[styles.categoryText, { color: category.color }]}>
                      Kepadatan: {category.label}
                    </Text>
                  </View>

                  {/* Gender Distribution */}
                  <View style={styles.genderContainer}>
                    <View style={styles.genderItem}>
                      <Icon name="male" size={20} color="#1e88e5" />
                      <View style={styles.genderContent}>
                        <Text style={styles.genderValue}>{formatNumber(item?.laki)}</Text>
                        <Text style={styles.genderLabel}>Laki-laki ({percentageMale}%)</Text>
                      </View>
                    </View>
                    <View style={styles.genderDivider} />
                    <View style={styles.genderItem}>
                      <Icon name="female" size={20} color="#e91e63" />
                      <View style={styles.genderContent}>
                        <Text style={styles.genderValue}>{formatNumber(item?.perempuan)}</Text>
                        <Text style={styles.genderLabel}>Perempuan ({percentageFemale}%)</Text>
                      </View>
                    </View>
                  </View>

                  {/* Gender Ratio */}
                  <View style={styles.ratioBox}>
                    <Icon name="git-compare" size={18} color="#00acc1" />
                    <Text style={styles.ratioText}>
                      Rasio Jenis Kelamin: <Text style={styles.ratioBold}>{genderRatio}</Text> (L per 100 P)
                    </Text>
                  </View>
                </View>

                <View style={styles.cardFooter}>
                  <Icon name="information-circle-outline" size={16} color="#999" />
                  <Text style={styles.footerText}>Data Kependudukan Kecamatan</Text>
                </View>
              </View>
            </AnimatedCard>
          )
        })}

        {sortedData.length === 0 && (
          <View style={styles.emptyState}>
            <Icon name="map-outline" size={80} color="#ccc" />
            <Text style={styles.emptyText}>Belum ada data tersedia</Text>
          </View>
        )}

        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Icon name="information-circle" size={24} color="#00acc1" />
            <Text style={styles.infoTitle}>Tentang Data Kecamatan</Text>
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoText}>
              Data penduduk berdasarkan kecamatan menunjukkan distribusi populasi di setiap 
              wilayah kecamatan, termasuk komposisi jenis kelamin. Informasi ini penting untuk 
              perencanaan pembangunan dan pemerataan layanan publik. Data diurutkan dari 
              kecamatan dengan jumlah penduduk terbanyak.
            </Text>
          </View>
        </View>

        {/* Category Legend */}
        <View style={styles.legendCard}>
          <Text style={styles.legendTitle}>Kategori Kepadatan Penduduk:</Text>
          <View style={styles.legendContent}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#e53935' }]} />
              <Text style={styles.legendText}>Sangat Padat (≥15.000 jiwa)</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#fb8c00' }]} />
              <Text style={styles.legendText}>Padat (10.000 - 14.999 jiwa)</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#1e88e5' }]} />
              <Text style={styles.legendText}>Sedang (5.000 - 9.999 jiwa)</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#43a047' }]} />
              <Text style={styles.legendText}>Rendah (&lt;5.000 jiwa)</Text>
            </View>
          </View>
        </View>

        {/* Gender Ratio Info */}
        <View style={styles.contextCard}>
          <View style={styles.contextHeader}>
            <Icon name="information" size={24} color="#1e88e5" />
            <Text style={styles.contextTitle}>Rasio Jenis Kelamin</Text>
          </View>
          <View style={styles.contextContent}>
            <Text style={styles.contextText}>
              Rasio jenis kelamin menunjukkan jumlah laki-laki per 100 perempuan. 
              Rasio 100 berarti jumlah laki-laki dan perempuan seimbang. Rasio &gt;100 berarti 
              jumlah laki-laki lebih banyak, dan &lt;100 berarti perempuan lebih banyak.
            </Text>
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
    marginBottom: 12,
  },
  summaryDetail: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 8,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  summaryItemText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '500',
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
  districtBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0F7FA',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
    flex: 1,
    marginRight: 8,
  },
  districtText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00acc1',
    flex: 1,
  },
  cardHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  yearBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  yearText: {
    fontSize: 12,
    fontWeight: '600',
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
    fontSize: 11,
    fontWeight: '600',
  },
  cardBody: {
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
    gap: 12,
  },
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  totalContent: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  totalValue: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  totalLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
    alignSelf: 'flex-start',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
  },
  genderContainer: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 12,
    gap: 16,
  },
  genderItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  genderContent: {
    flex: 1,
  },
  genderValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  genderLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  genderDivider: {
    width: 1,
    backgroundColor: '#e0e0e0',
  },
  ratioBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0F7FA',
    borderRadius: 8,
    padding: 12,
    gap: 10,
  },
  ratioText: {
    fontSize: 13,
    color: '#006064',
    flex: 1,
  },
  ratioBold: {
    fontWeight: 'bold',
    color: '#00acc1',
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
    marginBottom: 16,
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
  contextCard: {
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#1e88e5',
  },
  contextHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  contextTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  contextContent: {
    paddingLeft: 36,
  },
  contextText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  // Dropdown styles
  dropdownContainer: {
    marginBottom: 16,
  },
  dropdownLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  dropdownButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  dropdownContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
    fontWeight: '500',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 4,
  },
  yearItem: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  yearItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  yearItemText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
})