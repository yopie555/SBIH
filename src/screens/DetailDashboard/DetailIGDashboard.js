import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import DetailIG from '../sosial/IG/DetailIG'
import GrafikIG from '../sosial/IG/GrafikIG'

const Tab = createMaterialTopTabNavigator()

const DetailDashboard = (props) => {
  // console.log("propsi", props);
  
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
        name="Detail Indeks Gini" 
        component={DetailIG} 
        initialParams={{ title: 'Indeks Gini' }}
        />
        <Tab.Screen 
        name="Grafik Indeks Gini" 
        component={GrafikIG} 
        initialParams={{title: 'Indeks Gini' }}
        />
    </Tab.Navigator>
  )
}

export default DetailDashboard
