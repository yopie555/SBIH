import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SafeScreen from '../../components/SafeScreen';

import DetailADHK from '../ekonomi/ADHK/DetailADHK';
import GrafikADHK from '../ekonomi/ADHK/GrafikADHK';

const Tab = createMaterialTopTabNavigator();

const DetailADHKDashboard = () => {
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
          name="Detail Atas Dasar Harga Konstan"
          component={DetailADHK}
          initialParams={{ title: "PDRB ADHK (Juta Rupiah)" }}
        />
        <Tab.Screen
          name="Grafik Atas Dasar Harga Konstan"
          component={GrafikADHK}
          initialParams={{ title: "PDRB ADHK (Juta Rupiah)" }}
        />
      </Tab.Navigator>
    </SafeScreen>
  );
};

export default DetailADHKDashboard