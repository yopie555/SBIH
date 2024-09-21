import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import DetailAMH from '../sosial/AMH/DetailAMH'
import GrafikAMH from '../sosial/AMH/GrafikAMH'

const Tab = createMaterialTopTabNavigator()

const DetailAMHDashboard = (props) => {

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
        name="Detail Angka Melek Huruf"
        component={DetailAMH}
        initialParams={{ title: "Data Angka Melek Huruf" }}
      />
      <Tab.Screen
        name="Grafik Angka Melek Huruf"
        component={GrafikAMH}
        initialParams={{ title: "Data Angka Melek Huruf" }}
      />
    </Tab.Navigator>
  )
}

export default DetailAMHDashboard
