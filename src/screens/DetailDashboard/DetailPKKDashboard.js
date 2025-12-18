import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SafeScreen from '../../components/SafeScreen';

import DetailPKK from '../sosial/PKK/DetailPKK'
import GrafikPKK from '../sosial/PKK/GrafikPKK'

const Tab = createMaterialTopTabNavigator()

const DetailPKKDashboard = (props) => {

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
          name="Detail Perkembangan Kondisi ketenagakerjaan"
          component={DetailPKK}
          initialParams={{ title: "Data Perkembangan Kondisi ketenagakerjaan" }}
        />
        <Tab.Screen
          name="Grafik Perkembangan Kondisi ketenagakerjaan"
          component={GrafikPKK}
          initialParams={{ title: "Data Perkembangan Kondisi ketenagakerjaan \n (Tingkat Pengangguran Terbuka)" }}
        />
      </Tab.Navigator>
    </SafeScreen>
  )
}

export default DetailPKKDashboard
