import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveToStorage<T>(key: string, value: T) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.log("Error saving to storange: ", err);
  }
}
export async function getFromStorage<T>(key: string): Promise<T | null> {
  try {
    const item = await AsyncStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  } catch (e) {
    console.error("Error reading from storage", e);
    return null;
  }
}

export async function removeFromStorage(key: string) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error("Error removing from storage", e);
  }
}
