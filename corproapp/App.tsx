import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import InformationInputPage from './InformationInputPage';
import {Alert} from "react-native";

const Stack = createStackNavigator();

const QRScannerScreen = () => {
    const [scanned, setScanned] = useState(false);
    const [showInputPage, setShowInputPage] = useState(false); // State to show the input page

    const handleQRCodeScanned = ({ data }: { data: string }) => {
        setScanned(true);
        setShowInputPage(true); // Show the input page after scanning QR code
        //saveDataOffline(data);
        Alert.alert('QR Code Scanned', `Data: ${data}`, [{ text: 'OK' }]);
    };

    /* const saveDataOffline = async (data: string) => {
         try {
             const existingData = await AsyncStorage.getItem('offlineData');
             const newData = existingData ? JSON.parse(existingData) : [];
             newData.push(data);
             await AsyncStorage.setItem('offlineData', JSON.stringify(newData));
         } catch (error) {
             console.error('Error saving data offline:', error);
         }
     };*/
const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="QRScanner">
                <Stack.Screen name="QRScanner" component={QRScannerScreen} />
                <Stack.Screen name="InformationInput" component={InformationInputPage} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
