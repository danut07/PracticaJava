import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    AsyncStorage,
    FlatList
} from "react-native";
import { Searchbar, Button, BottomNavigation } from "react-native-paper";
import ProductCard from "../components/ProductCard"

import axios from "axios";
import UserDetailsScreen from "./UserDetailsScreen";

const ProductsScreen = ({ navigation }) => {
    let searchQuery;
    let page = { page: 0, size: 10 };
    const [products, setProducts] = useState([]);

    const getItems = async () => {
        const token = await AsyncStorage.getItem('token');

        axios({
            method: 'post',
            url: 'http://192.168.1.2:8080/getProducts',
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(page),
        })
            .then(response => {
                setProducts(response.data.products);
            })
            .catch(error => console.log(error));

    }

    useEffect(() => {
        getItems();
    }, [])

    const [routes] = React.useState([
        { key: 'products', title: 'Products', icon: 'shopping' },
        { key: 'profile', title: 'Profile', icon: 'face-profile' },
    ]);
    const [index, setIndex] = React.useState(0);

    const renderScene = BottomNavigation.SceneMap({
        products: ProductsScreen,
        profile: UserDetailsScreen
    });


    const renderItem = ({ item }) => (
        <View>
            <ProductCard product={item}></ProductCard>
        </View>
    );

    return (
        <>
            <View>
                <View style={{ display: "flex", flexDirection: "row" }}>
                    <Searchbar
                        style={{ width: "75%", height: "80%" }}
                        placeholder="Search"
                        value={searchQuery}
                    />
                    <Button onPress={() => navigation.navigate('AddProduct')}>Add Item</Button>
                </View>

                <FlatList
                    data={products}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
            <View style={{
                display: "flex", position: 'absolute',
                marginBottom: 32,
                right: 0,
                bottom: 0,
            }}>
                <Button icon="face-profile" onPress={() => navigation.navigate('UserDetails')}>
                    Profile
                </Button>
            </View>

        </>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 30
    },
    bottom: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
    }
});

export default ProductsScreen;
