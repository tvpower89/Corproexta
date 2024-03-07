import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MMKV } from 'react-native-mmkv'

export const storage = new MMKV()

const YourComponent = ({ setshowpage }) => {
    const navigation = useNavigation(); // Use the useNavigation hook to get the navigation object

    const [quantityPequeno, setQuantityPequeno] = useState('');
    const [quantityGrande, setQuantityGrande] = useState('');
    const [quantityCajeton, setQuantityCajeton] = useState('');
    const [quantityMandaor, setQuantityMandaor] = useState('');
    const [quantityCafe100g, setQuantityCafe100g] = useState('');
    const [quantityCafe200g, setQuantityCafe200g] = useState('');

    const orderItems = [
        { productName: 'CHAKARO PEQUENO', quantity: quantityPequeno, setQuantity: setQuantityPequeno },
        { productName: 'CHAKARO GRANDE', quantity: quantityGrande, setQuantity: setQuantityGrande },
        { productName: 'CHAKARO CAJETON', quantity: quantityCajeton, setQuantity: setQuantityCajeton },
        { productName: "MANDA'OR CAJETON", quantity: quantityMandaor, setQuantity: setQuantityMandaor },
        { productName: "Cafe 100g", quantity: quantityCafe100g, setQuantity: setQuantityCafe100g },
        { productName: "Cafe 200g", quantity: quantityCafe200g, setQuantity: setQuantityCafe200g }
    ];

    const handleCancel = () => {
        setshowpage(false)
    };

    const renderInputs = () => {
        return orderItems.map((item, index) => (
            <TextInput
                key={index}
                placeholder={`Quantity for ${item.productName}`}
                value={item.quantity}
                onChangeText={item.setQuantity}
                keyboardType="numeric"
                style={{ borderWidth: 1, margin: 10, padding: 5 }}
            />
        ));
    };

    const handleSubmit = async () => {
        const orderName = "Sample Order Name";
        const clientName = "Sample Client Name";

        const filteredOrderItems = orderItems
            .filter(item => item.quantity !== '')
            .map(item => ({ productName: item.productName, quantity: parseInt(item.quantity) }));

        try {
            const orders = MMKV.get('orders') || [];
            orders.push({
                name: orderName,
                client: clientName,
                items: filteredOrderItems,
            });
            MMKV.set('orders', orders);

            setshowpage(false);
        } catch (error) {
            console.error('Error submitting order:', error);
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
