import {
    StyleSheet,
    Text,
    View,
    FlatList,
    SafeAreaView,
    Button,
    TouchableOpacity,
    RefreshControl,
    Alert,
    ToastAndroid
} from 'react-native'
import {
    HeaderButtons,
    HeaderButton,
    Item,
    HiddenItem,
    OverflowMenu,
} from 'react-navigation-header-buttons';

import React, { useState } from 'react'
import ListItem from '../../components/ListItem'
import Icon from 'react-native-vector-icons/Ionicons'
import axios from 'axios';
import getUserInfo from '../../components/GetUserInfo';
import { API_LOGOUT, API_PRODUCT } from '../../data/API';
import AsyncStorage from '@react-native-async-storage/async-storage';

const IoniconsHeaderButton = (props) => (
    // the `props` here come from <Item ... />
    // you may access them and pass something else to `HeaderButton` if you like
    <HeaderButton IconComponent={Icon} iconSize={23} {...props} />
);

const Home = ({ navigation, route }) => {
    const [showLogoutDialog, setShowLogoutDialog] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    var token = '';

    const getData = async () => {
        //lấy thông tin user từ async store
        if (token == '') {
            const user = await getUserInfo()
            token = user.token
        }



        axios.get(API_PRODUCT,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(async (res) => {
                setData(res.data.data);
            })
            .catch(err => {
                console.log(err);
            }).finally(() => {
                setLoading(false);
            });
    }

    const itemHandler = (id) => {
        navigation.navigate('Detail', { id: id, token: token });
    }
    const handleLogout = () => {
        setShowLogoutDialog(true);
    };

    const handleLogoutConfirmed = async () => {
        // Gửi API logout ở đây
        setShowLogoutDialog(false);
        setLoading(true);
        axios.get(API_LOGOUT,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(async (res) => {
                await AsyncStorage.clear();
                token = '';
                ToastAndroid.show('Logout Success', ToastAndroid.SHORT);
            })
            .catch(err => {
                console.log(err);
            }).finally(() => {
                setLoading(false);
            });
        // Điều hướng đến trang đăng nhập
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    };

    const handleLogoutCancelled = () => {
        setShowLogoutDialog(false);
    };

    const logout = () => {
        Alert.alert(
            'Xác nhận đăng xuất',
            'Bạn có chắc chắn muốn đăng xuất không?',
            [
                {
                    text: 'Hủy',
                    onPress: handleLogoutCancelled,
                    style: 'cancel',
                },
                { text: 'Đăng xuất', onPress: handleLogoutConfirmed },
            ],
            { cancelable: false }
        );
    };

    React.useEffect(() => {
        getData();
        navigation.setOptions({
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
                    <Item title="search" iconName="ios-search" onPress={() => navigation.navigate('Search')} />
                    <OverflowMenu
                        style={{ marginHorizontal: 10 }}
                        OverflowIcon={({ color }) => <Icon name="ellipsis-vertical" size={23} color={color} />}
                    >
                        <HiddenItem title="Account" onPress={() => navigation.navigate('EditAccount')} />
                        <HiddenItem title="Logout" onPress={() => logout()} />
                    </OverflowMenu>
                </HeaderButtons>

            ),
            headerTintColor: '#666666',
        });

    }, [navigation]);


    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                numColumns={2}
                data={data}
                renderItem={({ item }) => <ListItem item={item} onPress={() => itemHandler(item._id)} />}
                keyExtractor={(item) => `${item._id}`}
                refreshControl={
                    <RefreshControl refreshing={isLoading}
                        onRefresh={() => {
                            setLoading(true)
                            getData()
                        }} />
                }
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