import { StyleSheet, Text, View, ScrollView, Animated, TouchableOpacity } from 'react-native'
import React, { useRef, useEffect, useState } from 'react'
import { stateDataAngkaPartisipasiKasar } from '../../../state/dataAPK'
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

const DetailAPK = (props) => {
  const { dataAngkaPartisipasiKasar } = stateDataAngkaPartisipasiKasar()
  const [expanded, setExpanded] = useState(false);
  const [dataFiltered, setDataFiltered] = useState(dataAngkaPartisipasiKasar.filter(item => item.no === 1))
  const [selectedLevel, setSelectedLevel] = useState('SD')
  
  const getStatusColor = (status) => {
    if (status.toLowerCase().includes('tetap')) return '#43a047';
    if (status.toLowerCase().includes('sementara')) return '#fb8c00';
    if (status.toLowerCase().includes('estimasi')) return '#1e88e5';
    return '#666';
  };

  const getAPKCategory = (apk) => {
    const value = parseFloat(apk);
    if (value >= 100) return { label: 'Sangat Baik', color: '#43a047', icon: 'school' };
    if (value >= 90 && value < 100) return { label: 'Baik', color: '#1e88e5', icon: 'book' };
    if (value >= 75 && value < 90) return { label: 'Cukup', color: '#fb8c00', icon: 'bookmarks' };
    return { label: 'Rendah', color: '#e53935', icon: 'alert-circle' };
  };

  const getLevelColor = (level) => {
    if (level === 'SD') return '#4caf50';
    if (level === 'SMP') return '#2196f3';
    if (level === 'SMA') return '#ff9800';
    return '#666';
  };

  const handleFilterChange = (no, title) => {
    setDataFiltered(dataAngkaPartisipasiKasar.filter(item => item.no === no));
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
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Icon name="school" size={32} color="#5e35b1" />
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>{props?.route?.params?.title}</Text>
            <View style={styles.sourceContainer}>
              <Icon name="document-text-outline" size={16} color="#666" />
              <Text style={styles.sourceText}>Sumber: <Text style={styles.sourceBPS}>BPS</Text></Text>
            </View>
          </View>
        </View>
      </View>

      {/* Filter Accordion */}
      <View style={styles.filterContainer}>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setExpanded(!expanded)}
        >
          <View style={styles.filterButtonContent}>
            <Icon name="filter" size={20} color="#5e35b1" />
            <Text style={styles.filterButtonText}>
              Filter: <Text style={styles.filterButtonValue}>{selectedLevel}</Text>
            </Text>
          </View>
          <Icon 
            name={expanded ? "chevron-up" : "chevron-down"} 
            size={20} 
            color="#5e35b1" 
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

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Total Data {selectedLevel}</Text>
          <Text style={styles.summaryValue}>{dataFiltered?.length || 0} Tahun</Text>
        </View>

        {dataFiltered?.map((item, index) => {
          const category = getAPKCategory(item.apk);
          return (
            <AnimatedCard key={index} delay={index * 50}>
              <View style={styles.dataCard}>
                <View style={styles.cardHeader}>
                  <View style={[styles.levelBadge, { backgroundColor: getLevelColor(selectedLevel) + '20' }]}>
                    <Icon name="calendar" size={18} color={getLevelColor(selectedLevel)} />
                    <Text style={[styles.levelText, { color: getLevelColor(selectedLevel) }]}>
                      {item.tahun}
                    </Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status_data) + '20' }]}>
                    <View style={[styles.statusDot, { backgroundColor: getStatusColor(item.status_data) }]} />
                    <Text style={[styles.statusText, { color: getStatusColor(item.status_data) }]}>
                      {item.status_data}
                    </Text>
                  </View>
                </View>

                <View style={styles.cardBody}>
                  <View style={styles.apkContainer}>
                    <Icon name={category.icon} size={28} color={category.color} />
                    <View style={styles.apkContent}>
                      <Text style={[styles.apkValue, { color: category.color }]}>
                        {item.apk}
                      </Text>
                      <Text style={styles.apkLabel}>APK</Text>
                    </View>
                  </View>
                  
                  <View style={[styles.categoryBadge, { backgroundColor: category.color + '20' }]}>
                    <Icon name="ribbon" size={16} color={category.color} />
                    <Text style={[styles.categoryText, { color: category.color }]}>
                      {category.label}
                    </Text>
                  </View>

                  <View style={styles.interpretationBox}>
                    <Icon name="information-circle" size={18} color="#5e35b1" />
                    <Text style={styles.interpretationText}>
                      {parseFloat(item.apk) >= 100 
                        ? `Partisipasi ${selectedLevel} sangat tinggi, melebihi kapasitas`
                        : parseFloat(item.apk) >= 90
                        ? `Partisipasi ${selectedLevel} tinggi`
                        : `Partisipasi ${selectedLevel} perlu ditingkatkan`}
                    </Text>
                  </View>
                </View>

                <View style={styles.cardFooter}>
                  <Icon name="information-circle-outline" size={16} color="#999" />
                  <Text style={styles.footerText}>Angka Partisipasi Kasar {selectedLevel}</Text>
                </View>
              </View>
            </AnimatedCard>
          )
        })}

        {dataFiltered?.length === 0 && (
          <View style={styles.emptyState}>
            <Icon name="school-outline" size={80} color="#ccc" />
            <Text style={styles.emptyText}>Belum ada data tersedia</Text>
          </View>
        )}

        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Icon name="information-circle" size={24} color="#5e35b1" />
            <Text style={styles.infoTitle}>Tentang APK</Text>
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoText}>
              Angka Partisipasi Kasar (APK) menunjukkan persentase jumlah penduduk yang 
              bersekolah pada suatu jenjang pendidikan terhadap jumlah penduduk usia sekolah. 
              APK {">"} 100% menunjukkan adanya siswa di luar usia standar.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default DetailAPK

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
  filterContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
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
    color: '#5e35b1',
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
  scrollContent: {
    padding: 16,
    paddingBottom: 30,
  },
  summaryCard: {
    backgroundColor: '#5e35b1',
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
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  levelText: {
    fontSize: 16,
    fontWeight: 'bold',
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
  apkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  apkContent: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },
  apkValue: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  apkLabel: {
    fontSize: 16,
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
  interpretationBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDE7F6',
    borderRadius: 8,
    padding: 12,
    gap: 10,
  },
  interpretationText: {
    fontSize: 14,
    color: '#4527a0',
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
  },
  infoCard: {
    backgroundColor: '#EDE7F6',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#5e35b1',
    marginTop: 4,
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
})