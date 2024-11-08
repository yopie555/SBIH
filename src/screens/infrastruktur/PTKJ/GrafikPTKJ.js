import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import {
  LineChart,
} from "react-native-chart-kit";
import { stateDataPersentaseTingkatKemantapanJalan } from '../../../state/dataPTKJ';
import { color } from '../../../constants/Helper';

const GrafikPTKJ = (props) => {
  const data = props.route.params.data
  const {dataPersentaseTingkatKemantapanJalan} = stateDataPersentaseTingkatKemantapanJalan()
  //mapping data tahun ganjil
  // const dataTahunGanjil = dataPanjangJalanDibangun.filter((item, index) => index % 2 !== 0)
  // const dataPresentase = dataTahunGanjil.map(item => item.kemantapan_jalan)
  return (
    <View style={{flex: 1 }}>
      <View style={{ padding: 10 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center', color: 'black'  }}>{props.route.params.title}</Text>
        <Text style={{color: color.black}}>Sumber Data: <Text style={{ color: 'red' }}>BPS</Text></Text>
      </View>
  <LineChart
    data={{
      labels: dataPersentaseTingkatKemantapanJalan && dataPersentaseTingkatKemantapanJalan.map(item => item.tahun),
      datasets: [
        {
          data: dataPersentaseTingkatKemantapanJalan && dataPersentaseTingkatKemantapanJalan.map(item => item.kemantapan_jalan)
        }
      ]
    }}
    width={Dimensions.get("window").width} // from react-native
    height={300}
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: color.graph1,
      backgroundGradientFrom: color.graph2,
      backgroundGradientTo: color.graph3,
      decimalPlaces: 1, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16,
        paddingvertical: 20,
        padding: 10
      },
      propsForLabels: {
        fontSize: 10
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: color.graph4
      },
      propsForBackgroundLines: {
        stroke: 'blue'
      },
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

export default GrafikPTKJ