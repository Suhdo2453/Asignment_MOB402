import { useFocusEffect, useRoute } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import getUserInfo from '../../components/GetUserInfo';
import axios from 'axios';
import { API_PRODUCT, URL_API } from '../../data/API';


const SearchScreen = ({ navigation }) => {
    //const route = useRoute();

    const [data, setData] = useState('');
    let token = ''

    const getToken = async () => {
        if (!token) {
            const user = await getUserInfo();
            token = user.token;
        }
    }

    const search = async (txt) => {

        if (!token) return;
        console.log(token);
        axios.get(API_PRODUCT + `?search_text=${txt}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            .then(async (res) => {
                console.log(res.data.data);
                setData(res.data.data);
            })
            .catch(err => {
                console.log(err);
            }).finally(() => {
                //setLoading(false);
            });
    }

    const itemHandler = (id) => {
        navigation.navigate('Detail', { id: id });
    }

    React.useEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <View style={styles.headerTitle}>
                    <TextInput
                        style={styles.input}
                        placeholder="Search products"
                        placeholderTextColor="#7f8c8d"
                        onChangeText={(txt) => search(txt)}
                    />
                </View>
            ),
            headerTintColor: '#666666',
        });
    }, [navigation]);

    useFocusEffect(() => {
        getToken();
    });

    const Item = ({ imageSource, itemName, itemId }) => {
        return (
            <TouchableOpacity style={styles.container_item} onPress={() => itemHandler(itemId)} >
                <Image style={styles.image} source={{ uri: URL_API + imageSource }} />
                <Text style={styles.text}>{itemName}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>

            <FlatList
                data={data}
                renderItem={({ item }) => <Item itemName={item.name} imageSource={item.image} itemId={item._id} />}
                keyExtractor={(item) => `${item._id}`}
            />
        </View>
    );
}
export default SearchScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: '#2c3e50',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        borderRadius: 5,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#ecf0f1',
        borderColor: '#bdc3c7',
        color: '#2c3e50',
        width: 270,
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#bdc3c7',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    price: {
        fontSize: 14,
        color: '#7f8c8d',
    },
    container_item: {
        flexDirection: 'row',
        padding: 16,
        alignItems: 'center',
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 16,
    },
    text: {
        fontSize: 18,
    },
})
