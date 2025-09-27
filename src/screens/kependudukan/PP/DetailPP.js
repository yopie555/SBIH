import { StyleSheet, Text, View, ScrollView, Animated } from 'react-native'
import React, { useRef, useEffect } from 'react'
import { stateDataPertumbuhanPenduduk } from '../../../state/dataPP'
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

const DetailPP = (props) => {
  const { dataPertumbuhanPenduduk } = stateDataPertumbuhanPenduduk()

  const getStatusColor = (status) => {
    if (status.toLowerCase().includes('tetap')) return '#43a047';
    if (status.toLowerCase().includes('sementara')) return '#fb8c00';
    if (status.toLowerCase().includes('estimasi')) return '#1e88e5';
    return '#666';
  };

  const getGrowthCategory = (laju) => {
    const value = parseFloat(laju);
    if (value >= 3.0) return { label: 'Sangat Tinggi', color: '#e53935', icon: 'trending-up' };
    if (value >= 2.0 && value < 3.0) return { label: 'Tinggi', color: '#fb8c00', icon: 'arrow-up' };
    if (value >= 1.0 && value < 2.0) return { label: 'Sedang', color: '#1e88e5', icon: 'remove' };
    if (value >= 0 && value < 1.0) return { label: 'Rendah', color: '#43a047', icon: 'trending-down' };
    return { label: 'Negatif', color: '#757575', icon: 'arrow-down' };
  };

  const formatPercentage = (num) => {
    const numValue = parseFloat(num);
    return numValue.toFixed(2);
  };

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

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <Icon name="analytics" size={24} color="#fff" />
            <Text style={styles.summaryTitle}>Total Data Tersedia</Text>
          </View>
          <Text style={styles.summaryValue}>{dataPertumbuhanPenduduk?.length || 0} Tahun</Text>
          {dataPertumbuhanPenduduk?.length > 0 && (
            <Text style={styles.summarySubtitle}>
              Periode: {dataPertumbuhanPenduduk[0]?.tahun} - {dataPertumbuhanPenduduk[dataPertumbuhanPenduduk.length - 1]?.tahun}
            </Text>
          )}
        </View>

        {dataPertumbuhanPenduduk?.map((item, index) => {
          const category = getGrowthCategory(item.laju);
          return (
            <AnimatedCard key={index} delay={index * 50}>
              <View style={styles.dataCard}>
                <View style={styles.cardHeader}>
                  <View style={styles.yearBadge}>
                    <Icon name="calendar" size={18} color="#00acc1" />
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
                  <View style={styles.growthContainer}>
                    <Icon name={category.icon} size={32} color={category.color} />
                    <View style={styles.growthContent}>
                      <Text style={[styles.growthValue, { color: category.color }]}>
                        {formatPercentage(item.laju)}%
                      </Text>
                      <Text style={styles.growthLabel}>Laju Pertumbuhan</Text>
                    </View>
                  </View>
                  
                  <View style={[styles.categoryBadge, { backgroundColor: category.color + '20' }]}>
                    <Icon name="ribbon" size={16} color={category.color} />
                    <Text style={[styles.categoryText, { color: category.color }]}>
                      Pertumbuhan: {category.label}
                    </Text>
                  </View>

                  {/* Interpretation */}
                  <View style={styles.interpretationBox}>
                    <Icon name="information-circle" size={18} color="#00acc1" />
                    <Text style={styles.interpretationText}>
                      {parseFloat(item.laju) >= 3.0
                        ? 'Pertumbuhan sangat tinggi, perlu perhatian khusus pada infrastruktur'
                        : parseFloat(item.laju) >= 2.0
                        ? 'Pertumbuhan tinggi, perluas layanan publik'
                        : parseFloat(item.laju) >= 1.0
                        ? 'Pertumbuhan sedang, pembangunan berkelanjutan'
                        : parseFloat(item.laju) >= 0
                        ? 'Pertumbuhan rendah, stabil dan terkendali'
                        : 'Pertumbuhan negatif, ada penurunan penduduk'}
                    </Text>
                  </View>
                </View>

                <View style={styles.cardFooter}>
                  <Icon name="information-circle-outline" size={16} color="#999" />
                  <Text style={styles.footerText}>Laju Pertumbuhan Penduduk (Persen per Tahun)</Text>
                </View>
              </View>
            </AnimatedCard>
          )
        })}

        {(!dataPertumbuhanPenduduk || dataPertumbuhanPenduduk?.length === 0) && (
          <View style={styles.emptyState}>
            <Icon name="people-outline" size={80} color="#ccc" />
            <Text style={styles.emptyText}>Belum ada data tersedia</Text>
          </View>
        )}

        {/* Statistics Card */}
        {dataPertumbuhanPenduduk?.length > 0 && (
          <View style={styles.statsCard}>
            <View style={styles.statsHeader}>
              <Icon name="stats-chart" size={24} color="#00acc1" />
              <Text style={styles.statsTitle}>Statistik Pertumbuhan</Text>
            </View>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Icon name="trending-up" size={20} color="#e53935" />
                <Text style={styles.statLabel}>Tertinggi</Text>
                <Text style={[styles.statValue, { color: '#e53935' }]}>
                  {formatPercentage(Math.max(...dataPertumbuhanPenduduk.map(d => parseFloat(d.laju))))}%
                </Text>
              </View>
              <View style={styles.statItem}>
                <Icon name="trending-down" size={20} color="#43a047" />
                <Text style={styles.statLabel}>Terendah</Text>
                <Text style={[styles.statValue, { color: '#43a047' }]}>
                  {formatPercentage(Math.min(...dataPertumbuhanPenduduk.map(d => parseFloat(d.laju))))}%
                </Text>
              </View>
              <View style={styles.statItem}>
                <Icon name="calculator" size={20} color="#1e88e5" />
                <Text style={styles.statLabel}>Rata-rata</Text>
                <Text style={[styles.statValue, { color: '#1e88e5' }]}>
                  {formatPercentage((dataPertumbuhanPenduduk.reduce((sum, d) => sum + parseFloat(d.laju), 0) / dataPertumbuhanPenduduk.length))}%
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Icon name="information-circle" size={24} color="#00acc1" />
            <Text style={styles.infoTitle}>Tentang Pertumbuhan Penduduk</Text>
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoText}>
              Laju Pertumbuhan Penduduk adalah angka yang menunjukkan tingkat pertambahan penduduk 
              per tahun dalam suatu wilayah. Data ini penting untuk perencanaan pembangunan, 
              penyediaan infrastruktur, dan layanan publik.
            </Text>
          </View>
        </View>

        {/* Category Legend */}
        <View style={styles.legendCard}>
          <Text style={styles.legendTitle}>Kategori Pertumbuhan:</Text>
          <View style={styles.legendContent}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#e53935' }]} />
              <Text style={styles.legendText}>Sangat Tinggi (≥3,0%)</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#fb8c00' }]} />
              <Text style={styles.legendText}>Tinggi (2,0% - 2,9%)</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#1e88e5' }]} />
              <Text style={styles.legendText}>Sedang (1,0% - 1,9%)</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#43a047' }]} />
              <Text style={styles.legendText}>Rendah (0% - 0,9%)</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#757575' }]} />
              <Text style={styles.legendText}>Negatif (&lt;0%)</Text>
            </View>
          </View>
        </View>

        {/* Status Legend */}
        <View style={styles.legendCard}>
          <Text style={styles.legendTitle}>Status Data:</Text>
          <View style={styles.legendContent}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#43a047' }]} />
              <Text style={styles.legendText}>Data Tetap - Data sudah final</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#fb8c00' }]} />
              <Text style={styles.legendText}>Data Sementara - Data masih dapat berubah</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#1e88e5' }]} />
              <Text style={styles.legendText}>Data Estimasi - Data perkiraan</Text>
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
  growthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  growthContent: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  growthValue: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  growthLabel: {
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
    fontSize: 16,
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
})