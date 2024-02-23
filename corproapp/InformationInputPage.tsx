import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook

const YourComponent = () => {
    const navigation = useNavigation(); // Use the useNavigation hook to get the navigation object

    const [quantityPequeno, setQuantityPequeno] = useState('');
    const [quantityGrande, setQuantityGrande] = useState('');
    const [quantityCajeton, setQuantityCajeton] = useState('');
    const [quantityMandaor, setQuantityMandaor] = useState('');

    const orderItems = [
        { productName: 'CHAKARO PEQUENO', quantity: quantityPequeno, setQuantity: setQuantityPequeno },
        { productName: 'CHAKARO GRANDE', quantity: quantityGrande, setQuantity: setQuantityGrande },
        { productName: 'CHAKARO CAJETON', quantity: quantityCajeton, setQuantity: setQuantityCajeton },
        { productName: "MANDA'OR CAJETON", quantity: quantityMandaor, setQuantity: setQuantityMandaor }
    ];

    const handleCancel = () => {
        navigation.goBack(); // Navigate back to the previous screen
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

    const handleSubmit = () => {
        // Do something with the orderItems
        console.log(orderItems);
        //createOrder('test', orderItems);
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
