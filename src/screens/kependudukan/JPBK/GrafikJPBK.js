import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import {
  LineChart,
} from "react-native-chart-kit";
import { stateDataJumlahPendudukBerdasarkanKecamatan } from '../../../state/dataJBPK';
import { color } from '../../../constants/Helper';

const GrafikPP = (props) => {
  const data = props.route.params.data
  const { dataJumlahPendudukBerdasarkanKecamatan } = stateDataJumlahPendudukBerdasarkanKecamatan()
  //mapping data tahun ganjil
  const dataPresentaseLaki = dataJumlahPendudukBerdasarkanKecamatan.map(item => item.laki)
  const dataPresentasePerempuan = dataJumlahPendudukBerdasarkanKecamatan.map(item => item.perempuan)
  return (
    <View style={{flex: 1 }}>
      <View style={{ padding: 10 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center', color: 'black'  }}>{props.route.params.title}</Text>
        <Text style={{color: color.black}}>Sumber Data: <Text style={{ color: 'red' }}>BPS</Text></Text>
      </View>
  <LineChart
    data={{
      labels: dataJumlahPendudukBerdasarkanKecamatan && dataJumlahPendudukBerdasarkanKecamatan.map(item => item.kecamatan),
      datasets: [
        {
          data: dataPresentaseLaki,
          color: (opacity = 1) => `blue`, // optional
          strokeWidth: 2 // optional
        },
        {
          data: dataPresentasePerempuan,
          color: (opacity = 1) => `pink`, // optional
          strokeWidth: 2 // optional
        }
      ],
      legend: ["Laki-laki", "Perempuan"]
    }}
    width={Dimensions.get("window").width} // from react-native
    height={450}
    verticalLabelRotation={50}
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
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
        stroke: "#ffa726"
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

export default GrafikPP