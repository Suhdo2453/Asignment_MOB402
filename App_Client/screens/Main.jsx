import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import Home from './mainScreens/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator()


const Main = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Home'
                component={Home} />
        </Stack.Navigator>
    )
}

export default Main

const styles = StyleSheet.create({})