import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { stateDataPMA } from '../../../state/dataPMA'
import { color } from '../../../constants/Helper'

const DetailPE = (props) => {
  const {dataPMA} = stateDataPMA()

  //convert data to rupiah format example Rp. 22.237.228.437.353.- 
  const convertToRupiah = (angka) => {
    var rupiah = '';
    var angkarev = angka.toString().split('').reverse().join('');
    for (var i = 0; i < angkarev.length; i++)
      if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';
    return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('');
  }
  return (
    <View style={{flex: 1}}>
      <View style={{ padding: 10 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center', color: 'black'  }}>{props.route.params.title}</Text>
        <Text style={{color: color.black}}>Sumber Data: <Text style={{ color: 'red' }}>DPMPTS Kabupaten Bintan</Text></Text>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {
          dataPMA?.map((item, index) => {
            return (
              <View key={index} style={{ padding: 10, backgroundColor: '#c4c4c4', width: '90%', marginHorizontal: '5%', borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16, color: color.black }}>Tahun {item.tahun}</Text>
                <Text style={{color: color.black}}>Jumlah : {convertToRupiah(item.jumlah)}.-</Text>
                <Text style={{color: color.black}}>Status Data : {item.status_data}</Text>
              </View>
            )
          })
        }
      </ScrollView>
    </View>
  )
}

export default DetailPE

const styles = StyleSheet.create({})