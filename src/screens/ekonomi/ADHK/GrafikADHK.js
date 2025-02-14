import React, { useState, useEffect } from 'react';  
import {  
  StyleSheet,  
  Text,  
  View,  
  Dimensions,  
} from 'react-native';  
import { LineChart } from "react-native-chart-kit";  
import CategoryADHK from '../../../components/CategoryADHK'; 
import { color } from '../../../constants/Helper';  
import { stateDataAtasDasarHargaKonstan } from '../../../state/dataADHK'; 

const GrafikADHK = (props) => {  
   const [selectedCategoryId, setSelectedCategoryId] = useState(1);  
     const { dataAtasDasarHargaKonstan } = stateDataAtasDasarHargaKonstan();  
    
    // Filter data berdasarkan kategori yang dipilih dan tahun ganjil  
    const processGraphData = () => {  
        // Filter data sesuai kategori  
        const filteredData = dataAtasDasarHargaKonstan
            ?.filter(item => item.id === selectedCategoryId)  
            // Filter tahun ganjil  
            // .filter(item => {  
            //     const tahun = parseInt(item.tahun);  
            //     return tahun % 2 !== 0; // Hanya tahun ganjil  
            // })  
            // Urutkan dari tahun terbesar ke terkecil  
            // .sort((a, b) => parseInt(b.tahun) - parseInt(a.tahun));  
        // Jika tidak ada data  
        if (!filteredData || filteredData.length === 0) {  
            return {  
                labels: [],  
                datasets: [{ data: [] }]  
            };  
        }  

        return {  
            labels: filteredData.map(item => item.tahun),  
            datasets: [  
                {  
                    data: filteredData.map(item => parseFloat(item.jumlah)),  
                    color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,  
                    strokeWidth: 2  
                }  
            ]  
        };  
    };  

    // Dapatkan data yang sudah diproses  
    const graphData = processGraphData(); 
    

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

            {graphData.labels.length > 0 ? (  
                <LineChart  
                    data={graphData}  
                    width={Dimensions.get("window").width}  
                    height={300}  
                    yAxisInterval={1}  
                    verticalLabelRotation={50}
                    fromZero={true}  
                    chartConfig={{  
                        backgroundColor: color.graph1,  
                        backgroundGradientFrom: color.graph2,  
                        backgroundGradientTo: color.graph3,  
                        decimalPlaces: 1,  
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,  
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,  
                        style: {  
                            borderRadius: 16,  
                        },  
                        propsForDots: {  
                            r: "6",  
                            strokeWidth: "2",  
                            stroke: color.graph4  
                        }  
                    }}  
                    bezier  
                    style={{  
                        marginVertical: 8,  
                        borderRadius: 16,  
                    }}  
                />  
            ) : (  
                <Text style={{   
                    textAlign: 'center',   
                    color: 'black',   
                    marginTop: 20   
                }}>  
                    Tidak ada data tahun ganjil untuk kategori ini  
                </Text>  
            )}  
        </View>  
    )  
}  

export default GrafikADHK;