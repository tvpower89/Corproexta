import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo'; // Import NetInfo for checking internet connection
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const OrderSubmitPage = ({ navigation }) => {
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });

        return () => {
            unsubscribe();
        };
    }, []);


    const submitOrdersToServer = async () => {
        try {
            // Fetch existing orders from AsyncStorage
            const existingOrders = await AsyncStorage.getItem('orders');
            if (!existingOrders) {
                Alert.alert('No orders to submit');
                return;
            }

            const orders = JSON.parse(existingOrders);

            if (!isConnected) {
                Alert.alert('No internet connection available');
                return;
            }

            // Loop through each order and submit them individually
            for (const order of orders) {
                const itemsToSend = order.map(item => ({
                    productName: item.productName,
                    quantity: parseInt(item.quantity, 10) || 0 // Parse quantity to integer, default to 0 if NaN
                }));

                const response = await fetch('http://10.0.2.2:3000/api/orders', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: 'YourName', // Change this to your desired name
                        items: itemsToSend, // Sending parsed quantity values
                        client: 'YourClientInfo' // Change this to client information
                    })
                });

                if (response.ok) {
                    // Alert for each successful submission if needed
                    console.log('Order submitted successfully:', order);
                } else {
                    // You might want to handle this differently depending on your use case
                    console.error('Failed to submit order to server:', order);
                }
            }

            // If all orders are submitted successfully, clear AsyncStorage and navigate back
            await AsyncStorage.removeItem('orders');
            Alert.alert('All orders submitted successfully');
            navigation.goBack(); // Go back to the previous screen
        } catch (error) {
            console.error('Error submitting orders to server:', error);
        }
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Submit Orders</Text>
            <Button title="Submit Orders" onPress={submitOrdersToServer} />
        </View>
    );
};

export default OrderSubmitPage;
