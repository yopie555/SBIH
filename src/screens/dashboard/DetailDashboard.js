import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import DetailMasyMiskin from '../masyMiskin/DetailMasyMiskin'
import GrafikMasyMiskin from '../masyMiskin/GrafikMasyMiskin'

const Tab = createMaterialTopTabNavigator()

const DetailDashboard = () => {
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
        <Tab.Screen name="Detail Masyarakat Miskin" component={DetailMasyMiskin} />
        <Tab.Screen name="Grafik Masyarakat Miskin" component={GrafikMasyMiskin} />
    </Tab.Navigator>
  )
}

export default DetailDashboard
