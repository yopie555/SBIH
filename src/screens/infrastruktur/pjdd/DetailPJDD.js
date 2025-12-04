import { StyleSheet, Text, View, ScrollView, Animated } from 'react-native'
import React, { useRef, useEffect } from 'react'
import { stateDataPanjangJalanDibangun } from '../../../state/dataPJD'
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

const DetailPJDD = (props) => {
  const { dataPanjangJalanDibangun } = stateDataPanjangJalanDibangun()

  // Sort data dari tahun terbaru ke terlama
  const sortedData = dataPanjangJalanDibangun
    ?.sort((a, b) => {
      const yearA = parseInt(a.tahun) || 0;
      const yearB = parseInt(b.tahun) || 0;
      return yearB - yearA; // Descending order (terbaru ke terlama)
    }) || [];

  const getStatusColor = (status) => {
    if (!status) return '#666';
    if (status.toLowerCase().includes('tetap')) return '#43a047';
    if (status.toLowerCase().includes('sementara')) return '#fb8c00';
    if (status.toLowerCase().includes('estimasi')) return '#1e88e5';
    return '#666';
  };

  const getRoadCategory = (panjang) => {
    const value = parseFloat(panjang) || 0;
    if (value >= 10) return { label: 'Sangat Tinggi', color: '#43a047', icon: 'trending-up' };
    if (value >= 5 && value < 10) return { label: 'Tinggi', color: '#1e88e5', icon: 'arrow-up' };
    if (value >= 2 && value < 5) return { label: 'Sedang', color: '#fb8c00', icon: 'remove' };
    return { label: 'Rendah', color: '#e53935', icon: 'trending-down' };
  };

  const formatNumber = (num) => {
    if (!num) return '0';
    const numValue = parseFloat(num);
    if (Number.isInteger(numValue)) {
      return numValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    return numValue.toFixed(2).replace(/\./g, ',');
  };

  // Hitung total panjang jalan
  const totalPanjang = sortedData.reduce((sum, item) => sum + (parseFloat(item?.panjang) || 0), 0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Icon name="git-network" size={32} color="#00acc1" />
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
        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <Icon name="layers" size={24} color="#fff" />
            <Text style={styles.summaryTitle}>Total Pembangunan Jalan</Text>
          </View>
          <Text style={styles.summaryValue}>{formatNumber(totalPanjang)} Km</Text>
          <Text style={styles.summarySubtitle}>
            Periode {sortedData.length} Record
          </Text>
        </View>

        {sortedData.map((item, index) => {
          const category = getRoadCategory(item?.panjang);
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
                  <View style={styles.roadContainer}>
                    <Icon name={category.icon} size={32} color={category.color} />
                    <View style={styles.roadContent}>
                      <Text style={[styles.roadValue, { color: category.color }]}>
                        {formatNumber(item?.panjang)}
                      </Text>
                      <Text style={styles.roadLabel}>Kilometer</Text>
                    </View>
                  </View>
                  
                  <View style={[styles.categoryBadge, { backgroundColor: category.color + '20' }]}>
                    <Icon name="ribbon" size={16} color={category.color} />
                    <Text style={[styles.categoryText, { color: category.color }]}>
                      Pembangunan: {category.label}
                    </Text>
                  </View>

                  <View style={styles.interpretationBox}>
                    <Icon name="information-circle" size={18} color="#00acc1" />
                    <Text style={styles.interpretationText}>
                      {parseFloat(item?.panjang || 0) >= 10
                        ? 'Pembangunan jalan sangat tinggi, infrastruktur berkembang pesat'
                        : parseFloat(item?.panjang || 0) >= 5
                        ? 'Pembangunan jalan tinggi, perkembangan infrastruktur baik'
                        : parseFloat(item?.panjang || 0) >= 2
                        ? 'Pembangunan jalan sedang, peningkatan infrastruktur moderat'
                        : 'Pembangunan jalan rendah, perlu percepatan pembangunan'}
                    </Text>
                  </View>
                </View>

                <View style={styles.cardFooter}>
                  <Icon name="information-circle-outline" size={16} color="#999" />
                  <Text style={styles.footerText}>Panjang Jalan Dibangun (Km)</Text>
                </View>
              </View>
            </AnimatedCard>
          )
        })}

        {sortedData.length === 0 && (
          <View style={styles.emptyState}>
            <Icon name="git-network-outline" size={80} color="#ccc" />
            <Text style={styles.emptyText}>Belum ada data tersedia</Text>
          </View>
        )}

        {/* Statistics Card */}
        {sortedData.length > 0 && (
          <View style={styles.statsCard}>
            <View style={styles.statsHeader}>
              <Icon name="analytics" size={24} color="#00acc1" />
              <Text style={styles.statsTitle}>Statistik Pembangunan</Text>
            </View>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Icon name="trending-up" size={20} color="#43a047" />
                <Text style={styles.statLabel}>Tertinggi</Text>
                <Text style={[styles.statValue, { color: '#43a047' }]}>
                  {formatNumber(Math.max(...sortedData.map(d => parseFloat(d?.panjang || 0))))} Km
                </Text>
              </View>
              <View style={styles.statItem}>
                <Icon name="trending-down" size={20} color="#e53935" />
                <Text style={styles.statLabel}>Terendah</Text>
                <Text style={[styles.statValue, { color: '#e53935' }]}>
                  {formatNumber(Math.min(...sortedData.map(d => parseFloat(d?.panjang || 0))))} Km
                </Text>
              </View>
              <View style={styles.statItem}>
                <Icon name="calculator" size={20} color="#1e88e5" />
                <Text style={styles.statLabel}>Rata-rata</Text>
                <Text style={[styles.statValue, { color: '#1e88e5' }]}>
                  {formatNumber((sortedData.reduce((sum, d) => sum + (parseFloat(d?.panjang || 0)), 0) / sortedData.length))} Km
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Icon name="information-circle" size={24} color="#00acc1" />
            <Text style={styles.infoTitle}>Tentang Pembangunan Jalan</Text>
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoText}>
              Panjang jalan yang dibangun menunjukkan upaya pemerintah dalam meningkatkan 
              infrastruktur transportasi. Data ini mencerminkan komitmen pembangunan dan 
              perkembangan konektivitas antar wilayah.
            </Text>
          </View>
        </View>

        {/* Category Legend */}
        <View style={styles.legendCard}>
          <Text style={styles.legendTitle}>Kategori Pembangunan:</Text>
          <View style={styles.legendContent}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#43a047' }]} />
              <Text style={styles.legendText}>Sangat Tinggi (≥10 Km)</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#1e88e5' }]} />
              <Text style={styles.legendText}>Tinggi (5 - 9,99 Km)</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#fb8c00' }]} />
              <Text style={styles.legendText}>Sedang (2 - 4,99 Km)</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#e53935' }]} />
              <Text style={styles.legendText}>Rendah (&lt;2 Km)</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default DetailPJDD

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
  roadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  roadContent: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  roadValue: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  roadLabel: {
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
  interpretationBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0F7FA',
    borderRadius: 8,
    padding: 12,
    gap: 10,
  },
  interpretationText: {
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
  },
  statsCard: {
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
  statsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 12,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 6,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
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