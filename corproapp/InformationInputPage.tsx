import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import QRScannerScreen from "./QRScannerScreen"; // Import the useNavigation hook

const YourComponent = ({setshowpage} : {setshowpage: any}) => {
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
      //  navigation.navigate("QRScannerScreen") // Navigate back to the previous screen
        setshowpage(false)
    };

    //push to the stack read navigation\


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
        // Assuming 'name' and 'client' are required fields and have fixed values for demonstration
        const orderName = "Sample Order Name"; // This should be replaced with actual data
        const clientName = "Sample Client Name"; // This should be replaced with actual data

        // Filter out items with empty quantities
        const filteredOrderItems = orderItems
            .filter(item => item.quantity !== '')
            .map(item => ({ productName: item.productName, quantity: parseInt(item.quantity) }));

        try {
            const response = await fetch('http://10.0.2.2:3000/api/orders', { // Use your actual backend URL here
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: orderName,
                    client: clientName,
                    items: filteredOrderItems,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create order');
            }

            const responseData = await response.json();
            console.log('Order created successfully:', responseData);

            // Optional: Navigate or update UI upon successful order creation
            setshowpage(false); // For example, go back to a previous screen or show success message
        } catch (error) {
            console.error('Error submitting order:', error);
        }
        console.log(orderItems)
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
