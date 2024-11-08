import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import {
  LineChart,
} from "react-native-chart-kit";
import { stateDataAngkaPartisipasiKasar } from '../../../state/dataAPK'
import { color } from '../../../constants/Helper';
import { List } from 'react-native-paper';

const GrafikPKK = (props) => {
  const { dataAngkaPartisipasiKasar } = stateDataAngkaPartisipasiKasar()
  const [expanded, setExpanded] = React.useState(true);
  const handlePress = () => setExpanded(!expanded);
  const [dataFiltered, setDataFiltered] = React.useState(dataAngkaPartisipasiKasar.filter(item => item.no === 1))
  //mapping data tahun ganjil
  const dataTahunGanjil = dataFiltered.filter((item, index) => index % 2 == 0)
  const [titleList, setTitleList] = React.useState('SD')

  return (
    <View style={{flex: 1 }}>
      <View style={{ padding: 10 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center', color: 'black'  }}>{props.route.params.title}</Text>
        <Text style={{color: color.black}}>Sumber Data: <Text style={{ color: 'red' }}>BPS</Text></Text>
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
  <LineChart
    data={{
      labels: dataTahunGanjil && dataTahunGanjil.map(item => item.tahun),
      datasets: [
        {
          data: dataTahunGanjil && dataTahunGanjil.map(item => item.apk),
        },
      ]
    }}
    width={Dimensions.get("window").width} // from react-native
    height={300}
    yAxisInterval={1} // optional, defaults to 1
    fromZero={true}
    // fromNumber={9}
    chartConfig={{
      backgroundColor: color.graph1,
      backgroundGradientFrom: color.graph2,
      backgroundGradientTo: color.graph3,
      decimalPlaces: 1, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16,
        paddingvertical: 20
      },
      propsForLabels: {
        fontSize: 14
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: color.graph4
      },
      propsForBackgroundLines: {
        stroke: 'blue'
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16,
      paddingvertical: 10
    }}
  />
    </View>
  )
}

export default GrafikPKK