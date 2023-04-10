import {
    StyleSheet,
    Text,
    View,
    FlatList,
    SafeAreaView,
    Button,
    TouchableOpacity,
    RefreshControl
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
import Data from '../../data/data.json'
import Icon from 'react-native-vector-icons/Ionicons'
import axios from 'axios';
import getUserInfo from '../../components/GetUserInfo';

const IoniconsHeaderButton = (props) => (
    // the `props` here come from <Item ... />
    // you may access them and pass something else to `HeaderButton` if you like
    <HeaderButton IconComponent={Icon} iconSize={23} {...props} />
);

const Home = ({ navigation, route }) => {
    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    var token = '';

    const getData = async () => {
        //lấy thông tin user từ async store
        if (token == '') {
            const user = await getUserInfo()
            token = user.token
        }



        axios.get('https://bc7d-117-1-109-141.ngrok-free.app/api/products',
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
                        <HiddenItem title="Account" onPress={() => navigation.navigate('EditAccount', { token: token })} />
                        <HiddenItem title="Logout" onPress={() => alert('hidden2')} />
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