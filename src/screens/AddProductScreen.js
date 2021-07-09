import React, { useState } from "react";
import { View, AsyncStorage } from "react-native";
import { Button, TextInput } from 'react-native-paper';
import axios from "axios";


const AddProductScreen = ({ route, navigation }) => {
    const [itemName, setItemName] = useState('');
    const [description, setDescription] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [itemStock, setItemStock] = useState('');

    const handleAddProduct = async () => {
        if (!itemName || !description || !itemPrice || !itemStock)
            return alert("Please fill all input fields!")

        const token = await AsyncStorage.getItem('token');

        let productData = {
            "name": itemName,
            "description": description,
            "price": parseFloat(itemPrice),
            "inventory": parseInt(itemStock)
        };

        axios({
            method: 'post',
            url: 'http://192.168.1.2:8080/createProduct',
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(productData)
        }).then(response => {
            let productId = response.data;
            let bodyFormData = new FormData();

            console.log("productId:" + productId);
            bodyFormData.append('id', productId);
        }
        ).catch(error => console.log(error));
    }

    return (
        <>
            <View style={{ display: "flex", width: "90%", alignSelf: "center" }}>
                <TextInput
                    label="Name"
                    value={itemName}
                    mode="outlined"
                    onChangeText={(itemName) => setItemName(itemName)}
                    style={{ marginBottom: 16, marginTop: 64 }}
                />

                <TextInput
                    label="Price"
                    style={{ marginBottom: 16 }}
                    keyboardType="numeric"
                    mode="outlined"
                    onChangeText={(itemPrice) => setItemPrice(itemPrice)}
                    value={itemPrice}
                />

                <TextInput
                    label="Stock"
                    style={{ marginBottom: 16 }}
                    keyboardType="numeric"
                    mode="outlined"
                    onChangeText={(itemStock) => setItemStock(itemStock)}
                    value={itemStock}
                />

                <TextInput
                    label="Description"
                    value={description}
                    keyboardType="default"
                    mode="outlined"
                    style={{ marginBottom: 16 }}
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={(description) => setDescription(description)}
                />
            </View>
            <View>
                <Button mode="contained" style={{ display: "flex", marginTop: 32, width: "25%", alignSelf: "center" }}
                    onPress={handleAddProduct}
                >
                    ADD
                </Button>
            </View>
        </>
    );
};


export default AddProductScreen;
