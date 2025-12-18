import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SafeScreen from '../../components/SafeScreen';

import DetailCPKUP from '../pertanian/CPKUP/DetailCPKUP'
import GrafikCPKUP from '../pertanian/CPKUP/GrafikCPKUP'

const Tab = createMaterialTopTabNavigator()

const DetailCPKUPDashboard = (props) => {

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
          name="Detail Capaian Produksi Komoditi Unggulan Perkebunan (CPKUP)"
          component={DetailCPKUP}
          initialParams={{ title: "Data Capaian Produksi Komoditi Unggulan Perkebunan (CPKUP)" }}
        />
        <Tab.Screen
          name="Grafik Capaian Produksi Komoditi Unggulan Perkebunan (CPKUP)"
          component={GrafikCPKUP}
          initialParams={{ title: "Data Capaian Produksi Komoditi Unggulan Perkebunan (CPKUP)" }}
        />
      </Tab.Navigator>
    </SafeScreen>
  )
}

export default DetailCPKUPDashboard
