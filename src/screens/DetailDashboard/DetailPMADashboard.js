import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import DetailPMA from '../ekonomi/PMA/DetailPMA'
import GrafikPMA from '../ekonomi/PMA/GrafikPMA'

const Tab = createMaterialTopTabNavigator()

const DetailPMADashboard = (props) => {

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
        name="Detail Realisasi Investasi (PMA / PMDN)"
        component={DetailPMA}
        initialParams={{ title: "Data Realisasi Investasi (PMA / PMDN)" }}
      />
      <Tab.Screen
        name="Grafik Realisasi Investasi (PMA / PMDN)"
        component={GrafikPMA}
        initialParams={{ title: "Data Realisasi Investasi (PMA / PMDN)" }}
      />
    </Tab.Navigator>
  )
}

export default DetailPMADashboard
