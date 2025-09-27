import { StyleSheet, Text, View, ScrollView, Animated } from 'react-native'
import React, { useRef, useEffect } from 'react'
import { stateDataPersentasePendudukUsia } from '../../../state/dataPPU'
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

const DetailPPU = (props) => {
  const {dataPersentasePendudukUsia} = stateDataPersentasePendudukUsia()

  const getStatusColor = (status) => {
    if (status.toLowerCase().includes('tetap')) return '#43a047';
    if (status.toLowerCase().includes('sementara')) return '#fb8c00';
    return '#666';
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Icon name="people" size={32} color="#1976d2" />
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
          <Text style={styles.summaryValue}>{dataPersentasePendudukUsia?.length || 0} Kategori</Text>
        </View>

        {dataPersentasePendudukUsia?.map((item, index) => {
          const gapGender = Math.abs(parseFloat(item.laki) - parseFloat(item.perempuan)).toFixed(2);
          
          return (
            <AnimatedCard key={index} delay={index * 50}>
              <View style={styles.dataCard}>
                <View style={styles.cardHeader}>
                  <View style={styles.categoryBadge}>
                    <Icon name="school" size={18} color="#1976d2" />
                    <Text style={styles.categoryText}>{item.pendidikan}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status_data) + '20' }]}>
                    <View style={[styles.statusDot, { backgroundColor: getStatusColor(item.status_data) }]} />
                    <Text style={[styles.statusText, { color: getStatusColor(item.status_data) }]}>
                      {item.status_data}
                    </Text>
                  </View>
                </View>

                <View style={styles.cardBody}>
                  {/* Gender Stats */}
                  <View style={styles.genderStats}>
                    <View style={styles.genderItem}>
                      <Icon name="male" size={24} color="#1e88e5" />
                      <View style={styles.genderContent}>
                        <Text style={styles.genderLabel}>Laki-laki</Text>
                        <Text style={[styles.genderValue, { color: '#1e88e5' }]}>
                          {item.laki}%
                        </Text>
                      </View>
                    </View>

                    <View style={styles.genderDivider} />

                    <View style={styles.genderItem}>
                      <Icon name="female" size={24} color="#e91e63" />
                      <View style={styles.genderContent}>
                        <Text style={styles.genderLabel}>Perempuan</Text>
                        <Text style={[styles.genderValue, { color: '#e91e63' }]}>
                          {item.perempuan}%
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* Total */}
                  <View style={styles.totalBox}>
                    <Icon name="people" size={20} color="#1976d2" />
                    <Text style={styles.totalLabel}>Total:</Text>
                    <Text style={styles.totalValue}>{item.total}%</Text>
                  </View>

                  {/* Gender Gap */}
                  <View style={styles.gapBox}>
                    <Icon name="analytics" size={18} color="#666" />
                    <Text style={styles.gapText}>
                      Gap Gender: <Text style={styles.gapValue}>{gapGender}%</Text>
                    </Text>
                  </View>
                </View>

                <View style={styles.cardFooter}>
                  <Icon name="information-circle-outline" size={16} color="#999" />
                  <Text style={styles.footerText}>Persentase Penduduk Usia Produktif</Text>
                </View>
              </View>
            </AnimatedCard>
          )
        })}

        {dataPersentasePendudukUsia?.length === 0 && (
          <View style={styles.emptyState}>
            <Icon name="people-outline" size={80} color="#ccc" />
            <Text style={styles.emptyText}>Belum ada data tersedia</Text>
          </View>
        )}

        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Icon name="information-circle" size={24} color="#1976d2" />
            <Text style={styles.infoTitle}>Tentang PPU</Text>
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoText}>
              Persentase Penduduk Usia menunjukkan distribusi penduduk berdasarkan 
              kelompok usia dan tingkat pendidikan. Data ini membantu memahami struktur 
              demografi dan tingkat pendidikan masyarakat.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default DetailPPU

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
    backgroundColor: '#1976d2',
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
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976d2',
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
  genderStats: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
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
  genderLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  genderValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  genderDivider: {
    width: 1,
    backgroundColor: '#ddd',
    marginHorizontal: 12,
  },
  totalBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    padding: 12,
    gap: 8,
  },
  totalLabel: {
    fontSize: 14,
    color: '#1976d2',
    fontWeight: '600',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976d2',
  },
  gapBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingTop: 8,
  },
  gapText: {
    fontSize: 14,
    color: '#666',
  },
  gapValue: {
    fontWeight: 'bold',
    color: '#1976d2',
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
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#1976d2',
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