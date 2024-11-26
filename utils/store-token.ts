import AsyncStorage from "@react-native-async-storage/async-storage";

const storeToken = async (token: string) => {
  try {
    await AsyncStorage.setItem('token', token);
  } catch (e) {
    console.log(e)
  }
};

export default storeToken