import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import InformationInputPage from './InformationInputPage';
import QRScannerScreen from './QRScannerScreen';
import { enableScreens } from 'react-native-screens';

enableScreens();

const Stack = createStackNavigator();

const App = () => {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="QRScannerScreen">
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
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
};

export default App;
