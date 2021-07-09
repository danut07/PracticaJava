import React from "react";
import {Text, StyleSheet, View, Button, TouchableOpacity} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const HomeScreen = ({navigation}) => {
    return (
        <View>
            <Button title="Login" onPress={() => navigation.navigate("Login")}></Button>
            <Button title="Register" onPress={() => navigation.navigate("Register")}></Button>
            {/*<TouchableOpacity>*/}
            {/*    <Text style={styles.text}>Hello!</Text>*/}
            {/*    <Text style={styles.text}>Hello!</Text>*/}
            {/*    <Text style={styles.text}>Hello!</Text>*/}
            {/*    <Text style={styles.text}>Hello!</Text>*/}
            {/*</TouchableOpacity>*/}
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 30
    }
});

export default HomeScreen;
