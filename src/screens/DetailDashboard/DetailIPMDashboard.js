import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import DetailIPM from '../sosial/IPM/DetailIPM';
import GrafikIPM from '../sosial/IPM/GrafikIPM';

const Tab = createMaterialTopTabNavigator()

const DetailDashboard = (props) => {
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
        name="Detail Indeks Pembangunan Manusia" 
        component={DetailIPM} 
        initialParams={{ title: "Index Pembangunan Manusia" }}
        />
        <Tab.Screen 
        name="Grafik Indeks Pembangunan Manusia" 
        component={GrafikIPM} 
        initialParams={{ title: "Index Pembangunan Manusia" }}
        />
    </Tab.Navigator>
  )
}

export default DetailDashboard
