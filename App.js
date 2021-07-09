import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import { createAppContainer } from "react-navigation";
import ProductsScreen from "./src/screens/ProductsScreen";
import ProductDetailsScreen from "./src/screens/ProductDetailsScreen";
import { decode, encode } from 'base-64'
import AddProductScreen from "./src/screens/AddProductScreen";
import UserDetailsScreen from "./src/screens/UserDetailsScreen";

if (!global.btoa) { global.btoa = encode }

if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="Products" component={ProductsScreen} />
                <Stack.Screen name="ProductDetail" component={ProductDetailsScreen} />
                <Stack.Screen name="AddProduct" component={AddProductScreen} />
                <Stack.Screen name="UserDetails" component={UserDetailsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
