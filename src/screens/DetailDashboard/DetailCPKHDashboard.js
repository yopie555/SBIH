import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import DetailCPKH from '../pertanian/CPKH/DetailCPKH'
import GrafikCPKH from '../pertanian/CPKH/GrafikCPKH'

const Tab = createMaterialTopTabNavigator()

const DetailCPKHDashboard = (props) => {

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
        name="Detail Capaian Produksi Komoditi Hortikultura (CPKH) "
        component={DetailCPKH}
        initialParams={{ title: "Data Capaian Produksi Komoditi Hortikultura (Ton/ha)" }}
      />
      <Tab.Screen
        name="Grafik Capaian Produksi Komoditi Hortikultura (CPKH) "
        component={GrafikCPKH}
        initialParams={{ title: "Data Capaian Produksi Komoditi Hortikultura (Ton/ha)" }}
      />
    </Tab.Navigator>
  )
}

export default DetailCPKHDashboard
