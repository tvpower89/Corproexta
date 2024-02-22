import React, { useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InformationInputPage from './InformationInputPage'; // Import your new component for information input

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

    return (
        <View style={{ flex: 1 }}>
            {!showInputPage ? ( // Render QR scanner or input page based on state
                <QRCodeScanner
                    onRead={handleQRCodeScanned}
                    reactivate={true}
                    reactivateTimeout={5000}
                />
            ) : (
                <InformationInputPage />
            )}
            {scanned && <Text style={{ marginTop: 20 }}>Scanned!</Text>}
            <Button title="Clear Scanned" onPress={() => setScanned(false)} />
        </View>
    );
};

export default QRScannerScreen;
