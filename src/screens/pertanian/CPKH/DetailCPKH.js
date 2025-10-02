import { StyleSheet, Text, View, ScrollView, Animated } from 'react-native'
import React, { useRef, useEffect, useMemo } from 'react'
import { stateDataCapaianProduksiKomoditiHortikultura } from '../../../state/dataCPKH'
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

const DetailCPKH = (props) => {
  const {dataCapaianProduksiKomoditiHortikultura} = stateDataCapaianProduksiKomoditiHortikultura()

  // Sort data by year (newest to oldest)
  const sortedData = useMemo(() => {
    if (!dataCapaianProduksiKomoditiHortikultura) return [];
    
    return [...dataCapaianProduksiKomoditiHortikultura].sort((a, b) => {
      const yearA = parseInt(a.tahun);
      const yearB = parseInt(b.tahun);
      return yearB - yearA; // Descending order (newest first)
    });
  }, [dataCapaianProduksiKomoditiHortikultura]);

  const getStatusColor = (status) => {
    if (status.toLowerCase().includes('tetap')) return '#43a047';
    if (status.toLowerCase().includes('sementara')) return '#fb8c00';
    return '#666';
  };

  const getCPKHCategory = (jumlah) => {
    const value = parseFloat(jumlah);
    if (value >= 100) return { label: 'Sangat Produktif', color: '#43a047', icon: 'trending-up' };
    if (value >= 50 && value < 100) return { label: 'Produktif', color: '#1e88e5', icon: 'arrow-up' };
    if (value >= 20 && value < 50) return { label: 'Cukup', color: '#fb8c00', icon: 'remove' };
    return { label: 'Rendah', color: '#e53935', icon: 'trending-down' };
  };

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Icon name="nutrition" size={32} color="#7b1fa2" />
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
          <Text style={styles.summaryTitle}>Total Data Tersedia</Text>
          <Text style={styles.summaryValue}>{sortedData?.length || 0} Tahun</Text>
        </View>

        {sortedData?.map((item, index) => {
          const category = getCPKHCategory(item.jumlah);
          return (
            <AnimatedCard key={index} delay={index * 50}>
              <View style={styles.dataCard}>
                <View style={styles.cardHeader}>
                  <View style={styles.yearBadge}>
                    <Icon name="calendar" size={18} color="#7b1fa2" />
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
                  <View style={styles.cpkhContainer}>
                    <Icon name={category.icon} size={32} color={category.color} />
                    <View style={styles.cpkhContent}>
                      <Text style={[styles.cpkhValue, { color: category.color }]}>
                        {formatNumber(item.jumlah)}
                      </Text>
                      <Text style={styles.cpkhLabel}>Ton/Ha</Text>
                    </View>
                  </View>
                  
                  <View style={[styles.categoryBadge, { backgroundColor: category.color + '20' }]}>
                    <Icon name="ribbon" size={16} color={category.color} />
                    <Text style={[styles.categoryText, { color: category.color }]}>
                      Produktivitas: {category.label}
                    </Text>
                  </View>

                  {/* Interpretation */}
                  <View style={styles.interpretationBox}>
                    <Icon name="information-circle" size={18} color="#7b1fa2" />
                    <Text style={styles.interpretationText}>
                      {parseFloat(item.jumlah) >= 100 
                        ? 'Produktivitas hortikultura sangat tinggi, hasil panen optimal'
                        : parseFloat(item.jumlah) >= 50
                        ? 'Produktivitas hortikultura baik, hasil panen memuaskan'
                        : 'Perlu peningkatan teknologi budidaya dan perawatan tanaman'}
                    </Text>
                  </View>
                </View>

                <View style={styles.cardFooter}>
                  <Icon name="information-circle-outline" size={16} color="#999" />
                  <Text style={styles.footerText}>Capaian Produksi Komoditi Hortikultura (Ton/Ha)</Text>
                </View>
              </View>
            </AnimatedCard>
          )
        })}

        {sortedData?.length === 0 && (
          <View style={styles.emptyState}>
            <Icon name="nutrition-outline" size={80} color="#ccc" />
            <Text style={styles.emptyText}>Belum ada data tersedia</Text>
          </View>
        )}

        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Icon name="information-circle" size={24} color="#7b1fa2" />
            <Text style={styles.infoTitle}>Tentang CPKH</Text>
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoText}>
              Capaian Produksi Komoditi Hortikultura menunjukkan produktivitas tanaman hortikultura 
              seperti sayuran, buah-buahan, dan tanaman hias. Data ini mencerminkan tingkat 
              produktivitas per hektar (Ton/Ha) sektor hortikultura.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default DetailCPKH

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
    backgroundColor: '#7b1fa2',
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
    backgroundColor: '#F3E5F5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  yearText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7b1fa2',
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
  cpkhContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  cpkhContent: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  cpkhValue: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  cpkhLabel: {
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
    backgroundColor: '#F3E5F5',
    borderRadius: 8,
    padding: 12,
    gap: 10,
  },
  interpretationText: {
    fontSize: 14,
    color: '#4a148c',
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
    backgroundColor: '#F3E5F5',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#7b1fa2',
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