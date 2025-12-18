import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SafeScreen from '../../components/SafeScreen';

import DetailPP from '../kependudukan/PP/DetailPP'
import GrafikPP from '../kependudukan/PP/GrafikPP'

const Tab = createMaterialTopTabNavigator()

const DetailPPDashboard = (props) => {

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
          name="Detail Pertumbuhan Penduduk"
          component={DetailPP}
          initialParams={{ title: "Data Pertumbuhan Penduduk" }}
        />
        <Tab.Screen
          name="Grafik Pertumbuhan Penduduk"
          component={GrafikPP}
          initialParams={{ title: "Data Pertumbuhan Penduduk" }}
        />
      </Tab.Navigator>
    </SafeScreen>
  )
}

export default DetailPPDashboard
