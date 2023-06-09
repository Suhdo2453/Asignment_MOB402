import { StyleSheet, Text, View, Image, ActivityIndicator, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { API_PRODUCT, URL_API } from '../../data/API';
import getUserInfo from '../../components/GetUserInfo';

const Detail = () => {
    const route = useRoute();
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    var token = '';
    const { id } = route.params;

    const getData = async () => {
        setIsLoading(true);
        if (token == '') {
            const user = await getUserInfo();
            token = user.token
        }
        axios.get(API_PRODUCT + `/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(async (res) => {
                setProduct(res.data.data);
            })
            .catch(err => {
                console.log(err);
            }).finally(() => {
                setIsLoading(false);
            });
    }

    React.useEffect(() => {
        getData();
    }, []);

    if (isLoading) {
        return (
            <View style={styles.indicator}>
                <ActivityIndicator size="large" color="#1e1e1e" />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: `${URL_API}${(product ? product.image : '')}` }} style={styles.image} />
            <View style={styles.detailsContainer}>
                <Text style={styles.name}>{product.name}</Text>
                <Text style={styles.price}>{product.price} VND</Text>
                <Text style={styles.category}>Category: {product.category.name}</Text>
                <Text style={styles.description}>{product.description}</Text>
            </View>
        </ScrollView>
    )
}

export default Detail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    image: {
        height: 300,
        width: '100%',
    },
    detailsContainer: {
        padding: 20,
    },
    indicator: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        zIndex: 1,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    category: {
        fontSize: 18,
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 20,
    },
})