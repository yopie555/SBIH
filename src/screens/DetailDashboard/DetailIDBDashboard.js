import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SafeScreen from '../../components/SafeScreen';

import DetailIDB from '../sosial/IDB/DetailIDB'
import GrafikIDB from '../sosial/IDB/GrafikIDB'

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
          name="Detail Indeks Daya Beli"
          component={DetailIDB}
          initialParams={{ title: "Indeks Daya Beli" }}
        />
        <Tab.Screen
          name="Grafik Indeks Daya Beli"
          component={GrafikIDB}
          initialParams={{ title: "Indeks Daya Beli" }}
        />
      </Tab.Navigator>
    </SafeScreen>
  )
}

export default DetailDashboard
