import { StyleSheet, Text, View, ScrollView, Animated } from 'react-native'
import React, { useRef, useEffect } from 'react'
import { stateDataPersentaseTingkatKemantapanJalan } from '../../../state/dataPTKJ'
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

const DetailPTKJ = (props) => {
  const { dataPersentaseTingkatKemantapanJalan } = stateDataPersentaseTingkatKemantapanJalan()

  const getStatusColor = (status) => {
    if (status.toLowerCase().includes('tetap')) return '#43a047';
    if (status.toLowerCase().includes('sementara')) return '#fb8c00';
    if (status.toLowerCase().includes('estimasi')) return '#1e88e5';
    return '#666';
  };

  const getRoadConditionCategory = (kemantapan) => {
    const value = parseFloat(kemantapan);
    if (value >= 80) return { label: 'Sangat Mantap', color: '#43a047', icon: 'checkmark-circle' };
    if (value >= 60 && value < 80) return { label: 'Mantap', color: '#1e88e5', icon: 'checkmark' };
    if (value >= 40 && value < 60) return { label: 'Sedang', color: '#fb8c00', icon: 'warning' };
    return { label: 'Kurang Mantap', color: '#e53935', icon: 'close-circle' };
  };

  const formatPercentage = (num) => {
    return parseFloat(num).toFixed(2);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Icon name="construct" size={32} color="#00acc1" />
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
            <Icon name="road" size={24} color="#fff" />
            <Text style={styles.summaryTitle}>Total Data Tersedia</Text>
          </View>
          <Text style={styles.summaryValue}>{dataPersentaseTingkatKemantapanJalan?.length || 0} Tahun</Text>
          {dataPersentaseTingkatKemantapanJalan?.length > 0 && (
            <Text style={styles.summarySubtitle}>
              Periode: {dataPersentaseTingkatKemantapanJalan[0]?.tahun} - {dataPersentaseTingkatKemantapanJalan[dataPersentaseTingkatKemantapanJalan.length - 1]?.tahun}
            </Text>
          )}
        </View>

        {dataPersentaseTingkatKemantapanJalan?.map((item, index) => {
          const category = getRoadConditionCategory(item.kemantapan_jalan);
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
                  <View style={styles.conditionContainer}>
                    <Icon name={category.icon} size={32} color={category.color} />
                    <View style={styles.conditionContent}>
                      <Text style={[styles.conditionValue, { color: category.color }]}>
                        {formatPercentage(item.kemantapan_jalan)}%
                      </Text>
                      <Text style={styles.conditionLabel}>Kemantapan</Text>
                    </View>
                  </View>
                  
                  <View style={[styles.categoryBadge, { backgroundColor: category.color + '20' }]}>
                    <Icon name="ribbon" size={16} color={category.color} />
                    <Text style={[styles.categoryText, { color: category.color }]}>
                      Kondisi: {category.label}
                    </Text>
                  </View>

                  <View style={styles.interpretationBox}>
                    <Icon name="information-circle" size={18} color="#00acc1" />
                    <Text style={styles.interpretationText}>
                      {parseFloat(item.kemantapan_jalan) >= 80
                        ? 'Kondisi jalan sangat baik, infrastruktur jalan berkualitas tinggi'
                        : parseFloat(item.kemantapan_jalan) >= 60
                        ? 'Kondisi jalan baik, sebagian besar jalan dalam keadaan mantap'
                        : parseFloat(item.kemantapan_jalan) >= 40
                        ? 'Kondisi jalan sedang, perlu pemeliharaan rutin'
                        : 'Kondisi jalan kurang baik, perlu perbaikan dan rehabilitasi segera'}
                    </Text>
                  </View>
                </View>

                <View style={styles.cardFooter}>
                  <Icon name="information-circle-outline" size={16} color="#999" />
                  <Text style={styles.footerText}>Persentase Tingkat Kemantapan Jalan</Text>
                </View>
              </View>
            </AnimatedCard>
          )
        })}

        {(!dataPersentaseTingkatKemantapanJalan || dataPersentaseTingkatKemantapanJalan?.length === 0) && (
          <View style={styles.emptyState}>
            <Icon name="construct-outline" size={80} color="#ccc" />
            <Text style={styles.emptyText}>Belum ada data tersedia</Text>
          </View>
        )}

        {/* Statistics Card */}
        {dataPersentaseTingkatKemantapanJalan?.length > 0 && (
          <View style={styles.statsCard}>
            <View style={styles.statsHeader}>
              <Icon name="analytics" size={24} color="#00acc1" />
              <Text style={styles.statsTitle}>Statistik Kemantapan</Text>
            </View>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Icon name="trending-up" size={20} color="#43a047" />
                <Text style={styles.statLabel}>Tertinggi</Text>
                <Text style={[styles.statValue, { color: '#43a047' }]}>
                  {formatPercentage(Math.max(...dataPersentaseTingkatKemantapanJalan.map(d => parseFloat(d.kemantapan_jalan))))}%
                </Text>
              </View>
              <View style={styles.statItem}>
                <Icon name="trending-down" size={20} color="#e53935" />
                <Text style={styles.statLabel}>Terendah</Text>
                <Text style={[styles.statValue, { color: '#e53935' }]}>
                  {formatPercentage(Math.min(...dataPersentaseTingkatKemantapanJalan.map(d => parseFloat(d.kemantapan_jalan))))}%
                </Text>
              </View>
              <View style={styles.statItem}>
                <Icon name="calculator" size={20} color="#1e88e5" />
                <Text style={styles.statLabel}>Rata-rata</Text>
                <Text style={[styles.statValue, { color: '#1e88e5' }]}>
                  {formatPercentage((dataPersentaseTingkatKemantapanJalan.reduce((sum, d) => sum + parseFloat(d.kemantapan_jalan), 0) / dataPersentaseTingkatKemantapanJalan.length))}%
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Icon name="information-circle" size={24} color="#00acc1" />
            <Text style={styles.infoTitle}>Tentang Kemantapan Jalan</Text>
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoText}>
              Tingkat kemantapan jalan menunjukkan persentase jalan yang berada dalam kondisi 
              mantap/baik. Indikator ini penting untuk menilai kualitas infrastruktur jalan 
              dan kelancaran mobilitas transportasi di suatu wilayah.
            </Text>
          </View>
        </View>

        {/* Category Legend */}
        <View style={styles.legendCard}>
          <Text style={styles.legendTitle}>Kategori Kemantapan Jalan:</Text>
          <View style={styles.legendContent}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#43a047' }]} />
              <Text style={styles.legendText}>Sangat Mantap (≥80%)</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#1e88e5' }]} />
              <Text style={styles.legendText}>Mantap (60% - 79%)</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#fb8c00' }]} />
              <Text style={styles.legendText}>Sedang (40% - 59%)</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#e53935' }]} />
              <Text style={styles.legendText}>Kurang Mantap (&lt;40%)</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default DetailPTKJ

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
  conditionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  conditionContent: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  conditionValue: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  conditionLabel: {
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