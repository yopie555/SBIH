import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import React from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { stateDataAnggaran } from '../../../state/dataAnggaran';
import Icon from 'react-native-vector-icons/Ionicons';

const AnggaranMurni = () => {
  const { dataAnggaran } = stateDataAnggaran();
  const data = dataAnggaran?.statistik1_murni;
  
  useFocusEffect(
    React.useCallback(() => {
    }, [data])
  );

  const formatRupiah = (number) => {
    if (!number && number !== 0) return 'Rp 0';
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(number);
  };

  if (!data) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0074BD" />
        <Text style={styles.loadingText}>Memuat data...</Text>
      </View>
    );
  }

  const paguDana = data?.PaguDana1;
  const formattedPaguDana = formatRupiah(paguDana);

  const realisasi = data?.RealisasiKeuangan1;
  const formattedRealisasi = formatRupiah(realisasi);

  const persenRealisasiKeuangan = data?.PersenRealisasiKeuangan1 || 0;
  const realisasiFisik = data?.RealisasiFisik1 || 0;

  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Card 1: APBD Murni */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Icon name="wallet" size={24} color="#0074BD" />
          <Text style={styles.cardHeaderText}>APBD Murni</Text>
        </View>
        <View style={styles.cardBody}>
          <View style={[styles.cardBadge, { backgroundColor: '#0074BD' }]}>
            <Text style={styles.badgeText}>APBD{'\n'}Murni</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardLabel}>Total Pagu APBD</Text>
            <Text style={styles.cardValue}>{formattedPaguDana}</Text>
          </View>
        </View>
      </View>

      {/* Card 2: Program dan Kegiatan */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Icon name="list" size={24} color="#8e24aa" />
          <Text style={styles.cardHeaderText}>Program dan Kegiatan</Text>
        </View>
        <View style={styles.cardBody}>
          <View style={[styles.cardBadge, { backgroundColor: '#8e24aa' }]}>
            <Text style={styles.badgeText}>APBD{'\n'}Murni</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardLabel}>Jumlah Program dan Kegiatan</Text>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Program</Text>
                <Text style={styles.statValue}>{data?.JumlahProgram1 || 0}</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Kegiatan</Text>
                <Text style={styles.statValue}>{data?.JumlahKegiatan1 || 0}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Card 3: Progres Keuangan */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Icon name="trending-up" size={24} color="#43a047" />
          <Text style={styles.cardHeaderText}>Progres Keuangan</Text>
        </View>
        <View style={styles.cardBody}>
          <View style={[styles.cardBadge, { backgroundColor: '#43a047' }]}>
            <Text style={styles.badgeText}>APBD{'\n'}Murni</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardLabel}>Realisasi Kegiatan</Text>
            <Text style={styles.cardValue}>{formattedRealisasi}</Text>
            <View style={styles.percentageContainer}>
              <View style={styles.progressBarBackground}>
                <View 
                  style={[
                    styles.progressBarFill, 
                    { 
                      width: `${Math.min(persenRealisasiKeuangan, 100)}%`,
                      backgroundColor: '#43a047' 
                    }
                  ]} 
                />
              </View>
              <Text style={styles.percentageText}>{persenRealisasiKeuangan}%</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Card 4: Progres Fisik */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Icon name="construct" size={24} color="#e53935" />
          <Text style={styles.cardHeaderText}>Progres Fisik</Text>
        </View>
        <View style={styles.cardBody}>
          <View style={[styles.cardBadge, { backgroundColor: '#e53935' }]}>
            <Text style={styles.badgeText}>APBD{'\n'}Murni</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardLabel}>Realisasi Kegiatan Fisik</Text>
            <View style={styles.percentageContainer}>
              <View style={styles.progressBarBackground}>
                <View 
                  style={[
                    styles.progressBarFill, 
                    { 
                      width: `${Math.min(realisasiFisik, 100)}%`,
                      backgroundColor: '#e53935' 
                    }
                  ]} 
                />
              </View>
              <Text style={styles.percentageText}>{realisasiFisik}%</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={{ height: 20 }} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f7fa',
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f5f5f5',
    gap: 10,
  },
  cardHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  cardBody: {
    flexDirection: 'row',
    padding: 16,
    gap: 16,
  },
  cardBadge: {
    width: 80,
    height: 80,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 20,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
  },
  cardLabel: {
    fontSize: 13,
    color: '#666',
    marginBottom: 6,
  },
  cardValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 16,
  },
  statItem: {
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#e0e0e0',
  },
  percentageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
  },
  progressBarBackground: {
    flex: 1,
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 5,
  },
  percentageText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
    minWidth: 50,
    textAlign: 'right',
  },
})

export default AnggaranMurni;