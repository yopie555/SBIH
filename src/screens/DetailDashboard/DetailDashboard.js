import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SafeScreen from '../../components/SafeScreen';

import DetailMasyMiskin from '../sosial/masyMiskin/DetailMasyMiskin'
import GrafikMasyMiskin from '../sosial/masyMiskin/GrafikMasyMiskin'

const Tab = createMaterialTopTabNavigator()

const DetailDashboard = (props) => {

  return (
    <SafeScreen edges={['top', 'bottom']} statusBarStyle="dark-content">
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
          name="Detail Tingkat Kemiskinan"
          component={DetailMasyMiskin}
          initialParams={{ title: "Data Tingkat Kemiskinan" }}
        />
        <Tab.Screen
          name="Grafik Tingkat Kemiskinan"
          component={GrafikMasyMiskin}
          initialParams={{ title: "Data Tingkat Kemiskinan" }}
        />
      </Tab.Navigator>
    </SafeScreen>
  )
}

export default DetailDashboard
