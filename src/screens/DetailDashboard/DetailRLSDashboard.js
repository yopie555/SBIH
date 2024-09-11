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
        initialParams={{  title: 'Angka Rata-Rata Lama Sekolah' }}
        />
        <Tab.Screen 
        name="Grafik Angka Rata-Rata Lama Sekolah" 
        component={GrafikRLS} 
        initialParams={{  title: 'Angka Rata-Rata Lama Sekolah' }}
        />
    </Tab.Navigator>
  )
}

export default DetailRLSDashboard
