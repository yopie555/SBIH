import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import {
  LineChart,
} from "react-native-chart-kit";
import { stateDataCapaianProduksiKomoditiUnggulanPerkebunan } from '../../../state/dataCPKUP';
import { color } from '../../../constants/Helper';

const GrafikAHH = (props) => {
  const {dataCapaianProduksiKomoditiUnggulanPerkebunan} = stateDataCapaianProduksiKomoditiUnggulanPerkebunan()
  //mapping data tahun ganjil
  // const dataTahunGanjil = dataAngkaHarapanHidup.filter((item, index) => index % 2 == 0)
  // const dataPresentase = dataTahunGanjil.map(item => item.ahh) 
  return (
    <View style={{flex: 1 }}>
      <View style={{ padding: 10 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center', color: 'black'  }}>{props.route.params.title}</Text>
        <Text style={{color: color.black}}>Sumber Data: <Text style={{ color: 'red' }}>BPS</Text></Text>
      </View>
  <LineChart
    data={{
      labels: dataCapaianProduksiKomoditiUnggulanPerkebunan && dataCapaianProduksiKomoditiUnggulanPerkebunan.map(item => item.tahun),
      datasets: [
        {
          data: dataCapaianProduksiKomoditiUnggulanPerkebunan && dataCapaianProduksiKomoditiUnggulanPerkebunan.map(item => item.jumlah)
        }
      ]
    }}
    width={Dimensions.get("window").width} // from react-native
    height={300}
    yAxisInterval={1} // optional, defaults to 1
    // fromZero={true}
    fromNumber={68.6}
    verticalLabelRotation={50}
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

export default GrafikAHH