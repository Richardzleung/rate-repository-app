import AsyncStorage from '@react-native-community/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    // Get the access token for the storage
    const rawToken = await AsyncStorage.getItem(
      `${this.namespace}:token`
    );
    return rawToken ? rawToken : '';
  }

  setAccessToken(accessToken) {
    // Add the access token to the storage
    AsyncStorage.setItem(
      `${this.namespace}:token`,
      accessToken,
    );
  }

  async removeAccessToken() {
    // Remove the access token from the storage
    await AsyncStorage.removeItem(`${this.namespace}:token`);
  }
}

export default AuthStorage;