import { StyleSheet, Text, View, ScrollView, Animated } from 'react-native'
import React, { useRef, useEffect } from 'react'
import {stateDataJumlahPenduduk} from '../../../state/dataJP'
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
  const { dataJumlahPenduduk } = stateDataJumlahPenduduk()

  // Sort data dari tahun terbaru ke terlama
  const sortedData = dataJumlahPenduduk
    ?.sort((a, b) => {
      const yearA = parseInt(a.tahun) || 0;
      const yearB = parseInt(b.tahun) || 0;
      return yearB - yearA; // Descending order (terbaru ke terlama)
    }) || [];

  const getStatusColor = (status) => {
    if (!status) return '#666';
    if (status.toLowerCase().includes('tetap')) return '#43a047';
    if (status.toLowerCase().includes('sementara')) return '#fb8c00';
    return '#666';
  };

  const formatNumber = (num) => {
    if (!num) return '0';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const calculatePercentage = (laki, perempuan) => {
    const lakiNum = parseInt(laki) || 0;
    const perempuanNum = parseInt(perempuan) || 0;
    const total = lakiNum + perempuanNum;
    
    if (total === 0) return { lakiPct: '0.0', perempuanPct: '0.0' };
    
    const lakiPct = ((lakiNum / total) * 100).toFixed(1);
    const perempuanPct = ((perempuanNum / total) * 100).toFixed(1);
    return { lakiPct, perempuanPct };
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Icon name="people-circle" size={32} color="#3949ab" />
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
          <Text style={styles.summaryValue}>{sortedData.length} Record</Text>
        </View>

        {sortedData.map((item, index) => {
          const { lakiPct, perempuanPct } = calculatePercentage(item?.laki, item?.perempuan);
          return (
            <AnimatedCard key={`${item.tahun}-${index}`} delay={index * 50}>
              <View style={styles.dataCard}>
                <View style={styles.cardHeader}>
                  <View style={styles.yearBadge}>
                    <Icon name="calendar" size={18} color="#3949ab" />
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
                  {/* Gender Statistics */}
                  <View style={styles.genderStats}>
                    <View style={styles.genderItem}>
                      <View style={styles.genderHeader}>
                        <Icon name="male" size={24} color="#1e88e5" />
                        <Text style={styles.genderLabel}>Laki-laki</Text>
                      </View>
                      <Text style={styles.genderValue}>{formatNumber(item?.laki)}</Text>
                      <View style={styles.percentageBar}>
                        <View style={[styles.percentageFill, { width: `${lakiPct}%`, backgroundColor: '#1e88e5' }]} />
                      </View>
                      <Text style={styles.percentageText}>{lakiPct}%</Text>
                    </View>

                    <View style={styles.genderDivider} />

                    <View style={styles.genderItem}>
                      <View style={styles.genderHeader}>
                        <Icon name="female" size={24} color="#e91e63" />
                        <Text style={styles.genderLabel}>Perempuan</Text>
                      </View>
                      <Text style={styles.genderValue}>{formatNumber(item?.perempuan)}</Text>
                      <View style={styles.percentageBar}>
                        <View style={[styles.percentageFill, { width: `${perempuanPct}%`, backgroundColor: '#e91e63' }]} />
                      </View>
                      <Text style={styles.percentageText}>{perempuanPct}%</Text>
                    </View>
                  </View>

                  {/* Total Population */}
                  <View style={styles.totalSection}>
                    <Icon name="people" size={20} color="#3949ab" />
                    <View style={styles.totalContent}>
                      <Text style={styles.totalLabel}>Total Penduduk</Text>
                      <Text style={styles.totalValue}>{formatNumber(item?.total)} Orang</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.cardFooter}>
                  <Icon name="information-circle-outline" size={16} color="#999" />
                  <Text style={styles.footerText}>Data Jumlah Penduduk Tahunan</Text>
                </View>
              </View>
            </AnimatedCard>
          )
        })}

        {sortedData.length === 0 && (
          <View style={styles.emptyState}>
            <Icon name="people-outline" size={80} color="#ccc" />
            <Text style={styles.emptyText}>Belum ada data tersedia</Text>
          </View>
        )}

        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Icon name="information-circle" size={24} color="#3949ab" />
            <Text style={styles.infoTitle}>Tentang Data Penduduk</Text>
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoText}>
              Jumlah penduduk menunjukkan total populasi berdasarkan jenis kelamin. 
              Data ini penting untuk perencanaan pembangunan, alokasi sumber daya, 
              dan kebijakan kependudukan di wilayah tersebut.
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
    backgroundColor: '#3949ab',
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
    backgroundColor: '#E8EAF6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  yearText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3949ab',
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
  genderStats: {
    flexDirection: 'row',
    gap: 16,
  },
  genderItem: {
    flex: 1,
  },
  genderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  genderLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  genderValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  percentageBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  percentageFill: {
    height: '100%',
    borderRadius: 4,
  },
  percentageText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
  },
  genderDivider: {
    width: 1,
    backgroundColor: '#e0e0e0',
  },
  totalSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8EAF6',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  totalContent: {
    flex: 1,
  },
  totalLabel: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3949ab',
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
    backgroundColor: '#E8EAF6',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#3949ab',
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