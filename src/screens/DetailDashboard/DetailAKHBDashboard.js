import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SafeScreen from '../../components/SafeScreen';

import DetailAKHB from '../sosial/AKHB/DetailAKHB';
import GrafikAKHB from '../sosial/AKHB/GrafikAKHB';

const Tab = createMaterialTopTabNavigator();

const DetailAKHBDashboard = () => {
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
          name="Detail Angka Keberlangsungan Hidup Bayi"
          component={DetailAKHB}
          initialParams={{ title: "Data Angka Keberlangsungan Hidup Bayi" }}
        />
        <Tab.Screen
          name="Grafik Angka Keberlangsungan Hidup Bayi"
          component={GrafikAKHB}
          initialParams={{ title: "Data Angka Keberlangsungan Hidup Bayi" }}
        />
      </Tab.Navigator>
    </SafeScreen>
  );
};

export default DetailAKHBDashboard;
