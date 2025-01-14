import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { stateDataAngkaHarapanLamaSekolah } from '../../../state/dataHLS'
import { color } from '../../../constants/Helper'

const DetailHLS = (props) => {
  const {dataAngkaHarapanLamaSekolah} = stateDataAngkaHarapanLamaSekolah()
  return (
    <View style={{flex: 1}}>
      <View style={{ padding: 10 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center', color: 'black'  }}>{props.route.params.title}</Text>
        <Text style={{color: color.black}}>Sumber Data: <Text style={{ color: 'red' }}>BPS</Text></Text>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      
        {
          dataAngkaHarapanLamaSekolah?.map((item, index) => {
            return (
              <View key={index} style={{ padding: 10, backgroundColor: '#c4c4c4', width: '90%', marginHorizontal: '5%', borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16, color: color.black }}>Tahun {item.tahun}</Text>
                <Text style={{color: color.black}}>Tahun : {item.hls} </Text>
                <Text style={{color: color.black}}>Status Data : {item.status_data}</Text>
              </View>
            )
          })
        }
      </ScrollView>
    </View>
  )
}

export default DetailHLS

const styles = StyleSheet.create({})