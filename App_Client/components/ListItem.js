import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import image from '../assets/favicon.png';
import { URL_API } from '../data/API';

const windowWidth = Dimensions.get('window').width

const ListItem = ({ item, onPress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View >
                <Image style={styles.image} source={{ uri: `${URL_API + item.image}` }} />
                <View>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={styles.price}>{item.price}</Text>
                </View>
            </View>
        </TouchableOpacity>

    )
}

export default ListItem

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        margin: 4,
        flex: 1,
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    price: {
        fontSize: 16,
        color: '#888',
        marginTop: 5,
    },
})