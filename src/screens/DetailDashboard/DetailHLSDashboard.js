import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import DetailHLS from '../sosial/HLS/DetailHLS'
import GrafikHLS from '../sosial/HLS/GrafikHLS'

const Tab = createMaterialTopTabNavigator()

const DetailHLSDashboard = (props) => {

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
        name="Detail Angka Harapan Lama Sekolah"
        component={DetailHLS}
        initialParams={{ title: "Data Angka Harapan Lama Sekolah" }}
      />
      <Tab.Screen
        name="Grafik Angka Harapan Lama Sekolah"
        component={GrafikHLS}
        initialParams={{ title: "Data Angka Harapan Lama Sekolah" }}
      />
    </Tab.Navigator>
  )
}

export default DetailHLSDashboard
