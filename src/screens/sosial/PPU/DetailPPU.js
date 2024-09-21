import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { stateDataPersentasePendudukUsia } from '../../../state/dataPPU'
import { color } from '../../../constants/Helper'

const DetailJRTLH = (props) => {
  const {dataPersentasePendudukUsia} = stateDataPersentasePendudukUsia()
  return (
    <View style={{flex: 1}}>
      <View style={{ padding: 10 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center', color: 'black'  }}>{props.route.params.title}</Text>
        <Text style={{color: color.black}}>Sumber Data: <Text style={{ color: 'red' }}>BPS</Text></Text>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      
        {
          dataPersentasePendudukUsia?.map((item, index) => {
            return (
              <View key={index} style={{ padding: 10, backgroundColor: '#c4c4c4', width: '90%', marginHorizontal: '5%', borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16, color: color.black }}>Tahun {item.pendidikan}</Text>
                <Text style={{color: color.black}}>Laki: {item.laki} Unit </Text>
                <Text style={{color: color.black}}>Perempuan: {item.perempuan} Unit </Text>
                <Text style={{color: color.black}}>Total: {item.total} Unit </Text>
                <Text style={{color: color.black}}>Status Data : {item.status_data}</Text>
              </View>
            )
          })
        }
      </ScrollView>
    </View>
  )
}

export default DetailJRTLH

const styles = StyleSheet.create({})