import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SafeScreen from '../../components/SafeScreen';

import DetailADHB from '../ekonomi/ADHB/DetailADHB';
import GrafikADHB from '../ekonomi/ADHB/GrafikADHB';

const Tab = createMaterialTopTabNavigator();

const DetailADHBDashboard = () => {
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
          name="Detail Atas Dasar Harga Berlaku"
          component={DetailADHB}
          initialParams={{ title: "PDRB ADHB (Juta Rupiah)" }}
        />
        <Tab.Screen
          name="Grafik Atas Dasar Harga Berlaku"
          component={GrafikADHB}
          initialParams={{ title: "PDRB ADHB (Juta Rupiah)" }}
        />
      </Tab.Navigator>
    </SafeScreen>
  );
};

export default DetailADHBDashboard