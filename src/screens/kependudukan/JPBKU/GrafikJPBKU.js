import { View, Text, Dimensions, Modal, TouchableOpacity } from 'react-native'
import React from 'react'
import {
  LineChart,
} from "react-native-chart-kit";
import { stateDataJumlahPendudukBerdasarkanKelompokUmur } from '../../../state/dataJPBKU';
import { color } from '../../../constants/Helper';

const GrafikPP = (props) => {
  const { dataJumlahPendudukBerdasarkanKelompokUmur } = stateDataJumlahPendudukBerdasarkanKelompokUmur()
  const [dataFiltered, setDataFiltered] = React.useState(dataJumlahPendudukBerdasarkanKelompokUmur.filter(item => item.kelompok_umur ==  1))
  const [title, setTitle] = React.useState("0-4 Tahun")
  const [modalVisible, setModalVisible] = React.useState(false)
  return (
    <View style={{flex: 1 }}>
      <View style={{ padding: 10 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center', color: 'black'  }}>{props.route.params.title}</Text>
        <Text style={{color: color.black}}>Sumber Data: <Text style={{ color: 'red' }}>BPS</Text></Text>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          <Text style={{fontWeight: 'bold', fontSize: 20, padding: 20}}>Pilih Kelompok Umur :</Text>
          < TouchableOpacity  onPress={() => { setDataFiltered(dataJumlahPendudukBerdasarkanKelompokUmur.filter(item => item.kelompok_umur ==  1)), setTitle('0-4 Tahun'), setModalVisible(false) }}>
            <Text style={{padding: 10, backgroundColor: "#d5d5d5", fontSize: 18, fontWeight: 'bold'}}>0-4 Tahun</Text>
          </TouchableOpacity>
          < TouchableOpacity  onPress={() => { setDataFiltered(dataJumlahPendudukBerdasarkanKelompokUmur.filter(item => item.kelompok_umur ==  2)), setTitle('5-9 Tahun'), setModalVisible(false) }}>
            <Text style={{padding: 10, backgroundColor: "#d5d5d5", fontSize: 18, fontWeight: 'bold'}}>5-9 Tahun</Text>
          </TouchableOpacity>
          < TouchableOpacity  onPress={() => { setDataFiltered(dataJumlahPendudukBerdasarkanKelompokUmur.filter(item => item.kelompok_umur ==  3)), setTitle('10-14 Tahun'), setModalVisible(false) }}>
            <Text style={{padding: 10, backgroundColor: "#d5d5d5", fontSize: 18, fontWeight: 'bold'}}>10-14 Tahun</Text>
          </TouchableOpacity>
          < TouchableOpacity  onPress={() => { setDataFiltered(dataJumlahPendudukBerdasarkanKelompokUmur.filter(item => item.kelompok_umur ==  4)), setTitle('15-19 Tahun'), setModalVisible(false) }}>
            <Text style={{padding: 10, backgroundColor: "#d5d5d5", fontSize: 18, fontWeight: 'bold'}}>15-19 Tahun</Text>
          </TouchableOpacity>
          < TouchableOpacity  onPress={() => { setDataFiltered(dataJumlahPendudukBerdasarkanKelompokUmur.filter(item => item.kelompok_umur ==  5)), setTitle('20-24 Tahun'), setModalVisible(false) }}>
            <Text style={{padding: 10, backgroundColor: "#d5d5d5", fontSize: 18, fontWeight: 'bold'}}>20-24 Tahun</Text>
          </TouchableOpacity>
          < TouchableOpacity  onPress={() => { setDataFiltered(dataJumlahPendudukBerdasarkanKelompokUmur.filter(item => item.kelompok_umur ==  6)), setTitle('25-29 Tahun'), setModalVisible(false) }}>
            <Text style={{padding: 10, backgroundColor: "#d5d5d5", fontSize: 18, fontWeight: 'bold'}}>25-29 Tahun</Text>
          </TouchableOpacity>
          < TouchableOpacity  onPress={() => { setDataFiltered(dataJumlahPendudukBerdasarkanKelompokUmur.filter(item => item.kelompok_umur ==  7)), setTitle('30-34 Tahun'), setModalVisible(false) }}>
            <Text style={{padding: 10, backgroundColor: "#d5d5d5", fontSize: 18, fontWeight: 'bold'}}>30-34 Tahun</Text>
          </TouchableOpacity>
          < TouchableOpacity  onPress={() => { setDataFiltered(dataJumlahPendudukBerdasarkanKelompokUmur.filter(item => item.kelompok_umur ==  8)), setTitle('35-39 Tahun'), setModalVisible(false) }}>
            <Text style={{padding: 10, backgroundColor: "#d5d5d5", fontSize: 18, fontWeight: 'bold'}}>35-39 Tahun</Text>
          </TouchableOpacity>
          < TouchableOpacity  onPress={() => { setDataFiltered(dataJumlahPendudukBerdasarkanKelompokUmur.filter(item => item.kelompok_umur ==  9)), setTitle('40-44 Tahun'), setModalVisible(false) }}>
            <Text style={{padding: 10, backgroundColor: "#d5d5d5", fontSize: 18, fontWeight: 'bold'}}>40-44 Tahun</Text>
          </TouchableOpacity>
          < TouchableOpacity  onPress={() => { setDataFiltered(dataJumlahPendudukBerdasarkanKelompokUmur.filter(item => item.kelompok_umur ==  10)), setTitle('45-49 Tahun'), setModalVisible(false) }}>
            <Text style={{padding: 10, backgroundColor: "#d5d5d5", fontSize: 18, fontWeight: 'bold'}}>45-49 Tahun</Text>
          </TouchableOpacity>
          < TouchableOpacity  onPress={() => { setDataFiltered(dataJumlahPendudukBerdasarkanKelompokUmur.filter(item => item.kelompok_umur ==  11)), setTitle('50-54 Tahun'), setModalVisible(false) }}>
            <Text style={{padding: 10, backgroundColor: "#d5d5d5", fontSize: 18, fontWeight: 'bold'}}>50-54 Tahun</Text>
          </TouchableOpacity>
          < TouchableOpacity  onPress={() => { setDataFiltered(dataJumlahPendudukBerdasarkanKelompokUmur.filter(item => item.kelompok_umur ==  12)), setTitle('55-59 Tahun'), setModalVisible(false) }}>
            <Text style={{padding: 10, backgroundColor: "#d5d5d5", fontSize: 18, fontWeight: 'bold'}}>55-59 Tahun</Text>
          </TouchableOpacity>
          < TouchableOpacity  onPress={() => { setDataFiltered(dataJumlahPendudukBerdasarkanKelompokUmur.filter(item => item.kelompok_umur ==  13)), setTitle('60-64 Tahun'), setModalVisible(false) }}>
            <Text style={{padding: 10, backgroundColor: "#d5d5d5", fontSize: 18, fontWeight: 'bold'}}>60-64 Tahun</Text>
          </TouchableOpacity>
          < TouchableOpacity  onPress={() => { setDataFiltered(dataJumlahPendudukBerdasarkanKelompokUmur.filter(item => item.kelompok_umur ==  14)), setTitle('65-69 Tahun'), setModalVisible(false) }}>
            <Text style={{padding: 10, backgroundColor: "#d5d5d5", fontSize: 18, fontWeight: 'bold'}}>65-69 Tahun</Text>
          </TouchableOpacity>
          < TouchableOpacity  onPress={() => { setDataFiltered(dataJumlahPendudukBerdasarkanKelompokUmur.filter(item => item.kelompok_umur ==  15)), setTitle('70-74 Tahun'), setModalVisible(false) }}>  
            <Text style={{padding: 10, backgroundColor: "#d5d5d5", fontSize: 18, fontWeight: 'bold'}}>70-74 Tahun</Text>
          </TouchableOpacity>
          < TouchableOpacity  onPress={() => { setDataFiltered(dataJumlahPendudukBerdasarkanKelompokUmur.filter(item => item.kelompok_umur ==  16)), setTitle('75+ Tahun'), setModalVisible(false) }}>
            <Text style={{padding: 10, backgroundColor: "#d5d5d5", fontSize: 18, fontWeight: 'bold'}}>75-79 Tahun</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={{alignItems: 'center', justifyContent: 'center', paddingVertical: 10, backgroundColor: '#d5d5d5'}}>
        <Text style={{ color: color.black, fontWeight: 'bold', fontSize: 18 }}>{title} </Text>
      </TouchableOpacity>
  <LineChart
    data={{
      labels: dataFiltered && dataFiltered.map(item => item.tahun),
      datasets: [
        {
          data: dataFiltered && dataFiltered.map(item => item.jumlah)
        }
      ]
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