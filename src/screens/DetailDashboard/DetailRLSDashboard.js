import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import DetailRLS from '../sosial/RLS/DetailRLS'
import GrafikRLS from '../sosial/RLS/GrafikRLS'

const Tab = createMaterialTopTabNavigator()

const DetailRLSDashboard = (props) => {
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
        name="Detail Angka Rata-Rata Lama Sekolah" 
        component={DetailRLS} 
        initialParams={{ data: props.route.params.data, title: props.route.params.title }}
        />
        <Tab.Screen 
        name="Grafik Angka Rata-Rata Lama Sekolah" 
        component={GrafikRLS} 
        initialParams={{ data: props.route.params.data, title: props.route.params.title }}
        />
    </Tab.Navigator>
  )
}

export default DetailRLSDashboard