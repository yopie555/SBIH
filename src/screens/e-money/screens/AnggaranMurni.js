import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { stateDataAnggaran } from '../../../state/dataAnggaran';

const AnggaranMurni = ({ route, navigation }) => {
  const { dataAnggaran } = stateDataAnggaran();
  const data = dataAnggaran?.statistik1_murni; // Access params safely
  
  useFocusEffect(
    React.useCallback(() => {
    }, [data])
  );

  if (!data) {
    return <Text>Loading data...</Text>; // Display loading state if data is null
  }

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(number);
  };

  const paguDana = data?.PaguDana1;
  const formattedJumlahProgram1 = formatRupiah(paguDana);

  const realisasi = data?.RealisasiKeuangan1;
  const formattedRealisasi = formatRupiah(realisasi);

  return (
    <View style={styles.container}>
      <View style={styles.cards}>
        <Text style={{ color: 'gold', marginLeft: 25, fontSize: 16, marginVertical: 5 }}>APBD Murni</Text>
        <View style={styles.insideCard}>
          <Text style={{ backgroundColor: '#0459de', padding: 5, color: '#fff', width: "35%", paddingLeft: 10 }}>APBD {"\n"}Murni</Text>
          <View style={{ paddingLeft: 10 }}>
            <Text style={{ color: 'grey' }}>Total Pagu APBD</Text>
            <Text style={{ color: '#fff', fontSize: 16 }}>{formattedJumlahProgram1}</Text>
          </View>
        </View>
      </View>
      <View style={styles.cards2}>
        <Text style={{ color: 'gold', marginLeft: 25, fontSize: 16, marginVertical: 5 }}>Program dan Kegiatan</Text>
        <View style={styles.insideCard}>
          <Text style={{ backgroundColor: '#b400e6', padding: 5, color: '#fff', width: "35%", paddingLeft: 10, textAlignVertical: 'center' }}>APBD {"\n"}Murni</Text>
          <View style={{ paddingLeft: 10 }}>
            <Text style={{ color: 'grey' }}>Jumlah Program dan Kegiatan</Text>
            <Text style={{ color: '#fff' }}>Program : {data?.JumlahProgram1}</Text>
            <Text style={{ color: '#fff' }}>Kegiatan : {data?.JumlahKegiatan1}</Text>
          </View>
        </View>
      </View>
      <View style={styles.cards3}>
        <Text style={{ color: 'gold', marginLeft: 25, fontSize: 16, marginVertical: 5 }}>Progres Keuangan</Text>
        <View style={styles.insideCard}>
          <Text style={{ backgroundColor: '#06c92a', padding: 5, color: '#fff', width: "35%", paddingLeft: 10, textAlignVertical: 'center' }}>APBD {"\n"}Murni</Text>
          <View style={{ paddingLeft: 10 }}>
            <Text style={{ color: 'grey' }}>Realisasi Kegiatan</Text>
            <Text style={{ color: '#fff' }}>{formattedRealisasi}</Text>
            <Text style={{ color: '#fff' }}>({data?.PersenRealisasiKeuangan1}%)</Text>
          </View>
        </View>
      </View>
      <View style={styles.cards4}>
        <Text style={{ color: 'gold', marginLeft: 25, fontSize: 16, marginVertical: 5 }}>Program Fisik</Text>
        <View style={styles.insideCard}>
          <Text style={{ backgroundColor: '#b30021', padding: 5, color: '#fff', width: "35%", paddingLeft: 10, textAlignVertical: 'center' }}>APBD {"\n"}Murni</Text>
          <View style={{ paddingLeft: 10 }}>
            <Text style={{ color: 'grey' }}>Realisasi Kegiatan Fisik</Text>
            <Text style={{ color: '#fff' }}>({data?.RealisasiFisik1}%)</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  cards: {
    paddingVertical: 10,
    backgroundColor: '#011940',
    borderRadius: 10,
    marginVertical: 5,
    width: '100%',
    height: 120,
  },
  cards2: {
    paddingVertical: 10,
    backgroundColor: '#400152',
    borderRadius: 10,
    marginVertical: 5,
    width: '100%',
    height: 120,
  },
  cards3: {
    paddingVertical: 10,
    backgroundColor: '#015210',
    borderRadius: 10,
    marginVertical: 5,
    width: '100%',
    height: 120,
  },
  cards4: {
    paddingVertical: 10,
    backgroundColor: '#590010',
    borderRadius: 10,
    marginVertical: 5,
    width: '100%',
    height: 120,
  },
  insideCard: {
    width: '90%',
    borderRadius: 10,
    marginVertical: 5,
    flexDirection: 'row',
  },
})

export default AnggaranMurni;
