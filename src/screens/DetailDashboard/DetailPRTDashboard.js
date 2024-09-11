import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import DetailPRT from '../infrastruktur/prt/DetailPRT';
import GrafikPRT from '../infrastruktur/prt/GrafikPRT';

const Tab = createMaterialTopTabNavigator()

const DetailPRTDashboard = (props) => {
  // console.log("propsi", props);
  
  return (
    <Tab.Navigator
    screenOptions={{
        tabBarActiveTintColor: '#0074BD',
        tabBarInactiveTintColor: '#979797',
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: '700',
        },
      }}
    >
        <Tab.Screen 
        name="Detail Penggunaan Air Bersih" 
        component={DetailPRT} 
        initialParams={{  title: "Persentase Penggunaan Air Bersih" }}
        />
        <Tab.Screen 
        name="Grafik Penggunaan Air Bersih" 
        component={GrafikPRT} 
        initialParams={{  title: "Persentase Penggunaan Air Bersih" }}
        />
    </Tab.Navigator>
  )
}

export default DetailPRTDashboard
