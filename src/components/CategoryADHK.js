import { View, Text, Modal, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useMutation } from 'react-query';
import axios from 'axios';
// Import constants  
import { color } from '../constants/Helper';
import { stateDataAtasDasarHargaKonstan } from '../state/dataADHK';

const CategoryADHK = ({ onCategorySelect }) => {
      const { setDataAtasDasarHargaKonstan } = stateDataAtasDasarHargaKonstan();
      const [id, setId] = useState(1);
      const [modalVisible, setModalVisible] = useState(false);
      const [category, setCategory] = useState('Pertanian, Kehutanan dan Perikanan');

      const handleCategorySelect = (item) => {  
        setCategory(item.name);  
        setId(item.id);  
        setModalVisible(false);  
        // Call the callback function with the selected ID  
        onCategorySelect(item.id);  
      }  

      const listCategory = [
        { id: 1, name: 'Pertanian, Kehutanan dan Perikanan' },
        { id: 2, name: 'Pertambangan dan Penggalian' },
        { id: 3, name: 'Industri Pengolahan' },
        { id: 4, name: 'Pengadaan Listrik dan Gas' },
        { id: 5, name: 'Pengadaan Air, Pengelolaan Sampah, Limbah dan Daur Ulang' },
        { id: 6, name: 'Konstruksi' },
        { id: 7, name: 'Perdagangan Besar dan Eceran, Reparasi Mobil dan Sepeda Motor' },
        { id: 8, name: 'Transportasi dan Pergudangan' },
        { id: 9, name: 'Penyediaan Akomodasi dan Makan Minum' },
        { id: 10, name: 'Informasi dan Komunikasi' },
        { id: 11, name: 'Jasa Keuangan dan Asuransi' },
        { id: 12, name: 'Real Estat' },
        { id: 13, name: 'Jasa Perusahaan' },
        { id: 14, name: 'Administrasi Pemerintahan, Pertahanan dan Jaminan Sosial Wajib' },
        { id: 15, name: 'Jasa Pendidikan' },
        { id: 16, name: 'Jasa Kesehatan dan Kegiatan Sosial' },
        { id: 17, name: 'Jasa Kemasyarakatan, Sosial dan Kegiatan Hiburan' },
        { id: 18, name: 'Jasa Lainnya' },
      ]
    
      const { mutate: fetchData, data, error, isLoading } = useMutation(
        async () => {
          const response = await axios.post('https://bih.bintankab.go.id/api/v1/ekonomi/adhk', {
            'uraian_id': id,
          });
          return response.data.result;
        }, {
        onError: (error) => {
          console.error("Error fetching data:", error);
        },
        onSuccess: (data) => {
          setDataAtasDasarHargaKonstan(data);
        }})
    
      useEffect(() => {
        fetchData();
      }, [id]);

  return (
    <View>  
          {isLoading && <ActivityIndicator size="large" color="#0074BD" />}  
          {error && <Text style={{ color: 'red', padding: 10 }}>Error: {error.message}</Text>}  
          
          <Modal  
            animationType="slide"  
             transparent={true}  
             visible={modalVisible}  
             onRequestClose={() => {  
               setModalVisible(!modalVisible);  
             }}  
           >  
             <View style={styles.centeredView}>  
               <View style={styles.modalView}>  
                 <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center', color: 'black' }}>Pilih Kategori</Text>  
                 <ScrollView>  
                   {  
                     listCategory.map((item, index) => {  
                       return (  
                         <Text   
                           key={index}   
                           style={{ color: color.black, padding: 10 }}   
                           onPress={() => handleCategorySelect(item)}  // Use handleCategorySelect here  
                         >  
                           {item.name}  
                         </Text>  
                       )  
                     })  
                   }  
                 </ScrollView>  
               </View>  
             </View>  
           </Modal>  
     
           <View style={{ padding: 10, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#c1c1c1', marginBottom: 5 }}>  
             <Text style={{ fontWeight: 'bold', fontSize: 16, color: color.black }}>Kategori</Text>  
             <Text style={{ color: color.black }} onPress={() => setModalVisible(true)}>{category}</Text>  
           </View>  
        </View>  
  )
}

export default CategoryADHK

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    })