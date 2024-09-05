import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack'

import Dashboard from './src/screens/dashboard/Index'
import DetailDashboard from './src/screens/DetailDashboard/DetailDashboard'
import DetailIPMDashboard from './src/screens/DetailDashboard/DetailIPMDashboard';
import DetailRLSDashboard from './src/screens/DetailDashboard/DetailRLSDashboard';
import DetailIGDashboard from './src/screens/DetailDashboard/DetailIGDashboard';
import DetailIDBDashboard from './src/screens/DetailDashboard/DetailIDBDashboard'
import DetailPEDashboard from './src/screens/DetailDashboard/DetailPEDashboard';
import DetailKWDashboard from './src/screens/DetailDashboard/DetailKWDashboard';
import DetailPPDashboard from './src/screens/DetailDashboard/DetailPPDashboard.js';
import DetailPJDDDashboard from './src/screens/DetailDashboard/DetailPJDDDashboard.js';
import DetailPRTDashboard from './src/screens/DetailDashboard/DetailPRTDashboard.js';

import DrawerContent from './src/components/DrawerContent'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

const DashboardDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      drawerPosition="right"
      drawerContent={() =>
        <DrawerContentScrollView >
          <DrawerContent />
        </DrawerContentScrollView>
      }
    >
      <Drawer.Screen
        name="Smart Bintan in Hand"
        component={Dashboard}
        options={{
          headerTitleAlign: 'center',
        }} />
    </Drawer.Navigator>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Dashboard"
          component={DashboardDrawer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DetailDashboard"
          component={DetailDashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DetailIPMDashboard"
          component={DetailIPMDashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DetailRLSDashboard"
          component={DetailRLSDashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DetailIGDashboard"
          component={DetailIGDashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DetailIDBDashboard"
          component={DetailIDBDashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DetailPEDashboard"
          component={DetailPEDashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DetailKWDashboard"
          component={DetailKWDashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DetailPPDashboard"
          component={DetailPPDashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DetailPJDDDashboard"
          component={DetailPJDDDashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DetailPRTDashboard"
          component={DetailPRTDashboard}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App