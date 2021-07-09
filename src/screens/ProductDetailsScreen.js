import React, {useEffect} from "react";
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
import {Paragraph, Title} from 'react-native-paper';
import axios from "axios";

const ProductDetailsScreen = ({route,navigation}) => {
    const { product } = route.params;
    const [reviews,setReviews] = useState([]);

    const getReviews = async () => {
        const token = await AsyncStorage.getItem('token');

        axios({
            method: 'get',
            url: 'http://192.168.0.103:8080/getReviewsByUser/'+product.userId,
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
        getReviews();
    },[])

    return (
        <ScrollView>
            <Title>{product.name}</Title>
            <Paragraph>{product.description}</Paragraph>
            <Text>Pret: {product.price}</Text>
            <Image source={{ uri: 'http://192.168.0.103:8080/getImage/'+product.productImage.id}}/>
        </ScrollView>
    );
};



export default ProductDetailsScreen;
