import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const YourComponent = ({ setshowpage } : { setshowpage: any }) => {
    const navigation = useNavigation();

    const [quantityPequeno, setQuantityPequeno] = useState<number>(0);
    const [quantityGrande, setQuantityGrande] = useState<number>(0);
    const [quantityCajeton, setQuantityCajeton] = useState<number>(0);
    const [quantityMandaor, setQuantityMandaor] = useState<number>(0);
    const [quantityCafe100g, setQuantityCafe100g] = useState<number>(0);
    const [quantityCafe200g, setQuantityCafe200g] = useState<number>(0);

    const orderItems = [
        { productName: 'CHAKARO PEQUENO', quantity: quantityPequeno, setQuantity: setQuantityPequeno },
        { productName: 'CHAKARO GRANDE', quantity: quantityGrande, setQuantity: setQuantityGrande },
        { productName: 'CHAKARO CAJETON', quantity: quantityCajeton, setQuantity: setQuantityCajeton },
        { productName: "MANDA'OR CAJETON", quantity: quantityMandaor, setQuantity: setQuantityMandaor },
        { productName: "Cafe 100g", quantity: quantityCafe100g, setQuantity: setQuantityCafe100g },
        { productName: "Cafe 200g", quantity: quantityCafe200g, setQuantity: setQuantityCafe200g }
    ];

    const handleCancel = () => {
        setshowpage(false);
    };

    const renderInputs = () => {
        return orderItems.map((item, index) => (
            <View key={index}>
                <Text>{`Quantity for ${item.productName}` + ":"}</Text>
                <TextInput
                    placeholder="Enter quantity"
                    value={item.quantity.toString()}
                    onChangeText={(text) => {
                        const quantity = parseInt(text, 10);
                        if (!isNaN(quantity)) {
                            item.setQuantity(quantity);
                        } else {
                            item.setQuantity(0);
                        }
                    }}
                    keyboardType="numeric"
                    style={{ borderWidth: 1, margin: 10, padding: 5 }}
                />
            </View>
        ));
    };

    const handleSubmit = async () => {
        // Filter out items with empty quantities
        const filteredOrderItems = orderItems.filter(item => item.quantity !== '');

        try {
            // Fetch existing orders from AsyncStorage
            const existingOrders = await AsyncStorage.getItem('orders');
            let orders = existingOrders ? JSON.parse(existingOrders) : [];

            // Add the new order items
            orders.push(filteredOrderItems);

            // Save the updated orders back to AsyncStorage
            await AsyncStorage.setItem('orders', JSON.stringify(orders));

            setshowpage(false); // Optional: Update UI or navigate to a different screen
        } catch (error) {
            console.error('Error saving order:', error);
        }
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Please enter the quantities:</Text>
            {renderInputs()}
            <Button title="Submit" onPress={handleSubmit} />
            <Button title="Cancel" onPress={handleCancel} />
        </View>
    );
};

export default YourComponent;
