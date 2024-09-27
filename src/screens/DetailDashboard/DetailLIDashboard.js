import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import DetailLI from '../ekonomi/LI/DetailLI'
import GrafikLI from '../ekonomi/LI/GrafikLI'

const Tab = createMaterialTopTabNavigator()

const DetailLIDashboard = (props) => {

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
        name="Detail Laju Inflasi"
        component={DetailLI}
        initialParams={{ title: "Data Laju Inflasi" }}
      />
      <Tab.Screen
        name="Grafik Laju Inflasi"
        component={GrafikLI}
        initialParams={{ title: "Data Laju Inflasi" }}
      />
    </Tab.Navigator>
  )
}

export default DetailLIDashboard
