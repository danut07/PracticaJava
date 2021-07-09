import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ProductDetailsScreen from "../screens/ProductDetailsScreen";
import ProductsScreen from "../screens/ProductsScreen";

const Stack = createStackNavigator()

function MainStackNavigator() {
    return (
        <NavigationContainer>

            <Stack.Navigator
                initialRouteName='Login'
                headerMode='float'>
                {/* <Stack.Screen
                    name='Home'
                    component={HomeScreen}
                    options={{ title: 'Home Screen' }}
                /> */}

                <Stack.Screen
                    name='Login'
                    component={LoginScreen}
                    options={({ route }) => ({
                        title: route.params.item.name
                    })}
                />

                <Stack.Screen
                    name='Register'
                    component={RegisterScreen}
                    options={{ title: 'Settings' }}
                />

                <Stack.Screen
                    name='Products'
                    component={ProductsScreen}
                    options={{ title: 'Settings' }}
                />

                <Stack.Screen
                    name='ProductDetail'
                    component={ProductDetailsScreen}
                    options={{ title: 'Settings' }}
                />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainStackNavigator