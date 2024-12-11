import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { stateDataAnggaran } from '../../../state/dataAnggaran';
import {
    LineChart,
  } from "react-native-chart-kit";
  import { color } from '../../../constants/Helper';


const GrafikFisikAPBPPPerubahan = () => {
    const {dataAnggaran} = stateDataAnggaran()
    const data = dataAnggaran?.chart_fisik_perubahan?.[0] || []; // Fallback to a default array  
    const data1 = dataAnggaran?.chart_fisik_perubahan?.[1] || []; // Fallback to a default array  
    const isDataReady = Array.isArray(data) && Array.isArray(data1) && data.length > 0 && data1.length > 0; // Check if both datasets are available  


    return (
      <View style={{ flex: 1 }}>  
      {isDataReady ? (  
          <LineChart  
              data={{  
                  labels: [  
                      "Jan",  
                      "Feb",  
                      "Mar",  
                      "Apr",  
                      "Mei",  
                      "Jun",  
                      "Jul",  
                      "Agu",  
                      "Sep",  
                      "Okt",  
                      "Nov",  
                      "Des"  
                  ],  
                  datasets: [  
                      {  
                          data: data,  
                          color: (opacity = 1) => `green`, // Optional  
                          strokeWidth: 2 // Optional  
                      },  
                      {  
                          data: data1,  
                          color: (opacity = 1) => `yellow`, // Optional  
                          strokeWidth: 2 // Optional  
                      }  
                  ],  
                  legend: ["Target", "Realisasi"]
              }}  
              width={Dimensions.get("window").width} // from react-native  
              height={300}  
              yAxisInterval={1} // Optional, defaults to 1  
              chartConfig={{  
                  backgroundColor: color.graph1,  
                  backgroundGradientFrom: color.graph2,  
                  backgroundGradientTo: color.graph3,  
                  decimalPlaces: 1, // Optional, defaults to 2dp  
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,  
                  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,  
                  style: {  
                      borderRadius: 16,  
                      paddingVertical: 20,  
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
                  paddingVertical: 10  
              }}  
          />  
      ) : (  
          <View style={styles.loaderContainer}>  
              <ActivityIndicator size="large" color="blue" />  
              <Text style={{ color: 'blue' }}>Loading data...</Text>  
          </View>  
      )}  
  </View>  
    );
};


const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default GrafikFisikAPBPPPerubahan;
