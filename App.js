import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack'
import { QueryClient, QueryClientProvider } from 'react-query';

import Dashboard from './src/screens/dashboard/Index'
import TentangKami from './src/screens/dashboard/TentangKami.js';
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
import DetailAMHDashboard from './src/screens/DetailDashboard/DetailAMHDashboard.js';
import DetailAHHDashboard from './src/screens/DetailDashboard/DetailAHHDashboard.js';
import DetailAKHBDashboard from './src/screens/DetailDashboard/DetailAKHBDashboard.js';
import DetailAKIMDashboard from './src/screens/DetailDashboard/DetailAKIMDashboard.js';
import DetailPKKDashboard from './src/screens/DetailDashboard/DetailPKKDashboard.js';
import DetailIPGDashboard from './src/screens/DetailDashboard/DetailIPGDashboard.js';
import DetailAPKDashboard from './src/screens/DetailDashboard/DetailAPKDashboard.js';
import DetailAPmDashboard from './src/screens/DetailDashboard/DetailAPMDashboard.js';
import DetailHLSDashboard from './src/screens/DetailDashboard/DetailHLSDashboard.js';
import DetailJRTLHDashboard from './src/screens/DetailDashboard/detailJRTLHDashboard.js';
import DetailPPUDashboard from './src/screens/DetailDashboard/DetailPPUDashboard.js';
import DetailIPGGDashboard from './src/screens/DetailDashboard/DetailIPGGDashboard.js';
import DetailLIDashboard from './src/screens/DetailDashboard/DetailLIDashboard.js';
import DetailPMADashboard from './src/screens/DetailDashboard/DetailPMADashboard.js'
import DetailPPBDashboard from './src/screens/DetailDashboard/DetailPPBDashboard.js';
import DetailPPTDashboard from './src/screens/DetailDashboard/DetailPPTDashboard.js';
import DetailCPKUPDashboard from './src/screens/DetailDashboard/DetailCPKUPDashboard.js';
import DetailCPKHDashboard from './src/screens/DetailDashboard/DetailCPKHDashboard.js';
import DetailJPPDashboard from './src/screens/DetailDashboard/DetailJPPDashboard.js';
import DetailJPDashboard from './src/screens/DetailDashboard/DetailJPDashboard.js';
import DetailJPBKDashboard from './src/screens/DetailDashboard/DetailJPBKDashboard.js';
import DetailJPBKUDashboard from './src/screens/DetailDashboard/DetailJPBKUDashboard.js';
import DetailPTKJDashboard from './src/screens/DetailDashboard/DetailPTKJDashboard.js';
import DetailVideoDashboard from './src/screens/DetailDashboard/DetailVideoDashboard.js';
import DashboardAnggaranMurni from './src/screens/e-money/DashboardAnggaranMurni.js';
import DetailADHBDashboard from './src/screens/DetailDashboard/DetailADHBDashboard.js';
import DetailADHKDashboard from './src/screens/DetailDashboard/DetailADHKDashboard.js';
import DetailPSDashboard from './src/screens/DetailDashboard/DetailPSDashboard.js';

import DrawerContent from './src/components/DrawerContent'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

const queryClient = new QueryClient()

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
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Dashboard"
            component={DashboardDrawer}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='TentangKami'
            component={TentangKami}
            options={{headerShown: false}}
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
          <Stack.Screen
            name="DetailAMHDashboard"
            component={DetailAMHDashboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DetailAHHDashboard"
            component={DetailAHHDashboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DetailAKHBDashboard"
            component={DetailAKHBDashboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DetailAKIMDashboard"
            component={DetailAKIMDashboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DetailPKKDashboard"
            component={DetailPKKDashboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DetailIPGDashboard"
            component={DetailIPGDashboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DetailAPKDashboard"
            component={DetailAPKDashboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DetailAPMDashboard"
            component={DetailAPmDashboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DetailHLSDashboard"
            component={DetailHLSDashboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DetailJRTLHDashboard"
            component={DetailJRTLHDashboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DetailPPUDashboard"
            component={DetailPPUDashboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DetailIPGGDashboard"
            component={DetailIPGGDashboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='DetailLIDashboard'
            component={DetailLIDashboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='DetailPMADashboard'
            component={DetailPMADashboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='DetailPPBDashboard'
            component={DetailPPBDashboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='DetailPPTDashboard'
            component={DetailPPTDashboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='DetailCPKUPDashboard'
            component={DetailCPKUPDashboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='DetailCPKHDashboard'
            component={DetailCPKHDashboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='DetailJPPDashboard'
            component={DetailJPPDashboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='DetailJPDashboard'
            component={DetailJPDashboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='DetailJPBKDashboard'
            component={DetailJPBKDashboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='DetailJPBKUDashboard'
            component={DetailJPBKUDashboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='DetailPTKJDashboard'
            component={DetailPTKJDashboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='DetailVideoDashboard'
            component={DetailVideoDashboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='DashboardAnggaranMurni'
            component={DashboardAnggaranMurni}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='DetailADHBDashboard'
            component={DetailADHBDashboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='DetailADHKDashboard'
            component={DetailADHKDashboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='DetailPSDashboard'
            component={DetailPSDashboard}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  )
}

export default App