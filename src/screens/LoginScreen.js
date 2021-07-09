import React, { useState } from "react";
import { Alert, Text, StyleSheet, View, AsyncStorage } from "react-native";
import { TextInput, Button, Checkbox } from "react-native-paper";
import axios from "axios";
import base64 from 'react-native-base64';
import btoa from 'btoa-lite'
import ProductsScreen from "./ProductsScreen";
import qs from "qs";

const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = React.useState('');
    const [pass, setPass] = React.useState('');
    const [checked, setChecked] = React.useState(false);
    const [loading, setLoading] = React.useState(false)

    const handleLogin = () => {

        if (!email) {
            alert('Please fill Email');
            return;
        }
        if (!pass) {
            alert('Please fill Password');
            return;
        }
        const dataToSend = { username: email, password: pass, grant_type: "password", scope: "web" };

        setLoading(true);

        axios({
            method: 'post',
            url: 'http://192.168.1.2:8080/oauth/token',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: qs.stringify(dataToSend),
            auth: {
                username: "ovidius",
                password: "1234"
            }
        })
            .then(response => {
                console.log(response)
                setLoading(false);
                if (response.data != null) {
                    AsyncStorage.setItem('token', response.data.access_token);
                    navigation.navigate("Products");
                }
                else {
                    Alert.alert("Could not authenticate");
                }
            })
            .catch(error => console.log(error));
    }

    return (
        <View>
            <TextInput
                style={{ display: "flex", marginTop: 192, width: "90%", alignSelf: "center" }}
                label="Email"
                mode="outlined"
                placeholder="Insert your email"
                value={email}
                onChangeText={email => setEmail(email)}
            />
            <TextInput

                style={{ display: "flex", marginTop: 32, width: "90%", alignSelf: "center" }}
                label="Password"
                mode="outlined"
                placeholder="Insert your password"
                secureTextEntry={true}
                value={pass}
                onChangeText={pass => setPass(pass)}
            />
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 8 }}>
                <Text style={{ fontSize: 16 }}>
                    Remember me
                </Text>
                <Checkbox
                    color="purple"
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setChecked(!checked);
                    }}
                />
            </View>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 8 }}>
                <Text>No account?</Text>
                <Button onPress={() => navigation.navigate('Register')}>Register here</Button>
            </View>

            <Button icon="login" mode="contained" style={{ display: "flex", alignSelf: "center", marginTop: 64, width: "30%" }}
                onPress={handleLogin}
            >
                Login
            </Button>
        </View>
    )
}

export default LoginScreen;
