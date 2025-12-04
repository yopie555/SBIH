import { StyleSheet, Text, View, ScrollView, Animated, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useRef, useEffect, useState, useMemo } from 'react'
import { stateDataAngkaMelekHuruf } from '../../../state/dataAMH'
import { color } from '../../../constants/Helper'
import Icon from 'react-native-vector-icons/Ionicons'
import axios from 'axios'
import { baseURL } from '../../../constants/General'
import { useMutation } from 'react-query'

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
  const { dataAngkaMelekHuruf, setDataAngkaMelekHuruf } = stateDataAngkaMelekHuruf()

  const [expanded, setExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('15-24') // Default: kategori 1 (15-24)

  const filterOptions = [
    { kelUmur: '1', title: 'Usia 15-24', icon: 'people' },
    { kelUmur: '2', title: 'Usia 25-34', icon: 'people' },
    { kelUmur: '3', title: 'Usia 35-44', icon: 'people' },
    { kelUmur: '4', title: 'Usia 45-54', icon: 'people' },
    { kelUmur: '5', title: 'Usia 55+', icon: 'people' },
  ];

  // Get current kel_umur from selected category
  const currentKelUmur = useMemo(() => {
    return filterOptions.find(opt => opt.title === selectedCategory)?.kelUmur || filterOptions[0].kelUmur;
  }, [selectedCategory]);

  // API call with POST method
  const { mutate: fetchData, isLoading } = useMutation(
    async (kelUmur) => {
      const response = await axios.post(`${baseURL}/sosial/amh`, {
        'kel_umur': kelUmur
      });
      return response.data.result;
    },
    {
      onError: (error) => {
        console.error("Error fetching AMH data:", error);
      },
      onSuccess: (data) => {
        setDataAngkaMelekHuruf(data);
      }
    }
  );

  // Fetch data when category changes
  useEffect(() => {
    fetchData(currentKelUmur);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentKelUmur]);

  // Sort data by year in descending order (current year to past years)
  const sortedData = useMemo(() => {
    return [...(dataAngkaMelekHuruf || [])].sort((a, b) => b.tahun - a.tahun);
  }, [dataAngkaMelekHuruf]);

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

  const getCategoryColor = (category) => {
    if (category === '15-24') return '#4caf50';
    if (category === '25-34') return '#2196f3';
    if (category === '35-44') return '#ff9800';
    if (category === '45-54') return '#9c27b0';
    if (category === '55+') return '#f44336';
    return '#666';
  };

  const handleFilterChange = (kelUmur, title) => {
    setSelectedCategory(title);
    setExpanded(false);
  };

  // Data is already filtered by API, so we use sortedData directly
  const dataFiltered = sortedData;

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

      {/* Loading Indicator */}
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00897b" />
          <Text style={styles.loadingText}>Memuat data...</Text>
        </View>
      )}

      {/* Filter Accordion */}
      <View style={styles.filterContainer}>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setExpanded(!expanded)}
        >
          <View style={styles.filterButtonContent}>
            <Icon name="filter" size={20} color="#00897b" />
            <Text style={styles.filterButtonText}>
              Filter: <Text style={styles.filterButtonValue}>{selectedCategory}</Text>
            </Text>
          </View>
          <Icon 
            name={expanded ? "chevron-up" : "chevron-down"} 
            size={20} 
            color="#00897b" 
          />
        </TouchableOpacity>

        {expanded && (
          <View style={styles.filterOptions}>
            {filterOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.filterOption,
                  selectedCategory === option.title && styles.filterOptionSelected
                ]}
                onPress={() => handleFilterChange(option.kelUmur, option.title)}
              >
                <Icon 
                  name={option.icon} 
                  size={24} 
                  color={selectedCategory === option.title ? getCategoryColor(option.title) : '#666'} 
                />
                <View style={styles.filterOptionContent}>
                  <Text style={[
                    styles.filterOptionTitle,
                    selectedCategory === option.title && { color: getCategoryColor(option.title) }
                  ]}>
                    {option.title}
                  </Text>
                </View>
                {selectedCategory === option.title && (
                  <Icon name="checkmark-circle" size={20} color={getCategoryColor(option.title)} />
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
          <Text style={styles.summaryTitle}>Total Data {selectedCategory}</Text>
          <Text style={styles.summaryValue}>{dataFiltered?.length || 0} Record</Text>
        </View>

        {dataFiltered?.map((item, index) => {
          const category = getLiteracyCategory(item.laki);
          return (
            <AnimatedCard key={index} delay={index * 50}>
              <View style={styles.dataCard}>
                <View style={styles.cardHeader}>
                  <View style={styles.yearBadge}>
                    <Icon name="calendar" size={18} color="#00897b" />
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
                  <View style={styles.ahhContainer}>
                    <Icon name="book" size={28} color={category.color} />
                    <View style={styles.ahhContent}>
                      <Text style={[styles.ahhValue, { color: category.color }]}>
                        {item.laki}%
                      </Text>                      
                    </View>
                  </View>

                  <View style={[styles.categoryBadge, { backgroundColor: category.color + '20' }]}>
                    <Icon name="ribbon" size={16} color={category.color} />
                    <Text style={[styles.categoryText, { color: category.color }]}>
                      Kategori: {category.label}
                    </Text>
                  </View>

                  {/* Life Expectancy Interpretation */}
                  <View style={styles.interpretationBox}>
                    <Icon name="information-circle" size={18} color="#00897b" />
                    <Text style={styles.interpretationText}>
                      Tingkat melek huruf untuk kelompok {item.kel_umur}: {item.laki}%
                    </Text>
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

        {dataFiltered?.length === 0 && (
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
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#E0F2F1',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
    color: '#00897b',
    fontWeight: '500',
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
    color: '#00897b',
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
  yearBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0F2F1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  yearText: {
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
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
    gap: 12,
  },
  ahhContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  ahhContent: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },
  ahhValue: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  ahhLabel: {
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
    backgroundColor: '#E0F2F1',
    borderRadius: 8,
    padding: 12,
    gap: 10,
  },
  interpretationText: {
    fontSize: 14,
    color: '#00695c',
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