import { StyleSheet, Text, View, ScrollView, Animated } from 'react-native'
import React, { useRef, useEffect } from 'react'
import { stateDataAngkaMelekHuruf } from '../../../state/dataAMH'
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

const DetailAMH = (props) => {
  const {dataAngkaMelekHuruf} = stateDataAngkaMelekHuruf()

  const getStatusColor = (status) => {
    if (status.toLowerCase().includes('tetap')) return '#43a047';
    if (status.toLowerCase().includes('sementara')) return '#fb8c00';
    return '#666';
  };

  const getLiteracyCategory = (percentage) => {
    const value = parseFloat(percentage);
    if (value >= 95) return { label: 'Sangat Baik', color: '#43a047' };
    if (value >= 90 && value < 95) return { label: 'Baik', color: '#1e88e5' };
    if (value >= 80 && value < 90) return { label: 'Cukup', color: '#fb8c00' };
    return { label: 'Rendah', color: '#e53935' };
  };

  // Sort data by year in descending order (current year to past years)
  const sortedData = [...(dataAngkaMelekHuruf || [])].sort((a, b) => b.tahun - a.tahun);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Icon name="book" size={32} color="#00897b" />
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
          <Text style={styles.summaryTitle}>Total Kelompok Umur</Text>
          <Text style={styles.summaryValue}>{sortedData.length || 0}</Text>
        </View>

        {sortedData.map((item, index) => {
          const lakiCategory = getLiteracyCategory(item.laki);
          const perempuanCategory = getLiteracyCategory(item.perempuan);
          const average = ((parseFloat(item.laki) + parseFloat(item.perempuan)) / 2).toFixed(2);
          const averageCategory = getLiteracyCategory(average);

          return (
            <AnimatedCard key={index} delay={index * 50}>
              <View style={styles.dataCard}>
                <View style={styles.cardHeader}>
                  <View style={styles.ageGroupBadge}>
                    <Icon name="people" size={18} color="#00897b" />
                    <Text style={styles.ageGroupText}>{item.kel_umur}</Text>
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
                      <View style={styles.genderHeader}>
                        <Icon name="male" size={20} color="#1e88e5" />
                        <Text style={styles.genderLabel}>Laki-laki</Text>
                      </View>
                      <Text style={[styles.genderValue, { color: lakiCategory.color }]}>
                        {item.laki}%
                      </Text>
                      <View style={styles.progressBar}>
                        <View style={[styles.progressFill, { width: `${item.laki}%`, backgroundColor: lakiCategory.color }]} />
                      </View>
                      <View style={[styles.miniCategory, { backgroundColor: lakiCategory.color + '20' }]}>
                        <Text style={[styles.miniCategoryText, { color: lakiCategory.color }]}>
                          {lakiCategory.label}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.genderDivider} />

                    <View style={styles.genderItem}>
                      <View style={styles.genderHeader}>
                        <Icon name="female" size={20} color="#e91e63" />
                        <Text style={styles.genderLabel}>Perempuan</Text>
                      </View>
                      <Text style={[styles.genderValue, { color: perempuanCategory.color }]}>
                        {item.perempuan}%
                      </Text>
                      <View style={styles.progressBar}>
                        <View style={[styles.progressFill, { width: `${item.perempuan}%`, backgroundColor: perempuanCategory.color }]} />
                      </View>
                      <View style={[styles.miniCategory, { backgroundColor: perempuanCategory.color + '20' }]}>
                        <Text style={[styles.miniCategoryText, { color: perempuanCategory.color }]}>
                          {perempuanCategory.label}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* Average */}
                  <View style={styles.averageSection}>
                    <Icon name="analytics" size={18} color="#00897b" />
                    <View style={styles.averageContent}>
                      <Text style={styles.averageLabel}>Rata-rata</Text>
                      <Text style={[styles.averageValue, { color: averageCategory.color }]}>
                        {average}%
                      </Text>
                    </View>
                    <View style={[styles.averageBadge, { backgroundColor: averageCategory.color + '20' }]}>
                      <Text style={[styles.averageBadgeText, { color: averageCategory.color }]}>
                        {averageCategory.label}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.cardFooter}>
                  <Icon name="information-circle-outline" size={16} color="#999" />
                  <Text style={styles.footerText}>Angka Melek Huruf per Kelompok Umur</Text>
                </View>
              </View>
            </AnimatedCard>
          )
        })}

        {sortedData.length === 0 && (
          <View style={styles.emptyState}>
            <Icon name="book-outline" size={80} color="#ccc" />
            <Text style={styles.emptyText}>Belum ada data tersedia</Text>
          </View>
        )}

        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Icon name="information-circle" size={24} color="#00897b" />
            <Text style={styles.infoTitle}>Tentang AMH</Text>
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoText}>
              Angka Melek Huruf (AMH) menunjukkan persentase penduduk usia tertentu 
              yang memiliki kemampuan membaca dan menulis huruf latin dan/atau huruf lainnya.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default DetailAMH

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
  ageGroupBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0F2F1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  ageGroupText: {
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
    gap: 6,
    marginBottom: 8,
  },
  genderLabel: {
    fontSize: 13,
    color: '#666',
    fontWeight: '600',
  },
  genderValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  miniCategory: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  miniCategoryText: {
    fontSize: 11,
    fontWeight: '600',
  },
  genderDivider: {
    width: 1,
    backgroundColor: '#e0e0e0',
  },
  averageSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0F2F1',
    borderRadius: 12,
    padding: 12,
    gap: 12,
  },
  averageContent: {
    flex: 1,
  },
  averageLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  averageValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  averageBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  averageBadgeText: {
    fontSize: 12,
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
  infoCard: {
    backgroundColor: '#E0F2F1',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#00897b',
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