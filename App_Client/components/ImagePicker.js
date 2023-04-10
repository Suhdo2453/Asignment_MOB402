import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome5'


const ImagePickerScreen = ({ handleImagePicked }) => {
    const [imageSource, setImageSource] = useState(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            handleImagePicked(result.assets[0]);
            setImageSource(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.container}>
            <View >
                <TouchableOpacity onPress={pickImage}>
                    {imageSource ? (
                        <Image source={{ uri: imageSource }} style={styles.avatar} />
                    ) : (
                        <Image source={require('../assets/icon.png')} style={styles.avatar} />
                    )}
                </TouchableOpacity>

                <TouchableOpacity onPress={pickImage}>
                    <Icon name='pen' size={16} style={styles.editBtn} />
                </TouchableOpacity>

            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: 10,
    },
    image: {
        width: '100%',
        height: 200,
    },
    placeholder: {
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#eee',
        width: '100%',
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
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
});

export default ImagePickerScreen;
