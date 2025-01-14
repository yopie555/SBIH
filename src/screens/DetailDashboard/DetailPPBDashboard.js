import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import DetailPPB from '../pertanian/PPB/DetailPPB'
import GrafikPPB from '../pertanian/PPB/GrafikPPB'

const Tab = createMaterialTopTabNavigator()

const DetailPPBDashboard = (props) => {

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
        name="Detail Produksi Perikanan Budidaya (Ton)"
        component={DetailPPB}
        initialParams={{ title: "Data Produksi Perikanan Budidaya (Ton)" }}
      />
      <Tab.Screen
        name="Grafik Produksi Perikanan Budidaya (Ton)"
        component={GrafikPPB}
        initialParams={{ title: "Data Produksi Perikanan Budidaya (Ton)" }}
      />
    </Tab.Navigator>
  )
}

export default DetailPPBDashboard
