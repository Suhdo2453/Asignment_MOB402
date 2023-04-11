import { Image, Keyboard, ActivityIndicator, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { myStyles } from '../../MyStyle'
import ButtonCustom from '../../components/ButtonCustom'
import ImagePickerScreen from '../../components/ImagePicker';
import { API_REG } from '../../data/API'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { validateRegisterInputs } from '../../ulti/validate';

const Register = ({ navigation }) => {
    const [loading, setLoading] = useState(false);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [avatar, setAvatar] = useState(null);

    const handleImagePicked = (result) => {
        if (result) {
            setAvatar(result);
        }
    };

    const handleRegister = async () => {
        if (!validateRegisterInputs(username, email, password, repassword, avatar)) return;
        setLoading(true);
        // Tạo đối tượng formData để chứa dữ liệu đăng ký
        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('passwd', password);


        const filename = avatar.uri.split('/').pop();
        formData.append('image', { uri: avatar.uri, type: 'image/jpeg', name: filename });
        console.log({ uri: avatar.uri, type: 'image/jpeg', name: filename });

        // Gửi request lên server
        axios.post(`${API_REG}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then(async (response) => {
            console.log(response.data);
            await AsyncStorage.setItem('userInfo', JSON.stringify(response.data));
            setLoading(false);
            navigation.reset({
                index: 0,
                routes: [{ name: 'Main' }],
            });
        }).catch((error) => {
            console.log(error);
        });
    };
    return (

        <View style={styles.container}>
            <KeyboardAvoidingView behavior='position'>

                <Text style={styles.title}>Lets Register{'\n'}
                    Account</Text>
                <Text style={styles.subTile}>Hello user , you have{'\n'}
                    a greatful journey</Text>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.textInputWrapper}>

                        <ImagePickerScreen handleImagePicked={handleImagePicked} />

                        <TextInput onChangeText={setUsername} placeholder='User Name' style={myStyles.textInput} />
                        <TextInput onChangeText={setEmail} placeholder='Email' style={myStyles.textInput} />
                        <TextInput onChangeText={setPassword} placeholder='Password' style={myStyles.textInput} secureTextEntry />
                        <TextInput onChangeText={setRepassword} placeholder='Repassword' style={myStyles.textInput} secureTextEntry />
                        <TouchableOpacity style={{ alignSelf: 'flex-end' }}>
                            <Text style={styles.forgotBtn}>Forgot Password ?</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
            <ButtonCustom title={'Sign in'} onPress={handleRegister} />

            {loading && <ActivityIndicator size="large" style={styles.indicator} color={'#1e1e1e'} animating={true} />}

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
    indicator: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        zIndex: 1,
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