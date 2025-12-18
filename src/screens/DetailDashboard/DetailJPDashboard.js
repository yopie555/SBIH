import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SafeScreen from '../../components/SafeScreen';

import DetailJP from '../kependudukan/JP/DetailJP'
import GrafikJP from '../kependudukan/JP/GrafikJP'

const Tab = createMaterialTopTabNavigator()

const DetailJPDashboard = (props) => {

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
          name="Detail Jumlah Penduduk (JP) "
          component={DetailJP}
          initialParams={{ title: "Data Jumlah Penduduk (JP) " }}
        />
        <Tab.Screen
          name="Grafik Jumlah Penduduk (JP) "
          component={GrafikJP}
          initialParams={{ title: "Data Jumlah Penduduk (JP) " }}
        />
      </Tab.Navigator>
    </SafeScreen>
  )
}

export default DetailJPDashboard
