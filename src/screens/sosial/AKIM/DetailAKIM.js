import { StyleSheet, Text, View, ScrollView, Animated } from 'react-native'
import React, { useRef, useEffect } from 'react'
import { stateDataAngkaKematianIbuMelahirkan } from '../../../state/dataAKIM'
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

const DetailAKIM = (props) => {
  const {dataAngkaKematianIbuMelahirkan} = stateDataAngkaKematianIbuMelahirkan()

  const getStatusColor = (status) => {
    if (status.toLowerCase().includes('tetap')) return '#43a047';
    if (status.toLowerCase().includes('sementara')) return '#fb8c00';
    if (status.toLowerCase().includes('estimasi')) return '#1e88e5';
    return '#666';
  };

  const getAKIMCategory = (kematian) => {
    const value = parseFloat(kematian);
    if (value < 100) return { label: 'Sangat Baik', color: '#43a047' };
    if (value >= 100 && value < 150) return { label: 'Baik', color: '#1e88e5' };
    if (value >= 150 && value < 200) return { label: 'Perlu Perhatian', color: '#fb8c00' };
    return { label: 'Kritis', color: '#e53935' };
  };

  // Sort data by year in descending order (current year to past years)
  const sortedData = [...(dataAngkaKematianIbuMelahirkan || [])].sort((a, b) => b.tahun - a.tahun);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Icon name="medkit" size={32} color="#c2185b" />
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
          <Text style={styles.summaryValue}>{sortedData.length || 0} Tahun</Text>
        </View>

        {sortedData.map((item, index) => {
          const category = getAKIMCategory(item.kematian_ibu);
          return (
            <AnimatedCard key={index} delay={index * 50}>
              <View style={styles.dataCard}>
                <View style={styles.cardHeader}>
                  <View style={styles.yearBadge}>
                    <Icon name="calendar" size={18} color="#c2185b" />
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
                  <View style={styles.akimContainer}>
                    <Icon name="heart" size={32} color={category.color} />
                    <View style={styles.akimContent}>
                      <Text style={[styles.akimValue, { color: category.color }]}>
                        {parseFloat(item.kematian_ibu).toFixed(2)}
                      </Text>
                      <Text style={styles.akimLabel}>per 100K</Text>
                    </View>
                  </View>

                  {/* Interpretation */}
                  <View style={styles.interpretationBox}>
                    <Icon name="information-circle" size={18} color="#c2185b" />
                    <Text style={styles.interpretationText}>
                      Dari 100.000 kelahiran hidup, sekitar {parseFloat(item.kematian_ibu).toFixed(2)} ibu meninggal
                    </Text>
                  </View>
                </View>

                <View style={styles.cardFooter}>
                  <Icon name="information-circle-outline" size={16} color="#999" />
                  <Text style={styles.footerText}>per 100.000 Kelahiran Hidup</Text>
                </View>
              </View>
            </AnimatedCard>
          )
        })}

        {sortedData.length === 0 && (
          <View style={styles.emptyState}>
            <Icon name="medkit-outline" size={80} color="#ccc" />
            <Text style={styles.emptyText}>Belum ada data tersedia</Text>
          </View>
        )}

        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Icon name="information-circle" size={24} color="#c2185b" />
            <Text style={styles.infoTitle}>Tentang AKIM</Text>
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoText}>
              Angka Kematian Ibu Melahirkan (AKIM) adalah jumlah kematian ibu per 100.000 
              kelahiran hidup akibat komplikasi kehamilan dan persalinan. Semakin rendah 
              angka ini, semakin baik kualitas layanan kesehatan maternal.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default DetailAKIM

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
    backgroundColor: '#c2185b',
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
    backgroundColor: '#FCE4EC',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  yearText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#c2185b',
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
  akimContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  akimContent: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  akimValue: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  akimLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  interpretationBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FCE4EC',
    borderRadius: 8,
    padding: 12,
    gap: 10,
  },
  interpretationText: {
    fontSize: 14,
    color: '#880e4f',
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
    backgroundColor: '#FCE4EC',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#c2185b',
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