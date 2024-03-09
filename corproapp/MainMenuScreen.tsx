import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

// @ts-ignore
const MainMenuScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Button
                title="QR Scanner"
                onPress={() => navigation.navigate('QRScannerScreen')}
            />
            <Button
                title="Information Input"
                onPress={() => navigation.navigate('InformationInputPage')}
            />
            <Button
                title="Orders Page"
                onPress={() => navigation.navigate('OrdersPage')}
            />
            <Button
                title="Upload"
                onPress={() => navigation.navigate('OrderSubmitPage')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MainMenuScreen;
