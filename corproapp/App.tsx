import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';
import MainMenuScreen from './MainMenuScreen'; // Import the MainMenuScreen component
import InformationInputPage from './InformationInputPage';
import QRScannerScreen from './QRScannerScreen';
import OrdersPage from './OrdersPage.tsx';
import OrderSubmitPage from "./OrderSubmitPage.tsx";

enableScreens();

const Stack = createStackNavigator();

const App = () => {
    // @ts-ignore
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="MainMenuScreen">
                    <Stack.Screen
                        name="MainMenuScreen"
                        component={MainMenuScreen}
                        options={{ title: 'Main Menu' }}
                    />
                    <Stack.Screen
                        name="QRScannerScreen"
                        component={QRScannerScreen}
                        options={{ title: 'QR Scanner' }}
                    />
                    <Stack.Screen
                        name="InformationInputPage"
                        component={InformationInputPage}
                        options={{ title: 'Information Input' }}
                    />
                    <Stack.Screen
                        name="OrdersPage"
                        component={OrdersPage}
                        options={{ title: 'Orders Page' }}
                    />
                    <Stack.Screen
                        name="OrderSubmitPage"
                        component={OrderSubmitPage}
                        options={{ title: 'Upload' }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
};

export default App;

