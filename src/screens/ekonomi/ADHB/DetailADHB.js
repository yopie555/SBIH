import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Modal,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { useMutation } from 'react-query';
import axios from 'axios';
import CategoryStore from '../../../components/CategoryStore';

// Import constants  
import { color } from '../../../constants/Helper';
import { stateDataAtasDasarHargaBerlaku } from '../../../state/dataADHB';

const DetailADHB = (props) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(1);  
  const dataAtasDasarHargaBerlaku = stateDataAtasDasarHargaBerlaku();
  const dataRender = dataAtasDasarHargaBerlaku?.dataAtasDasarHargaBerlaku.filter(item => item.id === selectedCategoryId);
  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 10 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center', color: 'black' }}>{props.route.params.title}</Text>
        <Text style={{ color: color.black }}>Sumber Data: <Text style={{ color: 'red' }}>BPS</Text></Text>
      </View>
    
      <CategoryStore 
        onCategorySelect={(id) => {  
          setSelectedCategoryId(id);  
        }} 
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {
          dataRender?.map((item, index) => {
            return (
              <View key={index} >
                <View style={{ padding: 10, backgroundColor: '#c4c4c4', width: '90%', marginHorizontal: '5%', borderRadius: 10, marginVertical: 5 }}>
                  <Text style={{ color: color.black }}>Tahun {item?.tahun}</Text>
                  <Text style={{ color: color.black }}>Uraian {item?.uraian}</Text>
                  <Text style={{ color: color.black }}>Jumlah: {item?.jumlah}</Text>
                  <Text style={{ color: color.black }}>Harga Berlaku: {item?.status_data}</Text>
                </View>
              </View>
            )
          })
        }
      </ScrollView>
    </View>
  )
}

export default DetailADHB

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  yearButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: '#d5d5d5',
  },
  yearText: {
    color: 'black',
    fontWeight: 'bold',
  },
  accordion: {
    backgroundColor: '#d5d5d5',
    width: '90%',
    marginHorizontal: '5%',
    borderRadius: 10,
    marginTop: 10,
  },
  yearItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#979797',
  },
  yearItemText: {
    color: 'black',
  },
})