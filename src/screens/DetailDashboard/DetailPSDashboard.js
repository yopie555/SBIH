import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import DetailPS from '../sosial/PS/DetailPS'
import GrafikPS from '../sosial/PS/GrafikPS'

const Tab = createMaterialTopTabNavigator()

const DetailPSDashboard = (props) => {

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
        name="Detail Privalensi Stunting "
        component={DetailPS}
        initialParams={{ title: "Data Privalensi Stunting " }}
      />
      <Tab.Screen
        name="Grafik Privalensi Stunting "
        component={GrafikPS}
        initialParams={{ title: "Data Privalensi Stunting " }}
      />
    </Tab.Navigator>
  )
}

export default DetailPSDashboard