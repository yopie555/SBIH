import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SafeScreen from '../../components/SafeScreen';

import DetailJPBKU from '../kependudukan/JPBKU/DetailJPBKU'
import GrafikJPBKU from '../kependudukan/JPBKU/GrafikJPBKU'

const Tab = createMaterialTopTabNavigator()

const DetailJPBKUDashboard = (props) => {

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
          name="Detail Jumlah Penduduk Berdasarkan Kelompok Umur (JPBKU) "
          component={DetailJPBKU}
          initialParams={{ title: "Data Jumlah Penduduk Berdasarkan Kelompok Umur (JPBKU) " }}
        />
        <Tab.Screen
          name="Grafik Jumlah Penduduk Berdasarkan Kelompok Umur (JPBKU) "
          component={GrafikJPBKU}
          initialParams={{ title: "Data Jumlah Penduduk Berdasarkan Kelompok Umur (JPBKU) " }}
        />
      </Tab.Navigator>
    </SafeScreen>
  )
}

export default DetailJPBKUDashboard
