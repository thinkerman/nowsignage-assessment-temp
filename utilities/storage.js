import AsyncStorage from '@react-native-async-storage/async-storage';

// it should cache the downloded file links on system storage
export async function StoreCacheLocalUrls(data) {
  await AsyncStorage.setItem('key_test5', JSON.stringify(data));
}

//it should get cache array of data
export async function getCacheLocalUrlLists() {
  const list = await AsyncStorage.getItem('key_test5');
  if (list !== null) {
    const parsedList = JSON.parse(list);
    return parsedList;
  } else {
    return null;
  }
}
