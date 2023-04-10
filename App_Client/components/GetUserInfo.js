import AsyncStorage from '@react-native-async-storage/async-storage';

const getUserInfo = async () => {
    try {
      const userInfo = await AsyncStorage.getItem('userInfo');
      if (userInfo !== null) {
        var json = JSON.parse(userInfo);
        return json.user;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  export default getUserInfo;
  