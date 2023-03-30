import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import Home from './mainScreens/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OverflowMenuProvider } from 'react-navigation-header-buttons';

const Stack = createNativeStackNavigator()


const Main = () => {
    return (
        <OverflowMenuProvider>
            <Stack.Navigator>
                <Stack.Screen
                    name='Home'
                    component={Home} />
            </Stack.Navigator>
        </OverflowMenuProvider>
    )
}

export default Main

const styles = StyleSheet.create({})