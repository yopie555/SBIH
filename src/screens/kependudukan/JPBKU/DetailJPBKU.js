import { StyleSheet, Text, View, ScrollView, Modal, TouchableOpacity } from 'react-native'
import React from 'react'
import {stateDataJumlahPendudukBerdasarkanKelompokUmur} from '../../../state/dataJPBKU'
import { color } from '../../../constants/Helper'

const DetailPP = (props) => {
  const { dataJumlahPendudukBerdasarkanKelompokUmur } = stateDataJumlahPendudukBerdasarkanKelompokUmur()
  const [dataFiltered, setDataFiltered] = React.useState(dataJumlahPendudukBerdasarkanKelompokUmur.filter(item => item.kelompok_umur ==  1))
  const [title, setTitle] = React.useState("0-4 Tahun")
  const [modalVisible, setModalVisible] = React.useState(false)
  
  return (
    <View style={{flex: 1}}>
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
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {
          dataFiltered.map((item, index) => {
            return (
              <View key={index} style={{ padding: 10, backgroundColor: '#c4c4c4', width: '90%', marginHorizontal: '5%', borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16, color: color.black }}>Tahun {item.tahun}</Text>
                <Text style={{color: color.black}}>Jumlah : {item.jumlah} </Text>
                <Text style={{color: color.black}}>Status Data : {item.status_data}</Text>
              </View>
            )
          })
        }
      </ScrollView>
    </View>
  )
}

export default DetailPP

const styles = StyleSheet.create({})