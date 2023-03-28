import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { myStyles } from '../../MyStyle'
import ButtonCustom from '../../components/ButtonCustom'
import Icon from 'react-native-vector-icons/FontAwesome5'


const SignIn = ({ navigation }) => {
    return (
        <View and Customize Mouse Button Actions style={styles.container}>

            <Text style={styles.title}>Lets Sign you in</Text>
            <Text style={styles.subTile}>Welcome Back ,{'\n'}
                You have been missed</Text>

            <View style={styles.textInputWrapper}>
                <TextInput placeholder='Email ,phone & username' style={myStyles.textInput} />
                <TextInput placeholder='Password' style={myStyles.textInput} secureTextEntry />
                <TouchableOpacity style={{ alignSelf: 'flex-end' }}>
                    <Text style={styles.forgotBtn}>Forgot Password ?</Text>
                </TouchableOpacity>
            </View>

            <ButtonCustom title={'Sign in'} onPress={() => {
                // Navigate to MainScreen and reset the stack
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Main' }],
                });
            }} />

            <View style={styles.wrapper}>
                <View style={{ height: 1, width: '40%', backgroundColor: '#8E8383' }} />
                <Text style={{ marginHorizontal: 6, fontSize: 18, fontWeight: '500' }}>or</Text>
                <View style={{ height: 1, width: '40%', backgroundColor: '#8E8383' }} />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 16 }}>
                <TouchableOpacity>
                    <Icon name="facebook" color="#3b5998" size={35} />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginHorizontal: 30 }}>
                    <Icon name="google" color="#c2c2c2" size={35} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon name="apple" color="black" size={35} />
                </TouchableOpacity>
            </View>

            <View style={styles.wrapper}>
                <Text>Don’t have an account ? </Text>
                <TouchableOpacity>
                    <Text style={{ fontWeight: '900' }}>Register Now</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default SignIn

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 16
    },
    title: {
        marginTop: 50,
        fontSize: 37,
        fontWeight: '500'
    },
    subTile: {
        fontSize: 28,
        marginTop: 16
    },
    textInputWrapper: {
        alignItems: 'center',
        marginTop: 70,
        marginBottom: 30
    },
    forgotBtn: {
        marginEnd: 8,
        marginTop: 8,
        fontSize: 15,
        fontWeight: '500'
    },
    wrapper: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
})