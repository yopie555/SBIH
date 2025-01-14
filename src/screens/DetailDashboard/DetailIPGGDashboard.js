import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import DetailIPGG from '../sosial/IPGG/DetailIPGG'
import GrafikIPGG from '../sosial/IPGG/GrafikIPGG'

const Tab = createMaterialTopTabNavigator()

const DetailIPGGDashboard = (props) => {
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
        name="Detail Indeks Pemberdayaan Gender"
        component={DetailIPGG}
        initialParams={{ title: "Data Indeks Pemberdayaan Gender" }}
      />
      <Tab.Screen
        name="Grafik Indeks Pemberdayaan Gender"
        component={GrafikIPGG}
        initialParams={{ title: "Data Indeks Pemberdayaan Gender" }}
      />
    </Tab.Navigator>
  )
}

export default DetailIPGGDashboard
