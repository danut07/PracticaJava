import React, { useEffect, useState } from "react";
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Button,
    Image,
    AsyncStorage
} from "react-native";

import axios from "axios";


const UserDetailsScreen = ({ navigation }) => {
    const [user, setUser] = useState();
    const [reviews, setReviews] = useState([]);

    const getUserDetails = async () => {
        const token = await AsyncStorage.getItem('token');

        axios({
            method: 'get',
            url: 'http://192.168.0.103:8080/user/' + uid,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        })
            .then(response => {
                setUser(response.data);
            })
            .catch(error => console.log(error));

        axios({
            method: 'get',
            url: 'http://192.168.0.103:8080/getReviewsByUser/' + uid,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        })
            .then(response => {
                setReviews(response.data);
            })
            .catch(error => console.log(error));

    }

    useEffect(() => {
        getUserDetails();
    }, [])


    return (
        <ScrollView>
            <Text>
                Feature in progress
            </Text>
        </ScrollView>
    );
};



export default UserDetailsScreen;
