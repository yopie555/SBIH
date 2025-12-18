import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SafeScreen from '../../components/SafeScreen';

import DetailKW from '../ekonomi/KW/DetailKW';
import GrafikKW from '../ekonomi/KW/GrafikKW';

const Tab = createMaterialTopTabNavigator()

const DetailKWDashboard = (props) => {

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
          name="Detail Kunjungan Wisata"
          component={DetailKW}
          initialParams={{ title: "Kunjungan Wisata" }}
        />
        <Tab.Screen
          name="Grafik Kunjungan Wisata"
          component={GrafikKW}
          initialParams={{ title: "Kunjungan Wisata" }}
        />
      </Tab.Navigator>
    </SafeScreen>
  )
}

export default DetailKWDashboard
