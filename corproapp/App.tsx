import React, { useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InformationInputPage from './InformationInputPage'; // Import your new component for information input
import QRScannerScreen from "./QRScannerScreen.tsx";
import {NavigationContainer} from "@react-navigation/native";

const App = () => {
    return (
        <NavigationContainer>
            <QRScannerScreen />
        </NavigationContainer>
    );
};

export default App;