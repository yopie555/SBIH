import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack'

import Dashboard from './src/screens/dashboard/Index'
import DetailDashboard from './src/screens/dashboard/DetailDashboard'
import DetailMasyMiskin from './src/screens/masyMiskin/DetailMasyMiskin';
import GrafikMasyMiskin from './src/screens/masyMiskin/GrafikMasyMiskin';

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
          name="DetailMasyMiskin"
          component={DetailMasyMiskin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GrafikMasyMiskin"
          component={GrafikMasyMiskin}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App