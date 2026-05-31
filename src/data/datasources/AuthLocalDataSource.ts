import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'userToken'

export class AuthLocalDataSource {

    async saveToken(token: string): Promise<void> {
        await SecureStore.setItemAsync(TOKEN_KEY, token)
    }

    async getToken(): Promise<null | string> {
        return SecureStore.getItemAsync(TOKEN_KEY)
    }
    async clearToken(): Promise<void> {
        await SecureStore.deleteItemAsync(TOKEN_KEY)
    }
}

