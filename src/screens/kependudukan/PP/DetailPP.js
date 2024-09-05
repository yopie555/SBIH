import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'

const DetailIPM = (props) => {
  return (
    <View style={{flex: 1}}>
      <View style={{ padding: 10 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>{props.route.params.title}</Text>
        <Text>Sumber Data: <Text style={{ color: 'red' }}>BPS</Text></Text>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {
          props.route.params.data.map((item, index) => {
            return (
              <View key={index} style={{ padding: 10, backgroundColor: '#c4c4c4', width: '90%', marginHorizontal: '5%', borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Tahun {item.tahun}</Text>
                <Text>Persentase : {item.laju} %</Text>
                <Text>Status Data : {item.status_data}</Text>
              </View>
            )
          })
        }
      </ScrollView>
    </View>
  )
}

export default DetailIPM

const styles = StyleSheet.create({})