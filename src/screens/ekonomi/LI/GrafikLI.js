import { View, Text, Dimensions, Modal, TouchableOpacity } from 'react-native'
import React from 'react'
import {
  LineChart,
} from "react-native-chart-kit";
import { stateDataLajuInflasi } from '../../../state/dataLI';
import { color } from '../../../constants/Helper';
const GrafikLI = (props) => {
  const { dataLajuInflasi } = stateDataLajuInflasi()
  const [dataFiltered, setDataFiltered] = React.useState(dataLajuInflasi.map(item => { return { data: item.umum, tahun: item.tahun } }))
  const [titleList, setTitleList] = React.useState('Umum')
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 10 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center', color: 'black' }}>{props.route.params.title}</Text>
        <Text style={{ color: color.black }}>Sumber Data: <Text style={{ color: 'red' }}>BPS</Text></Text>
      </View>
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          <Text style={{fontWeight: 'bold', fontSize: 20, padding: 20}}>Pilih Kategori :</Text>
          < TouchableOpacity  onPress={() => { setDataFiltered(dataLajuInflasi.map(item => { return { data: item.umum, tahun: item.tahun } })), setTitleList('Umum'), setModalVisible(false) }}>
            <Text style={{padding: 10, backgroundColor: "#d5d5d5", fontSize: 18, fontWeight: 'bold'}}>Umum</Text>
          </TouchableOpacity>
          < TouchableOpacity  onPress={() => { setDataFiltered(dataLajuInflasi.map(item => { return { data: item.bahan_makanan, tahun: item.tahun } })), setTitleList('Bahan Makanan'), setModalVisible(false) }}>
            <Text style={{padding: 10, backgroundColor: "#d5d5d5", fontSize: 18, fontWeight: 'bold'}}>Bahan Makanan</Text>
          </TouchableOpacity>
          < TouchableOpacity  onPress={() => { setDataFiltered(dataLajuInflasi.map(item => { return { data: item.makanan_jadi, tahun: item.tahun } })), setTitleList('Makanan Jadi'), setModalVisible(false) }}>
            <Text style={{padding: 10, backgroundColor: "#d5d5d5", fontSize: 18, fontWeight: 'bold'}}>Makanan Jadi</Text>
          </TouchableOpacity>
          < TouchableOpacity  onPress={() => { setDataFiltered(dataLajuInflasi.map(item => { return { data: item.perumahan, tahun: item.tahun } })), setTitleList('Perumahan'), setModalVisible(false) }}>
            <Text style={{padding: 10, backgroundColor: "#d5d5d5", fontSize: 18, fontWeight: 'bold'}}>Perumahan</Text>
          </TouchableOpacity>
          < TouchableOpacity  onPress={() => { setDataFiltered(dataLajuInflasi.map(item => { return { data: item.sandang, tahun: item.tahun } })), setTitleList('Sandang'), setModalVisible(false) }}>
            <Text style={{padding: 10, backgroundColor: "#d5d5d5", fontSize: 18, fontWeight: 'bold'}}>Sandang</Text>
          </TouchableOpacity>
          < TouchableOpacity  onPress={() => { setDataFiltered(dataLajuInflasi.map(item => { return { data: item.kesehatan, tahun: item.tahun } })), setTitleList('Kesehatan'), setModalVisible(false) }}>
            <Text style={{padding: 10, backgroundColor: "#d5d5d5", fontSize: 18, fontWeight: 'bold'}}>Kesehatan</Text>
          </TouchableOpacity>
          < TouchableOpacity  onPress={() => { setDataFiltered(dataLajuInflasi.map(item => { return { data: item.pendidikan, tahun: item.tahun } })), setTitleList('Pendidikan'), setModalVisible(false) }}>
            <Text style={{padding: 10, backgroundColor: "#d5d5d5", fontSize: 18, fontWeight: 'bold'}}>Pendidikan</Text>
          </TouchableOpacity>
          < TouchableOpacity  onPress={() => { setDataFiltered(dataLajuInflasi.map(item => { return { data: item.transportasi, tahun: item.tahun } })), setTitleList('Transportasi'), setModalVisible(false) }}>
            <Text style={{padding: 10, backgroundColor: "#d5d5d5", fontSize: 18, fontWeight: 'bold'}}>Transportasi</Text>
          </TouchableOpacity>
        </View>
      </Modal> */}
      {/* <TouchableOpacity onPress={() => setModalVisible(true)} style={{alignItems: 'center', justifyContent: 'center', paddingVertical: 10, backgroundColor: '#d5d5d5'}}>
        <Text style={{ color: color.black, fontWeight: 'bold', fontSize: 18 }}>{titleList} </Text>
      </TouchableOpacity> */}
      <LineChart
        data={{
          labels: dataFiltered && dataFiltered.map(item => item.tahun),
          datasets: [
            {
              data: dataFiltered && dataFiltered.map(item => item.data)
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

export default GrafikLI