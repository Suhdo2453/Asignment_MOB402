import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React from 'react'
import image from '../assets/favicon.png';

const windowWidth = Dimensions.get('window').width

const ListItem = ({ item }) => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={image} />
            <View>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.price}>{item.price}</Text>
            </View>

        </View>
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