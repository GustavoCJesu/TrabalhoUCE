import { AuthLocalDataSource } from '@/src/data/datasources/AuthLocalDataSource';
import { AuthRemoteDataSource } from '@/src/data/datasources/AuthRemoteDataSource';
import { IAuthRepository } from "@/src/domain/repositories/IAuthRepository";

export class AuthRepository implements IAuthRepository{
    constructor(
        private readonly remote: AuthRemoteDataSource,
        private readonly local: AuthLocalDataSource,
    ){}

    async login(email: string, password: string): Promise<string>{
        const token = await this.remote.login(email, password)
        await this.local.saveToken(token)

        return token
    }

    async getToken(): Promise<string | null> {
        return this.local.getToken()
    }

    async logout(): Promise<void>{
        await this.local.clearToken() 
    }
}