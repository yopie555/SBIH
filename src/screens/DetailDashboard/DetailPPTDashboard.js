import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import DetailPPT from '../pertanian/PPT/DetailPPT'
import GrafikPPT from '../pertanian/PPT/GrafikPPT'

const Tab = createMaterialTopTabNavigator()

const DetailPPTDashboard = (props) => {

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
        name="Detail Produksi Perikanan Tangkap (PPT)"
        component={DetailPPT}
        initialParams={{ title: "Data Produksi Perikanan Tangkap (PPT)" }}
      />
      <Tab.Screen
        name="Grafik Produksi Perikanan Tangkap (PPT)"
        component={GrafikPPT}
        initialParams={{ title: "Data Produksi Perikanan Tangkap (PPT)" }}
      />
    </Tab.Navigator>
  )
}

export default DetailPPTDashboard
