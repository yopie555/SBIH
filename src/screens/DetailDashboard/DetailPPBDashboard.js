import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import DetailPPB from '../pertanian/PPB/DetailPPB'
import GrafikPPB from '../pertanian/PPB/GrafikPPB'

const Tab = createMaterialTopTabNavigator()

const DetailPPBDashboard = (props) => {

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
      <Tab.Screen
        name="Detail Produksi Perikanan Budidaya (PPB)"
        component={DetailPPB}
        initialParams={{ title: "Data Produksi Perikanan Budidaya (PPB)" }}
      />
      <Tab.Screen
        name="Grafik Produksi Perikanan Budidaya (PPB)"
        component={GrafikPPB}
        initialParams={{ title: "Data Produksi Perikanan Budidaya (PPB)" }}
      />
    </Tab.Navigator>
  )
}

export default DetailPPBDashboard