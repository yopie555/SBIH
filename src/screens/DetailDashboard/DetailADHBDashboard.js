import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useMutation } from 'react-query';

import DetailADHB from '../ekonomi/ADHB/DetailADHB';
import GrafikADHB from '../ekonomi/ADHB/GrafikADHB';

const Tab = createMaterialTopTabNavigator();

const DetailADHBDashboard = () => {
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
        name="Detail Atas Dasar Harga Berlaku"
        component={DetailADHB}
        initialParams={{ title: "Data Atas Dasar Harga Berlaku (ADHB)" }}
      />
      <Tab.Screen
        name="Grafik Atas Dasar Harga Berlaku"
        component={GrafikADHB}
        initialParams={{ title: "Data Atas Dasar Harga Berlaku (ADHB)" }}
      />
    </Tab.Navigator>
  );
};


export default DetailADHBDashboard