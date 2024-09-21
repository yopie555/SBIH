import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { stateDataAngkaPartisipasiKasar } from '../../../state/dataAPK'
import { color } from '../../../constants/Helper'
import { List } from 'react-native-paper';

const DetailAPK = (props) => {
  const { dataAngkaPartisipasiKasar } = stateDataAngkaPartisipasiKasar()
  const [expanded, setExpanded] = React.useState(true);
  const handlePress = () => setExpanded(!expanded);
  const [dataFiltered, setDataFiltered] = React.useState(dataAngkaPartisipasiKasar.filter(item => item.no === 1))
  const [titleList, setTitleList] = React.useState('SD')
  
  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 10 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center', color: 'black' }}>{props?.route?.params?.title}</Text>
        <Text style={{ color: color.black }}>Sumber Data: <Text style={{ color: 'red' }}>BPS</Text></Text>
      </View>
      <List.Section>
        <List.Accordion
          title={titleList}>
          <List.Item title="SD"
            //ketika onpress di klik maka akan menampilkan data SD 7-12 TAHUN ke dalam list, dan menutup list yang lain
            onPress={() => {setDataFiltered(dataAngkaPartisipasiKasar.filter(item => item.no === 1)),setTitleList('SD')}}
          />
          <List.Item title="SMP" 
            //ketika onpress di klik maka akan menampilkan data SMP 13-15 TAHUN ke dalam list
            onPress={() => {setDataFiltered(dataAngkaPartisipasiKasar.filter(item => item.no === 2)),setTitleList('SMP')}}
          />
          <List.Item title="SMA" 
            //ketika onpress di klik maka akan menampilkan data SMA 16-18 TAHUN ke dalam list
            onPress={() => {setDataFiltered(dataAngkaPartisipasiKasar.filter(item => item.no === 3)),setTitleList('SMA')}}
          />
        </List.Accordion>
      </List.Section>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

        {
          dataFiltered?.map((item, index) => {
            return (
              <View key={index} style={{ padding: 10, backgroundColor: '#c4c4c4', width: '90%', marginHorizontal: '5%', borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16, color: color.black }}>Tahun {item.tahun}</Text>
                <Text style={{ color: color.black }}>APK : {item.apk} </Text>
                <Text style={{ color: color.black }}>Status Data : {item.status_data}</Text>
              </View>
            )
          })
        }
      </ScrollView>
    </View>
  )
}

export default DetailAPK

const styles = StyleSheet.create({})