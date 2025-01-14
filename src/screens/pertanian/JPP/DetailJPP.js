import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { stateDataJumlahProduksiPeternakan } from '../../../state/dataJPP'
import { color } from '../../../constants/Helper'

const DetailAHH = (props) => {
  const {dataJumlahProduksiPeternakan} = stateDataJumlahProduksiPeternakan()
  return (
    <View style={{flex: 1}}>
      <View style={{ padding: 10 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center', color: 'black'  }}>{props.route.params.title}</Text>
        <Text style={{color: color.black}}>Sumber Data: <Text style={{ color: 'red' }}>Dinas Ketahanan Pangan dan Pertanian kabupaten Bintan</Text></Text>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
  
        {
          dataJumlahProduksiPeternakan?.map((item, index) => {
            return (
              <View key={index} style={{ padding: 10, backgroundColor: '#c4c4c4', width: '90%', marginHorizontal: '5%', borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16, color: color.black }}>Tahun {item.tahun}</Text>
                <Text style={{color: color.black}}>Jumlah : {item.jumlah}  </Text>
                <Text style={{color: color.black}}>Status Data : {item.status_data}</Text>
              </View>
            )
          })
        }
      </ScrollView>
    </View>
  )
}

export default DetailAHH

const styles = StyleSheet.create({})