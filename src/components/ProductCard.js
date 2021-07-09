import React, { useEffect, useState } from "react";
import { Alert, AsyncStorage, StyleSheet, Text, View } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import qs from "qs";

const ProductCard = ({ product }) => {
    const navigation = useNavigation();

    return (
        <View>
            <Card>
                <Card.Content>
                    <Title>{product.name}</Title>
                    <Text>{product.price}</Text>

                    <Button title="Nav" onPress={() => navigation.navigate("ProductDetail", { product: product })}></Button>
                </Card.Content>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    Card:
    {
        borderRadius: 2,
        borderColor: "#000"
    }
});

export default ProductCard;
