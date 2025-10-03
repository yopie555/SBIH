import { StyleSheet, Text, View, ScrollView, Animated } from 'react-native'
import React, { useRef, useEffect } from 'react'
import { stateDataLamaSekolah } from '../../../state/dataRLS'
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

const DetailRLS = (props) => {
  const {dataLamaSekolah} = stateDataLamaSekolah()

  const getStatusColor = (status) => {
    if (status.toLowerCase().includes('tetap')) return '#43a047';
    if (status.toLowerCase().includes('sementara')) return '#fb8c00';
    if (status.toLowerCase().includes('estimasi')) return '#1e88e5';
    return '#666';
  };

  const getRLSCategory = (rls) => {
    const value = parseFloat(rls);
    
    // Handle anomali data (outlier seperti tahun 2016: 20.9)
    if (value > 15) {
      return { 
        label: 'Data Anomali', 
        color: '#ff9800', 
        icon: 'warning',
        isAnomaly: true 
      };
    }
    
    // Kategori berdasarkan data aktual (range 8-9 tahun)
    if (value >= 9) return { label: 'Baik', color: '#43a047', icon: 'school' };
    if (value >= 8 && value < 9) return { label: 'Cukup Baik', color: '#1e88e5', icon: 'book' };
    if (value >= 7 && value < 8) return { label: 'Cukup', color: '#fb8c00', icon: 'book-outline' };
    return { label: 'Rendah', color: '#e53935', icon: 'alert-circle' };
  };

  const sortedData = [...(dataLamaSekolah || [])].sort((a, b) => {
    return parseInt(b.tahun) - parseInt(a.tahun);
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Icon name="school" size={32} color="#7b1fa2" />
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
          <Text style={styles.summaryValue}>{dataLamaSekolah?.length || 0} Tahun</Text>
        </View>

        {sortedData.map((item, index) => {
          const category = getRLSCategory(item.rls);
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
                  <View style={styles.rlsContainer}>
                    <Icon name={category.icon} size={28} color={category.color} />
                    <View style={styles.rlsContent}>
                      <Text style={[styles.rlsValue, { color: category.color }]}>
                        {item.rls}
                      </Text>
                      <Text style={styles.rlsLabel}>Tahun</Text>
                    </View>
                  </View>
                  
                  {category.isAnomaly && (
                    <View style={styles.anomalyWarning}>
                      <Icon name="alert-circle" size={16} color="#ff9800" />
                      <Text style={styles.anomalyText}>
                        Data tidak normal, kemungkinan kesalahan input
                      </Text>
                    </View>
                  )}
                  
                  <View style={[styles.categoryBadge, { backgroundColor: category.color + '20' }]}>
                    <Icon name="ribbon" size={16} color={category.color} />
                    <Text style={[styles.categoryText, { color: category.color }]}>
                      Kategori: {category.label}
                    </Text>
                  </View>

                  {!category.isAnomaly && (
                    <View style={styles.educationIndicator}>
                      <Text style={styles.educationLabel}>Setara dengan:</Text>
                      <Text style={styles.educationLevel}>
                        {parseFloat(item.rls) >= 9 ? 'SMP/MTs' :
                         parseFloat(item.rls) >= 6 ? 'SD/MI' : 'Di bawah SD'}
                      </Text>
                    </View>
                  )}
                </View>

                <View style={styles.cardFooter}>
                  <Icon name="information-circle-outline" size={16} color="#999" />
                  <Text style={styles.footerText}>Rata-rata Lama Sekolah</Text>
                </View>
              </View>
            </AnimatedCard>
          )
        })}

        {dataLamaSekolah?.length === 0 && (
          <View style={styles.emptyState}>
            <Icon name="school-outline" size={80} color="#ccc" />
            <Text style={styles.emptyText}>Belum ada data tersedia</Text>
          </View>
        )}

        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Icon name="information-circle" size={24} color="#7b1fa2" />
            <Text style={styles.infoTitle}>Tentang RLS</Text>
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoText}>
              Rata-rata Lama Sekolah (RLS) menunjukkan jumlah tahun yang digunakan oleh 
              penduduk usia 25 tahun ke atas dalam menjalani pendidikan formal.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default DetailRLS

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
  rlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  rlsContent: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },
  rlsValue: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  rlsLabel: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  anomalyWarning: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff3e0',
    borderRadius: 8,
    padding: 10,
    gap: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#ff9800',
  },
  anomalyText: {
    fontSize: 13,
    color: '#e65100',
    flex: 1,
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
  educationIndicator: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  educationLabel: {
    fontSize: 13,
    color: '#666',
  },
  educationLevel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7b1fa2',
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