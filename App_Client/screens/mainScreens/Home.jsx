import {
    StyleSheet,
    Text,
    View,
    FlatList,
    SafeAreaView,
    Button,
    TouchableOpacity
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

const IoniconsHeaderButton = (props) => (
    // the `props` here come from <Item ... />
    // you may access them and pass something else to `HeaderButton` if you like
    <HeaderButton IconComponent={Icon} iconSize={23} {...props} />
);

const Home = ({ navigation, route }) => {
    const [count, setCount] = useState(0);

    React.useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
                    <Item title="search" iconName="ios-search" onPress={() => alert('search')} />
                    <OverflowMenu
                        style={{ marginHorizontal: 10 }}
                        OverflowIcon={({ color }) => <Icon name="ellipsis-vertical" size={23} color={color} />}
                    >
                        <HiddenItem title="hidden1" onPress={() => alert('hidden1')} />
                        <HiddenItem title="hidden2" onPress={() => alert('hidden2')} />
                    </OverflowMenu>
                </HeaderButtons>

            ),
            headerTintColor: '#666666',
        });
    }, [navigation]);


    return (
        <SafeAreaView style={styles.container}>
            <Text>Count: {count}</Text>
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