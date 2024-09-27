import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { stateDataLajuInflasi } from '../../../state/dataLI'
import { color } from '../../../constants/Helper'

const DetailLI = (props) => {
  const { dataLajuInflasi } = stateDataLajuInflasi()
  return (
    <View style={{flex: 1}}>
      <View style={{ padding: 10 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center', color: 'black' }}>{props.route.params.title}</Text>
        <Text style={{color: color.black}}>Sumber Data: <Text style={{ color: 'red' }}>BPS</Text></Text>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {
          dataLajuInflasi.map((item, index) => {
            return (
              <View key={index} style={{ padding: 10, backgroundColor: '#c4c4c4', width: '90%', marginHorizontal: '5%', borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16, color: color.black }}>Tahun {item.tahun}</Text>
                <Text style={{color: color.black}}>Umum : {item.umum} Orang</Text>
                <Text style={{color: color.black}}>Bahan Makanan : {item.bahan_makanan} %</Text>
                <Text style={{color: color.black}}>Makanan Jadi : {item.makanan_jadi} %</Text>
                <Text style={{color: color.black}}>Perumahan : {item.perumahan} %</Text>
                <Text style={{color: color.black}}>Sandang : {item.sandang} %</Text>
                <Text style={{color: color.black}}>Kesehatan : {item.kesehatan} %</Text>
                <Text style={{color: color.black}}>Pendidikan : {item.pendidikan} %</Text>
                <Text style={{color: color.black}}>Transportasi : {item.transportasi} %</Text>
                <Text style={{color: color.black}}>Status Data : {item.status_data}</Text>
              </View>
            )
          })
        }
      </ScrollView>
    </View>
  )
}

export default DetailLI

const styles = StyleSheet.create({})