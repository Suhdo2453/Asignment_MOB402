import {
    StyleSheet,
    Text,
    View,
    FlatList,
    SafeAreaView,
    Button,
    TouchableOpacity
} from 'react-native'
import React, { useState } from 'react'
import ListItem from '../../components/ListItem'
import Data from '../../data/data.json'
import Icon from 'react-native-vector-icons/Ionicons'

const Home = ({ navigation, route }) => {
    const [count, setCount] = useState(0);

    React.useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <>
                    <TouchableOpacity onPress={() => setCount((c) => c + 1)} style={{ marginEnd: 8 }}>
                        <Icon name='ios-search-sharp' size={24} color={'#666666'} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setCount((c) => c + 1)} >
                        <Icon name='ellipsis-vertical' size={24} color={'#666666'} />
                    </TouchableOpacity>
                </>
            ),
            headerTintColor: '#666666',
        });
    }, [navigation])


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