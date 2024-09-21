import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import DetailAHH from '../sosial/AHH/DetailAHH'
import GrafikAHH from '../sosial/AHH/GrafikAHH'

const Tab = createMaterialTopTabNavigator()

const DetailAHHDashboard = (props) => {

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
        name="Detail Angka Harapan Hidup"
        component={DetailAHH}
        initialParams={{ title: "Data Angka Harapan Hidup" }}
      />
      <Tab.Screen
        name="Grafik Angka Harapan Hidup"
        component={GrafikAHH}
        initialParams={{ title: "Data Angka Harapan Hidup" }}
      />
    </Tab.Navigator>
  )
}

export default DetailAHHDashboard
