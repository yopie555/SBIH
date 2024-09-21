import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { stateDataPerkembanganKondisiKetenagakerjaan } from '../../../state/dataPKK'
import { color } from '../../../constants/Helper'

const DetailPKK = (props) => {
  const {dataPerkembanganKondisiKetenagakerjaan} = stateDataPerkembanganKondisiKetenagakerjaan()
  return (
    <View style={{flex: 1}}>
      <View style={{ padding: 10 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center', color: 'black'  }}>{props.route.params.title}</Text>
        <Text style={{color: color.black}}>Sumber Data: <Text style={{ color: 'red' }}>BPS</Text></Text>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
  
        {
          dataPerkembanganKondisiKetenagakerjaan?.map((item, index) => {
            return (
              <View key={index} style={{ padding: 10, backgroundColor: '#c4c4c4', width: '90%', marginHorizontal: '5%', borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16, color: color.black }}>Tahun {item.tahun}</Text>
                <Text style={{color: color.black}}>Penduduk Usia Kerja : {item.penduduk_usia_kerja} Orang </Text>
                <Text style={{color: color.black}}>Angkatan Kerja : {item.angkatan_kerja} Orang </Text>
                <Text style={{color: color.black}}>Bekerja : {item.bekerja} Orang </Text>
                <Text style={{color: color.black}}>Mencari Pekerjaan : {item.mencari_pekerjaan} Orang </Text>
                <Text style={{color: color.black}}>Tingkat Partisipasi : {item.tingkat_partisipasi} Orang </Text>
                <Text style={{color: color.black}}>Tingkat Pengangguran : {item.tingkat_pengangguran} Orang </Text>
                <Text style={{color: color.black}}>Status Data : {item.status_data}</Text>
              </View>
            )
          })
        }
      </ScrollView>
    </View>
  )
}

export default DetailPKK

const styles = StyleSheet.create({})