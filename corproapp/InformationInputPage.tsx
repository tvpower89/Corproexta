import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import mongoose from 'mongoose';
import Order from './order.js';

const uri = 'mongodb+srv://test:test@corproexta.ppr1qwa.mongodb.net/corproexta' || '';

const InformationInputPage = () => {
    const [quantityPequeno, setQuantityPequeno] = useState('');
    const [quantityGrande, setQuantityGrande] = useState('');
    const [quantityCajeton, setQuantityCajeton] = useState('');
    const [quantityMandaor, setQuantityMandaor] = useState('');

    const navigation = useNavigation(); // Initialize navigation hook

    async function createOrder(name: string, orderItems: any[]) {
        try {
            await mongoose.connect(uri, {});
            const order = new Order({
                name: name,
                items: orderItems
            });
            await order.save();

            console.log('Order added successfully');
        } catch (error) {
            console.error('Error creating order:', error);
        } finally {
            await mongoose.disconnect();
        }
    }

    const handleSubmit = () => {
        const orderItems = [
            { productName: 'CHAKARO PEQUENO', quantity: quantityPequeno },
            { productName: 'CHAKARO GRANDE', quantity: quantityGrande },
            { productName: 'CHAKARO CAJETON', quantity: quantityCajeton },
            { productName: "MANDA'OR CAJETON", quantity: quantityMandaor }
        ];
        console.log(orderItems);
        //createOrder('test', orderItems);
    };

    const handleCancel = () => {
        navigation.goBack(); // Navigate back to the previous screen
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Please enter the quantities:</Text>
            <TextInput
                placeholder="Quantity for Chakaro Pequeño"
                value={quantityPequeno}
                onChangeText={setQuantityPequeno}
                keyboardType="numeric"
                style={{ borderWidth: 1, margin: 10, padding: 5 }}
            />
            {/* Other TextInput components */}
            <Button title="Submit" onPress={handleSubmit} />
            <Button title="Cancel" onPress={handleCancel} /> {/* Add a Cancel button */}
        </View>
    );
};

export default InformationInputPage;
