import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import DetailPPU from '../sosial/PPU/DetailPPU'
import GrafikPPU from '../sosial/PPU/GrafikPPU'

const Tab = createMaterialTopTabNavigator()

const DetailPPUDashboard = (props) => {

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
        name="Detail Jumlah Rumah Tidak Layak Huni Yang Direhab"
        component={DetailPPU}
        initialParams={{ title: "Data Jumlah Rumah Tidak Layak Huni Yang Direhab" }}
      />
      <Tab.Screen
        name="Grafik Jumlah Rumah Tidak Layak Huni Yang Direhab"
        component={GrafikPPU}
        initialParams={{ title: "Data Jumlah Rumah Tidak Layak Huni Yang Direhab" }}
      />
    </Tab.Navigator>
  )
}

export default DetailPPUDashboard
