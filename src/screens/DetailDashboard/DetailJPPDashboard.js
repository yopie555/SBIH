import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import DetailJPP from '../pertanian/JPP/DetailJPP'
import GrafikJPP from '../pertanian/JPP/GrafikJPP'

const Tab = createMaterialTopTabNavigator()

const DetailJPPDashboard = (props) => {

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
        name="Detail Jumlah Produksi Peternakan (JPP) "
        component={DetailJPP}
        initialParams={{ title: "Data Jumlah Produksi Peternakan (JPP) " }}
      />
      <Tab.Screen
        name="Grafik Jumlah Produksi Peternakan (JPP) "
        component={GrafikJPP}
        initialParams={{ title: "Data Jumlah Produksi Peternakan (JPP) " }}
      />
    </Tab.Navigator>
  )
}

export default DetailJPPDashboard
