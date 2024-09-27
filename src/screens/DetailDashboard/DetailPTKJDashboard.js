import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import DetailPTKJ from '../infrastruktur/PTKJ/DetailPTKJ'
import GrafikPTKJ from '../infrastruktur/PTKJ/GrafikPTKJ'

const Tab = createMaterialTopTabNavigator()

const DetailPTKJDashboard = (props) => {

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
        name="Detail Persentase Tingkat Kemantapan Jalan (PTKJ) "
        component={DetailPTKJ}
        initialParams={{ title: "Data Persentase Tingkat Kemantapan Jalan (PTKJ) " }}
      />
      <Tab.Screen
        name="Grafik Persentase Tingkat Kemantapan Jalan (PTKJ) "
        component={GrafikPTKJ}
        initialParams={{ title: "Data Persentase Tingkat Kemantapan Jalan (PTKJ) " }}
      />
    </Tab.Navigator>
  )
}

export default DetailPTKJDashboard
