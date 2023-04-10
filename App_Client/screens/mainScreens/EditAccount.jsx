import { Image, Keyboard, ActivityIndicator, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { myStyles } from '../../MyStyle'
import ButtonCustom from '../../components/ButtonCustom'
import ImagePickerScreen from '../../components/ImagePicker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getUserInfo from '../../components/GetUserInfo';
import { useFocusEffect, useRoute } from '@react-navigation/native';

const Register = ({ navigation }) => {
    const route = useRoute();
    const { token } = route.params;
    const [loading, setLoading] = useState(false);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [oldusername, setOldUsername] = useState('');
    const [oldemail, setOldEmail] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [image, setImage] = useState(null);

    const handleImagePicked = (result) => {
        if (result) {
            setAvatar(result);
        }
    };

    const getProfile = () => {
        setLoading(true);
        axios.get('https://bc7d-117-1-109-141.ngrok-free.app/api/profile',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => {
                console.log(res.data);
                setUsername(res.data.username);
                setImage(res.data.image);
                setEmail(res.data.email);
            }).catch((err) => console.log(err))
            .finally(() => { setLoading(false) })
    }

    const handleSave = async () => {
        setLoading(true);
        // Tạo đối tượng formData để chứa dữ liệu đăng ký
        const formData = new FormData();
        console.log(username, email);
        formData.append('username', username);
        formData.append('email', email);
        formData.append('token', token);

        // const response = await fetch(avatar.uri);
        // const blob = await response.blob();
        if (avatar && avatar !== image) {
            const filename = avatar.uri.split('/').pop();
            formData.append('image', { uri: avatar.uri, type: 'image/jpeg', name: filename });
        }

        // Gửi request lên server
        axios.put('https://bc7d-117-1-109-141.ngrok-free.app/api/profile',
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then(async (response) => {
            console.log(response.data);
            await AsyncStorage.setItem('userInfo', JSON.stringify(response.data));
            setLoading(false);
            Keyboard.dismiss();
            ToastAndroid.show('Update Success', ToastAndroid.SHORT);
        }).catch((error) => {
            console.log(error);
        });
    };

    React.useEffect(() => {
        getProfile();
    }, [])
    // useFocusEffect(() => {
    //     getProfile();
    // });
    return (

        <View style={styles.container}>
            <KeyboardAvoidingView behavior='position'>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.textInputWrapper}>

                        <ImagePickerScreen handleImagePicked={handleImagePicked} imageDefault={image} />

                        <TextInput value={username} onChangeText={setUsername} placeholder='User Name' style={myStyles.textInput} />
                        <TextInput value={email} onChangeText={setEmail} placeholder='Email' style={myStyles.textInput} />
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
            <ButtonCustom title={'Save'} onPress={handleSave} />

            {loading && <ActivityIndicator size="large" style={styles.indicator} color={'#1e1e1e'} animating={true} />}

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