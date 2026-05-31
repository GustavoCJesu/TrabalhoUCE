import { AuthRemoteDataSource } from '@/src/data/datasources/AuthRemoteDataSource';
import { AuthLocalDataSource } from '@/src/data/datasources/AuthLocalDataSource';
import { AuthRepository } from '@/src/data/repositories/AuthRepository';
import { LoginUseCase } from '@/src/application/usecases/LoginUseCase'
import { CheckAuthUseCase } from '@/src/application/usecases/CheckAuthUseCase'
import { HomeRemoteDataSource } from '@/src/data/datasources/HomeRemoteDataSource';
import { GetHomeUseCase } from '@/src/application/usecases/GetHomeUseCase';
import { HomeRepository } from '@/src/data/repositories/HomeRepository';

const remoteDataSouce = new AuthRemoteDataSource()
const localDataSource = new AuthLocalDataSource()


const authRepository = new AuthRepository(remoteDataSouce, localDataSource)

const homeDataSource = new HomeRemoteDataSource()
const homeRepository = new HomeRepository(homeDataSource, authRepository)

export const container = {
    authRepository,
    loginUseCase: new LoginUseCase(authRepository),
    checkAuthUseCase: new CheckAuthUseCase(authRepository),
    getHomeUseCase: new GetHomeUseCase(homeRepository)
}