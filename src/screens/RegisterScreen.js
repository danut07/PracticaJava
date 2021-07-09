import React, { useState } from "react";
import { Alert, Text, View, AsyncStorage } from "react-native";
import { TextInput, Button } from "react-native-paper";
import axios from "axios";
import validator from 'validator';

const RegisterScreen = ({ navigation }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = React.useState('');
    const [pass, setPass] = React.useState('');
    const [loading, setLoading] = React.useState(false)

    const handleRegister = () => {


        if (!email) {
            alert('Please insert your email');
            return;
        }
        if (!validator.isEmail(email)) {
            alert('Invalid email!');
            return;
        }
        if (!pass) {
            alert('Please insert a password');
            return;
        }
        if (pass.length < 8) {
            alert('Password must be at least 8 characters long!');
            return;
        }
        if (!name) {
            alert('Please insert your name');
            return;
        }

        let dataToSend = JSON.stringify({ name: name, email: email, password: pass });
        setLoading(true);

        axios({
            method: 'post',
            url: 'http://192.168.1.2:8080/register',
            data: dataToSend,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        })
            .then(response => {
                console.log(response)
                setLoading(false);
                if (response.data === 'Ok') {
                    navigation.navigate("Login");
                }
                else {
                    Alert.alert(response.data.msg);
                }
            });
    }

    return (
        <View>
            <TextInput
                style={{ display: "flex", marginTop: 192, width: "90%", alignSelf: "center" }}
                label="Name"
                mode="outlined"
                placeholder="Insert your name"
                value={name}
                onChangeText={name => setName(name)}
            />
            <TextInput
                style={{ display: "flex", marginTop: 32, width: "90%", alignSelf: "center" }}
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
                secureTextEntry={true}
                placeholder="Insert your password"
                value={pass}
                onChangeText={pass => setPass(pass)}
            />


            <Button icon="login" mode="contained" style={{ display: "flex", alignSelf: "center", marginTop: 64, width: "30%" }}
                onPress={handleRegister}
            >
                Register
            </Button>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 8 }}>
                <Text>
                    Already have an account?
                </Text>
                <Button onPress={() => navigation.navigate('Login')}>
                    Login here
                </Button>
            </View>
        </View>
    )
}

export default RegisterScreen;
