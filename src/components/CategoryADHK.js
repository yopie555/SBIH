import { View, Text, Modal, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useMutation } from 'react-query';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
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
    onCategorySelect(item.id);  
  }  

  const listCategory = [
    { id: 1, name: 'Pertanian, Kehutanan dan Perikanan', icon: 'leaf' },
    { id: 2, name: 'Pertambangan dan Penggalian', icon: 'hammer' },
    { id: 3, name: 'Industri Pengolahan', icon: 'construct' },
    { id: 4, name: 'Pengadaan Listrik dan Gas', icon: 'flash' },
    { id: 5, name: 'Pengadaan Air, Pengelolaan Sampah, Limbah dan Daur Ulang', icon: 'water' },
    { id: 6, name: 'Konstruksi', icon: 'business' },
    { id: 7, name: 'Perdagangan Besar dan Eceran, Reparasi Mobil dan Sepeda Motor', icon: 'cart' },
    { id: 8, name: 'Transportasi dan Pergudangan', icon: 'car' },
    { id: 9, name: 'Penyediaan Akomodasi dan Makan Minum', icon: 'restaurant' },
    { id: 10, name: 'Informasi dan Komunikasi', icon: 'phone-portrait' },
    { id: 11, name: 'Jasa Keuangan dan Asuransi', icon: 'cash' },
    { id: 12, name: 'Real Estat', icon: 'home' },
    { id: 13, name: 'Jasa Perusahaan', icon: 'briefcase' },
    { id: 14, name: 'Administrasi Pemerintahan, Pertahanan dan Jaminan Sosial Wajib', icon: 'shield' },
    { id: 15, name: 'Jasa Pendidikan', icon: 'school' },
    { id: 16, name: 'Jasa Kesehatan dan Kegiatan Sosial', icon: 'medkit' },
    { id: 17, name: 'Jasa Kemasyarakatan, Sosial dan Kegiatan Hiburan', icon: 'people' },
    { id: 18, name: 'Jasa Lainnya', icon: 'ellipsis-horizontal' },
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

  // Call onCategorySelect on initial mount to notify parent component
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onCategorySelect(id);
    }, 100); // Small delay to ensure component is fully mounted

    return () => clearTimeout(timeoutId);
  }, []); // Empty dependency array means this runs once on mount

  return (
    <View>  
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0288d1" />
          <Text style={styles.loadingText}>Memuat data...</Text>
        </View>
      )}
      
      {error && (
        <View style={styles.errorContainer}>
          <Icon name="alert-circle" size={24} color="#e53935" />
          <Text style={styles.errorText}>Error: {error.message}</Text>
        </View>
      )}
      
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
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Pilih Kategori</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Icon name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <ScrollView 
              style={styles.categoryList}
              showsVerticalScrollIndicator={false}
            >  
              {listCategory.map((item, index) => {  
                const isSelected = item.id === id;
                return (  
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.categoryItem,
                      isSelected && styles.categoryItemSelected
                    ]}
                    onPress={() => handleCategorySelect(item)}
                  >
                    <View style={styles.categoryItemContent}>
                      <Icon 
                        name={item.icon} 
                        size={24} 
                        color={isSelected ? '#0288d1' : '#666'} 
                      />
                      <Text style={[
                        styles.categoryText,
                        isSelected && styles.categoryTextSelected
                      ]}>
                        {item.name}
                      </Text>
                    </View>
                    {isSelected && (
                      <Icon name="checkmark-circle" size={24} color="#0288d1" />
                    )}
                  </TouchableOpacity>
                )  
              })}  
            </ScrollView>  
          </View>  
        </View>  
      </Modal>  

      <TouchableOpacity 
        style={styles.categorySelector}
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.categorySelectorContent}>
          <View style={styles.categorySelectorLeft}>
            <Icon name="list" size={20} color="#0288d1" />
            <View style={styles.categorySelectorText}>
              <Text style={styles.categorySelectorLabel}>Kategori</Text>
              <Text style={styles.categorySelectorValue} numberOfLines={1}>
                {category}
              </Text>
            </View>
          </View>
          <Icon name="chevron-down" size={20} color="#0288d1" />
        </View>
      </TouchableOpacity>
    </View>  
  )
}

export default CategoryADHK

const styles = StyleSheet.create({
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#E1F5FE',
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 8,
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
    color: '#0288d1',
    fontWeight: '500',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFEBEE',
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 8,
    gap: 12,
  },
  errorText: {
    fontSize: 14,
    color: '#e53935',
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '80%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#1a1a1a',
  },
  closeButton: {
    padding: 4,
  },
  categoryList: {
    paddingHorizontal: 16,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  categoryItemSelected: {
    backgroundColor: '#E1F5FE',
  },
  categoryItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  categoryText: {
    fontSize: 15,
    color: '#1a1a1a',
    flex: 1,
  },
  categoryTextSelected: {
    color: '#0288d1',
    fontWeight: '600',
  },
  categorySelector: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  categorySelectorContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  categorySelectorLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  categorySelectorText: {
    flex: 1,
  },
  categorySelectorLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  categorySelectorValue: {
    fontSize: 15,
    color: '#1a1a1a',
    fontWeight: '600',
  },
})