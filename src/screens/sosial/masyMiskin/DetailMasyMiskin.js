import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { stateDataPenduduk } from '../../../state/dataPenduduk'

const DetailMasyMiskin = (props) => {
  const {dataPenduduk} = stateDataPenduduk()
  
  return (
    <View style={{flex: 1}}>
      <View style={{ padding: 10 }}>
        {/* <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center', color: 'black'  }}>{props.route.params.title}</Text> */}
        <Text>Sumber Data: <Text style={{ color: 'red' }}>BPS</Text></Text>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
       
        {
          dataPenduduk?.map((item, index) => {
            return (
              <View key={index} style={{ padding: 10, backgroundColor: '#c4c4c4', width: '90%', marginHorizontal: '5%', borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Tahun {item.tahun}</Text>
                <Text>Persentase : {item.presentase} %</Text>
                <Text>Status Data : {item.status_data}</Text>
              </View>
            )
          })
        }
      </ScrollView>
    </View>
  )
}

export default DetailMasyMiskin

const styles = StyleSheet.create({})