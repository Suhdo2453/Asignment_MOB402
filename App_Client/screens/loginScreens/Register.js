import { Image, Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { myStyles } from '../../MyStyle'
import ButtonCustom from '../../components/ButtonCustom'
import Icon from 'react-native-vector-icons/FontAwesome5'

const Register = ({ navigation }) => {

    return (

        <View style={styles.container}>
            <KeyboardAvoidingView behavior='position'>

                <Text style={styles.title}>Lets Register{'\n'}
                    Account</Text>
                <Text style={styles.subTile}>Hello user , you have{'\n'}
                    a greatful journey</Text>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.textInputWrapper}>
                        <View >
                            <TouchableOpacity >
                                        <Image source={require('../../assets/icon.png')} style={styles.avatar} />
                            </TouchableOpacity>

                            <TouchableOpacity >
                                <Icon name='pen' size={16} style={styles.editBtn} />
                            </TouchableOpacity>

                        </View>

                        <TextInput placeholder='User Name' style={myStyles.textInput} />
                        <TextInput placeholder='Full Name' style={myStyles.textInput} />
                        <TextInput placeholder='Password' style={myStyles.textInput} secureTextEntry/>
                        <TextInput placeholder='Repassword' style={myStyles.textInput} secureTextEntry />
                        <TouchableOpacity style={{ alignSelf: 'flex-end' }}>
                            <Text style={styles.forgotBtn}>Forgot Password ?</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
            <ButtonCustom title={'Sign in'} />

            <View style={styles.wrapper}>
                <Text>Already  have an account ? </Text>
                <TouchableOpacity>
                    <Text style={{ fontWeight: '900' }}>Login</Text>
                </TouchableOpacity>
            </View>

        </View>

    )
}

export default Register

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
        marginTop: 20,
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
    },
    editBtn: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'rgba(52, 52, 52, 0.5)',
        marginTop: -18,
        textAlign: 'center',
        right: 0,
        borderRadius: 50,
        padding: 6,
        color: 'white'
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#c2c2c2'
    }
})