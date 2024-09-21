import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import {
  LineChart,
} from "react-native-chart-kit";
import { stateDataPersentasePendudukUsia } from '../../../state/dataPPU';

const GrafikHLS = (props) => {
  const {dataPersentasePendudukUsia} = stateDataPersentasePendudukUsia()
  return (
    <View style={{flex: 1 }}>
      <View style={{ padding: 10 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center', color: 'black'  }}>{props.route.params.title}</Text>
        <Text style={{color:'black'}}>Sumber Data: <Text style={{ color: 'red' }}>BPS</Text></Text>
      </View>
  <LineChart
    data={{
      labels: dataPersentasePendudukUsia.map(item => item.pendidikan),
      datasets: [
        {
          data: dataPersentasePendudukUsia.map(item => item.laki),
          strokeWidth: 2,
          color: (opacity = 1) => `blue`, // optional
        },
        {
          data: dataPersentasePendudukUsia.map(item => item.perempuan),
          strokeWidth: 2,
          color: (opacity = 1) => `pink`, // optional
        }
      ]
    }}
    width={Dimensions.get("window").width} // from react-native
    height={300}
    yAxisInterval={1} // optional, defaults to 1
    fromZero={true}
    verticalLabelRotation={20}
    // fromNumber={5}
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 1, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16,
        paddingvertical: 20,
      },
      propsForLabels: {
        fontSize: 14
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
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

export default GrafikHLS