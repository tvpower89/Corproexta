import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);

    // Function to retrieve orders from AsyncStorage
    const getOrders = async () => {
        try {
            const existingOrders = await AsyncStorage.getItem('orders');
            if (existingOrders !== null) {
                // If orders exist, parse and set them in state
                setOrders(JSON.parse(existingOrders));
            }
        } catch (error) {
            console.error('Error retrieving orders:', error);
        }
    };

    // useEffect hook to retrieve orders when the component mounts
    useEffect(() => {
        getOrders();
    }, []); // Empty dependency array means it will only run once when the component mounts

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Orders:</Text>
            {orders.map((order, index) => (
                <Text key={index}>
                    Order {index + 1}: {JSON.stringify(order)}
                </Text>
            ))}
            <Button title="Refresh Orders" onPress={getOrders} />
        </View>
    );
};

export default OrdersPage;
