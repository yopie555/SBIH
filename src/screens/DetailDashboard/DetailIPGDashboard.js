import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import DetailIPG from '../sosial/IPG/DetailIPG'
import GrafikIPG from '../sosial/IPG/GrafikIPG'

const Tab = createMaterialTopTabNavigator()

const DetailIPGDashboard = (props) => {

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
        name="Detail Indeks Pembangunan Gender"
        component={DetailIPG}
        initialParams={{ title: "Data Indeks Pembangunan Gender" }}
      />
      <Tab.Screen
        name="Grafik Indeks Pembangunan Gender"
        component={GrafikIPG}
        initialParams={{ title: "Data Indeks Pembangunan Gender" }}
      />
    </Tab.Navigator>
  )
}

export default DetailIPGDashboard
