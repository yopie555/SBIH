import { StyleSheet, Text, View, ScrollView, Animated, TouchableOpacity, Modal, FlatList } from 'react-native'
import React, { useRef, useEffect, useState } from 'react'
import { stateDataPerkembanganKondisiKetenagakerjaan } from '../../../state/dataPKK'
import { color } from '../../../constants/Helper'
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

const DetailPKK = (props) => {
  const {dataPerkembanganKondisiKetenagakerjaan} = stateDataPerkembanganKondisiKetenagakerjaan()
  const [selectedCategory, setSelectedCategory] = useState('Semua Kategori');
  const [modalVisible, setModalVisible] = useState(false);

  const getStatusColor = (status) => {
    if (status.toLowerCase().includes('tetap')) return '#43a047';
    if (status.toLowerCase().includes('sementara')) return '#fb8c00';
    return '#666';
  };

  const getPengangguranCategory = (tingkat) => {
    const value = parseFloat(tingkat);
    if (value < 3) return { label: 'Sangat Rendah', color: '#43a047' };
    if (value >= 3 && value < 5) return { label: 'Rendah', color: '#1e88e5' };
    if (value >= 5 && value < 7) return { label: 'Sedang', color: '#fb8c00' };
    return { label: 'Tinggi', color: '#e53935' };
  };

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Kategori data yang tersedia
  const categories = [
    { id: 'Semua Kategori', label: 'Semua Kategori', icon: 'grid' },
    { id: 'penduduk_usia_kerja', label: 'Penduduk Usia Kerja', icon: 'people', unit: 'orang' },
    { id: 'angkatan_kerja', label: 'Angkatan Kerja', icon: 'people-circle', unit: 'orang' },
    { id: 'bekerja', label: 'Bekerja', icon: 'checkmark-circle', unit: 'orang' },
    { id: 'mencari_pekerjaan', label: 'Mencari Pekerjaan', icon: 'search', unit: 'orang' },
    { id: 'tingkat_partisipasi', label: 'TPAK (Tingkat Partisipasi Angkatan Kerja)', icon: 'trending-up', unit: '%' },
    { id: 'tingkat_pengangguran', label: 'TPT (Tingkat Pengangguran Terbuka)', icon: 'analytics', unit: '%' }
  ];

  // Filter data berdasarkan kategori yang dipilih
  const getFilteredData = () => {
    if (selectedCategory === 'Semua Kategori') {
      return dataPerkembanganKondisiKetenagakerjaan || [];
    }

    const categoryField = categories.find(cat => cat.id === selectedCategory);
    if (!categoryField) return [];

    return (dataPerkembanganKondisiKetenagakerjaan || []).map(item => ({
      tahun: item.tahun,
      status_data: item.status_data,
      value: item[categoryField.id] || 0,
      category: categoryField
    }));
  };

  const filteredData = getFilteredData();
  const sortedData = [...filteredData].sort((a, b) => {
    return parseInt(b.tahun) - parseInt(a.tahun);
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Icon name="briefcase" size={32} color="#00897b" />
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
        {/* Category Dropdown */}
        <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownLabel}>Pilih Kategori:</Text>
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={() => setModalVisible(true)}
          >
            <View style={styles.dropdownContent}>
              <Icon
                name={categories.find(cat => cat.id === selectedCategory)?.icon || 'grid'}
                size={20}
                color="#00897b"
              />
              <Text style={styles.dropdownText}>
                {categories.find(cat => cat.id === selectedCategory)?.label || 'Pilih Kategori'}
              </Text>
              <Icon name="chevron-down" size={20} color="#666" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Category Selection Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Pilih Kategori</Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Icon name="close" size={24} color="#666" />
                </TouchableOpacity>
              </View>

              <FlatList
                data={categories}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.categoryItem}
                    onPress={() => {
                      setSelectedCategory(item.id);
                      setModalVisible(false);
                    }}
                  >
                    <View style={styles.categoryItemContent}>
                      <Icon name={item.icon} size={20} color="#00897b" />
                      <Text style={styles.categoryItemText}>{item.label}</Text>
                      {selectedCategory === item.id && (
                        <Icon name="checkmark" size={20} color="#00897b" />
                      )}
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Total Data Tersedia</Text>
          <Text style={styles.summaryValue}>{sortedData.length || 0} Tahun</Text>
        </View>

        {selectedCategory === 'Semua Kategori' ? (
          // Tampilkan semua data untuk kategori "Semua Kategori"
          sortedData.map((item, index) => {
            const tptCategory = getPengangguranCategory(item.tingkat_pengangguran);
            return (
              <AnimatedCard key={index} delay={index * 50}>
                <View style={styles.dataCard}>
                  <View style={styles.cardHeader}>
                    <View style={styles.yearBadge}>
                      <Icon name="calendar" size={18} color="#00897b" />
                      <Text style={styles.yearText}>{item.tahun}</Text>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status_data) + '20' }]}>
                      <View style={[styles.statusDot, { backgroundColor: getStatusColor(item.status_data) }]} />
                      <Text style={[styles.statusText, { color: getStatusColor(item.status_data) }]}>
                        {item.status_data}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.cardBody}>
                    {/* Main Statistics */}
                    <View style={styles.mainStats}>
                      <View style={styles.statItem}>
                        <Icon name="people" size={20} color="#00897b" />
                        <View style={styles.statContent}>
                          <Text style={styles.statLabel}>Penduduk Usia Kerja</Text>
                          <Text style={styles.statValue}>{formatNumber(item.penduduk_usia_kerja)}</Text>
                        </View>
                      </View>

                      <View style={styles.statItem}>
                        <Icon name="people-circle" size={20} color="#1e88e5" />
                        <View style={styles.statContent}>
                          <Text style={styles.statLabel}>Angkatan Kerja</Text>
                          <Text style={styles.statValue}>{formatNumber(item.angkatan_kerja)}</Text>
                        </View>
                      </View>

                      <View style={styles.statItem}>
                        <Icon name="checkmark-circle" size={20} color="#43a047" />
                        <View style={styles.statContent}>
                          <Text style={styles.statLabel}>Bekerja</Text>
                          <Text style={styles.statValue}>{formatNumber(item.bekerja)}</Text>
                        </View>
                      </View>

                      <View style={styles.statItem}>
                        <Icon name="search" size={20} color="#fb8c00" />
                        <View style={styles.statContent}>
                          <Text style={styles.statLabel}>Mencari Pekerjaan</Text>
                          <Text style={styles.statValue}>{formatNumber(item.mencari_pekerjaan)}</Text>
                        </View>
                      </View>
                    </View>

                    {/* Percentage Stats */}
                    <View style={styles.percentageStats}>
                      <View style={styles.percentageItem}>
                        <View style={styles.percentageHeader}>
                          <Icon name="trending-up" size={18} color="#1e88e5" />
                          <Text style={styles.percentageLabel}>TPAK</Text>
                        </View>
                        <Text style={[styles.percentageValue, { color: '#1e88e5' }]}>
                          {item.tingkat_partisipasi}%
                        </Text>
                      </View>

                      <View style={styles.percentageDivider} />

                      <View style={styles.percentageItem}>
                        <View style={styles.percentageHeader}>
                          <Icon name="analytics" size={18} color={tptCategory.color} />
                          <Text style={styles.percentageLabel}>TPT</Text>
                        </View>
                        <Text style={[styles.percentageValue, { color: tptCategory.color }]}>
                          {item.tingkat_pengangguran}%
                        </Text>
                        <View style={[styles.categoryMini, { backgroundColor: tptCategory.color + '20' }]}>
                          <Text style={[styles.categoryMiniText, { color: tptCategory.color }]}>
                            {tptCategory.label}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  <View style={styles.cardFooter}>
                    <Icon name="information-circle-outline" size={16} color="#999" />
                    <Text style={styles.footerText}>Data Ketenagakerjaan Tahunan</Text>
                  </View>
                </View>
              </AnimatedCard>
            )
          })
        ) : (
          // Tampilkan data berdasarkan kategori yang dipilih
          sortedData.map((item, index) => (
            <AnimatedCard key={index} delay={index * 50}>
              <View style={styles.dataCard}>
                <View style={styles.cardHeader}>
                  <View style={styles.yearBadge}>
                    <Icon name="calendar" size={18} color="#00897b" />
                    <Text style={styles.yearText}>{item.tahun}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status_data) + '20' }]}>
                    <View style={[styles.statusDot, { backgroundColor: getStatusColor(item.status_data) }]} />
                    <Text style={[styles.statusText, { color: getStatusColor(item.status_data) }]}>
                      {item.status_data}
                    </Text>
                  </View>
                </View>

                <View style={styles.cardBody}>
                  <View style={styles.singleStatContainer}>
                    <View style={styles.singleStatItem}>
                      <Icon
                        name={item.category.icon}
                        size={32}
                        color="#00897b"
                      />
                      <View style={styles.singleStatContent}>
                        <Text style={styles.singleStatLabel}>{item.category.label}</Text>
                        <Text style={styles.singleStatValue}>
                          {item.category.unit === '%' ? `${item.value}%` : formatNumber(item.value)}
                        </Text>
                        <Text style={styles.singleStatUnit}>{item.category.unit}</Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.cardFooter}>
                  <Icon name="information-circle-outline" size={16} color="#999" />
                  <Text style={styles.footerText}>Data Ketenagakerjaan Tahunan</Text>
                </View>
              </View>
            </AnimatedCard>
          ))
        )}

        {dataPerkembanganKondisiKetenagakerjaan?.length === 0 && (
          <View style={styles.emptyState}>
            <Icon name="briefcase-outline" size={80} color="#ccc" />
            <Text style={styles.emptyText}>Belum ada data tersedia</Text>
          </View>
        )}

        {/* Legend */}
        <View style={styles.legendCard}>
          <Text style={styles.legendTitle}>Keterangan:</Text>
          <View style={styles.legendContent}>
            <View style={styles.legendItem}>
              <Text style={styles.legendBullet}>•</Text>
              <Text style={styles.legendText}>TPAK = Tingkat Partisipasi Angkatan Kerja</Text>
            </View>
            <View style={styles.legendItem}>
              <Text style={styles.legendBullet}>•</Text>
              <Text style={styles.legendText}>TPT = Tingkat Pengangguran Terbuka</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default DetailPKK

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
    backgroundColor: '#00897b',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  summaryTitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
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
    backgroundColor: '#E0F2F1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  yearText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00897b',
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
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
    paddingVertical: 16,
    gap: 16,
  },
  mainStats: {
    gap: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statContent: {
    flex: 1,
  },
  statLabel: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  percentageStats: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    gap: 16,
  },
  percentageItem: {
    flex: 1,
    alignItems: 'center',
  },
  percentageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  percentageLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  percentageValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  percentageDivider: {
    width: 1,
    backgroundColor: '#e0e0e0',
  },
  categoryMini: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  categoryMiniText: {
    fontSize: 10,
    fontWeight: '600',
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
  legendCard: {
    backgroundColor: '#E0F2F1',
    borderRadius: 12,
    padding: 16,
    marginTop: 4,
  },
  legendTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  legendContent: {
    gap: 8,
  },
  legendItem: {
    flexDirection: 'row',
    gap: 8,
  },
  legendBullet: {
    fontSize: 16,
    color: '#00897b',
    fontWeight: 'bold',
  },
  legendText: {
    fontSize: 13,
    color: '#555',
    flex: 1,
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
  categoryItem: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  categoryItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  categoryItemText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  // Single category display styles
  singleStatContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  singleStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  singleStatContent: {
    flex: 1,
    alignItems: 'center',
  },
  singleStatLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  singleStatValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00897b',
    marginBottom: 4,
  },
  singleStatUnit: {
    fontSize: 14,
    color: '#999',
  },
})