import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import {
  LineChart,
} from "react-native-chart-kit";
import { stateDataKunjunganWisata } from '../../../state/dataKW';
import { color } from '../../../constants/Helper';

const GrafikKW = (props) => {
  const data = props.route.params.data
  const { dataKunjunganWisata } = stateDataKunjunganWisata()
  return (
    <View style={{flex: 1 }}>
      <View style={{ padding: 10 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center', color: 'black'  }}>{props.route.params.title}</Text>
        <Text style={{color: color.black}}>Sumber Data: <Text style={{ color: 'red' }}>BPS</Text></Text>
      </View>
  <LineChart
    data={{
      labels: dataKunjunganWisata.map(item => item.tahun),
      datasets: [
        {
          data: dataKunjunganWisata.map(item => item.jumlah)
        }
      ]
    }}
    width={Dimensions.get("window").width} // from react-native
    height={300}
    verticalLabelRotation={50}
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

export default GrafikKW