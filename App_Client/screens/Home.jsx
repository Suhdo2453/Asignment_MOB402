import {
    StyleSheet,
    Text,
    View,
    FlatList,
    SafeAreaView
} from 'react-native'
import React, { useState } from 'react'
import ListItem from '../components/ListItem'
import Data from '../data/data.json'

const Home = ({ navigation, route }) => {

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                numColumns={2}
                data={Data.items}
                renderItem={({ item }) => <ListItem item={item} />}
                keyExtractor={(item) => `${item.id}`}
            />
        </SafeAreaView>
    );
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})