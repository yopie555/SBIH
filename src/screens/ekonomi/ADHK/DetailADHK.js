import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
} from 'react-native';
import CategoryADHK from '../../../components/CategoryADHK';
import { color } from '../../../constants/Helper';
import { stateDataAtasDasarHargaKonstan } from '../../../state/dataADHK';
import Icon from 'react-native-vector-icons/Ionicons';

const AnimatedCard = ({ children, delay = 0 }) => {
    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const slideAnim = React.useRef(new Animated.Value(20)).current;

    React.useEffect(() => {
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

const DetailADHK = (props) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(1);
  const { dataAtasDasarHargaKonstan } = stateDataAtasDasarHargaKonstan();  
  
  // Filter dan sort data dari tahun terbaru ke terlama
  const dataRender = dataAtasDasarHargaKonstan
    ?.filter(item => {
      console.log('Filtering item:', item, 'selectedCategoryId:', selectedCategoryId, 'Match:', item.id === selectedCategoryId);
      return item.id === selectedCategoryId;
    })
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

  const formatRupiah = (angka) => {
    if (!angka) return '-';

    // Konversi ke string dan hapus karakter non-digit kecuali koma untuk desimal
    const numStr = angka.toString().replace(/[^\d,]/g, '');

    // Ganti koma dengan titik untuk parsing
    const cleanStr = numStr.replace(',', '.');

    if (cleanStr === '') return 'Rp 0,00-';

    // Konversi ke number
    const num = parseFloat(cleanStr) || 0;

    // Format angka dengan 2 desimal
    const formattedNum = num.toFixed(2);

    // Pisahkan bagian bulat dan desimal
    const [wholeNum, decimal] = formattedNum.split('.');

    // Tambahkan titik sebagai pemisah ribuan
    const formattedWhole = wholeNum.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    // Gabungkan dengan format yang diminta: Rp 1.000.000,00-
    return `Rp ${formattedWhole},${decimal}-`;
  };
  
  return (  
    <View style={styles.container}>  
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Icon name="cash" size={32} color="#2e7d32" />
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>{props.route.params.title}</Text>
            <View style={styles.sourceContainer}>
              <Icon name="document-text-outline" size={16} color="#666" />
              <Text style={styles.sourceText}>Sumber: <Text style={styles.sourceBPS}>BPS</Text></Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.filterSection}>
        <CategoryADHK
          onCategorySelect={(id) => {
            console.log('Category selected:', id);
            setSelectedCategoryId(id);
          }}
        />
      </View>
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >  
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Total Data Tersedia</Text>
          <Text style={styles.summaryValue}>{dataRender.length} Tahun</Text>
        </View>

        {dataRender.length > 0 ? (  
          dataRender.map((item, index) => (  
            <AnimatedCard key={`${item.tahun}-${index}`} delay={index * 50}>
              <View style={styles.dataCard}>
                <View style={styles.cardHeader}>
                  <View style={styles.yearBadge}>
                    <Icon name="calendar" size={18} color="#2e7d32" />
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
                  {/* Uraian */}
                  <View style={styles.uraianBox}>
                    <Icon name="document-text" size={18} color="#2e7d32" />
                    <Text style={styles.uraianText}>{item?.uraian || '-'}</Text>
                  </View>

                  {/* Jumlah */}
                  <View style={styles.jumlahContainer}>
                    <Icon name="cash-outline" size={24} color="#2e7d32" />
                    <View style={styles.jumlahContent}>
                      <Text style={styles.jumlahLabel}>Nilai ADHK:</Text>
                      <Text style={styles.jumlahValue}>
                        {formatRupiah(item?.jumlah)}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.cardFooter}>
                  <Icon name="information-circle-outline" size={16} color="#999" />
                  <Text style={styles.footerText}>Atas Dasar Harga Konstan</Text>
                </View>
              </View>
            </AnimatedCard>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Icon name="document-outline" size={80} color="#ccc" />
            <Text style={styles.emptyText}>Belum ada data tersedia</Text>
          </View>
        )}  

        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Icon name="information-circle" size={24} color="#2e7d32" />
            <Text style={styles.infoTitle}>Tentang ADHK</Text>
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoText}>
              Atas Dasar Harga Konstan (ADHK) adalah nilai produk domestik yang dihitung
              berdasarkan harga pada tahun dasar tertentu. ADHK menghilangkan pengaruh
              inflasi untuk melihat pertumbuhan ekonomi riil.
            </Text>
          </View>
        </View>
      </ScrollView>  
    </View>  
  )  
}  

export default DetailADHK;

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
  filterSection: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 30,
  },
  summaryCard: {
    backgroundColor: '#2e7d32',
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
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  yearText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e7d32',
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
  uraianBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    gap: 10,
  },
  uraianText: {
    fontSize: 14,
    color: '#1a1a1a',
    flex: 1,
    fontWeight: '500',
  },
  jumlahContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  jumlahContent: {
    flex: 1,
  },
  jumlahLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  jumlahValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
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
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#2e7d32',
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
});