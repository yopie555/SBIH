import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SafeScreen from '../../components/SafeScreen';

import DetailAPM from '../sosial/APM/DetailAPM'
import GrafikAPM from '../sosial/APM/GrafikAPM'

const Tab = createMaterialTopTabNavigator()

const DetailAPMDashboard = (props) => {

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
          name="Detail Angka Partisipasi Murni"
          component={DetailAPM}
          initialParams={{ title: "Data Angka Partisipasi Murni" }}
        />
        <Tab.Screen
          name="Grafik Angka Partisipasi Murni"
          component={GrafikAPM}
          initialParams={{ title: "Data Angka Partisipasi Murni" }}
        />
      </Tab.Navigator>
    </SafeScreen>
  )
}

export default DetailAPMDashboard
