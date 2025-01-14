import React, { useState, useEffect } from 'react';  
import {  
  StyleSheet,  
  Text,  
  View,  
  ScrollView,  
} from 'react-native';  
import CategoryADHK from '../../../components/CategoryADHK';  

// Import constants  
import { color } from '../../../constants/Helper';  
import { stateDataAtasDasarHargaKonstan } from '../../../state/dataADHK';  

const DetailADHK = (props) => {  
  const [selectedCategoryId, setSelectedCategoryId] = useState(1);  
  const { dataAtasDasarHargaKonstan } = stateDataAtasDasarHargaKonstan();  

  return (  
    <View style={{ flex: 1 }}>  
      <View style={{ padding: 10 }}>  
        <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center', color: 'black' }}>  
          {props.route.params.title}  
        </Text>  
        <Text style={{ color: color.black }}>  
          Sumber Data: <Text style={{ color: 'red' }}>BPS</Text>  
        </Text>  
      </View>  

      <CategoryADHK   
        onCategorySelect={(id) => {  
          setSelectedCategoryId(id);  
        }}   
      />  
      
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>  
        {dataAtasDasarHargaKonstan && dataAtasDasarHargaKonstan.length > 0 ? (  
          dataAtasDasarHargaKonstan  
            .filter(item => item.id === selectedCategoryId)  
            .map((item, index) => (  
              <View key={index}>  
                <View style={{   
                  padding: 10,   
                  backgroundColor: '#c4c4c4',   
                  width: '90%',   
                  marginHorizontal: '5%',   
                  borderRadius: 10,   
                  marginVertical: 5   
                }}>  
                  <Text style={{ color: color.black }}>Tahun {item?.tahun}</Text>  
                  <Text style={{ color: color.black }}>Uraian {item?.uraian}</Text>  
                  <Text style={{ color: color.black }}>Jumlah: {item?.jumlah}</Text>  
                  <Text style={{ color: color.black }}>Status Data: {item?.status_data}</Text>  
                </View>  
              </View>  
            ))  
        ) : (  
          <Text style={{   
            textAlign: 'center',   
            color: color.black,   
            marginTop: 20   
          }}>  
            Tidak ada data yang tersedia  
          </Text>  
        )}  
      </ScrollView>  
    </View>  
  )  
}  

export default DetailADHK