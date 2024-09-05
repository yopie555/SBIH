import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import DetailPJDD from '../infrastruktur/pjdd/DetailPJDD'
import GrafikPJDD from '../infrastruktur/pjdd/GrafikPJDD'

const Tab = createMaterialTopTabNavigator()

const DetailPJDDDashboard = (props) => {
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
        name="Detail Panjang Jalan yang Dibangun dan Ditingkatkan" 
        component={DetailPJDD} 
        initialParams={{ data: props.route.params.data, title: props.route.params.title }}
        />
        <Tab.Screen 
        name="Grafik PanjangnJalan yang Dibangun dan Ditingkatkan" 
        component={GrafikPJDD} 
        initialParams={{ data: props.route.params.data, title: props.route.params.title }}
        />
    </Tab.Navigator>
  )
}

export default DetailPJDDDashboard
