import { AuthRemoteDataSource } from '@/src/data/datasources/AuthRemoteDataSource';
import { AuthLocalDataSource } from '@/src/data/datasources/AuthLocalDataSource';
import { AuthRepository } from '@/src/data/repositories/AuthRepository';
import { LoginUseCase } from '@/src/application/usecases/LoginUseCase'
import { CheckAuthUseCase } from '@/src/application/usecases/CheckAuthUseCase'
import { HomeRemoteDataSource } from '@/src/data/datasources/HomeRemoteDataSource';
import { GetHomeUseCase } from '@/src/application/usecases/GetHomeUseCase';
import { HomeRepository } from '@/src/data/repositories/HomeRepository';
import { ProfileRemoteDataSource } from '@/src/data/datasources/ProfileRemoteDataSource';
import { ProfileRepository } from '@/src/data/repositories/ProfileRepository';
import { GetProfileUseCase } from '@/src/application/usecases/GetProfileUseCase';
import { ExercisesRemoteDataSource } from '@/src/data/datasources/ExercisesRemoteDataSource';
import { ExercisesRepository } from '@/src/data/repositories/ExercisesRepository';
import { GetExercisesUseCase } from '@/src/application/usecases/GetExercisesUseCase';
import { ExerciseDetailRemoteDataSource } from '@/src/data/datasources/ExerciseDetailRemoteDataSource';
import { ExerciseDetailRepository } from '@/src/data/repositories/ExerciseDetailRepository';
import { GetExerciseDetailUseCase } from '@/src/application/usecases/GetExerciseDetailUseCase';
import { CompleteExerciseUseCase } from '@/src/application/usecases/CompleteExerciseUseCase';



const remoteDataSouce = new AuthRemoteDataSource()
const localDataSource = new AuthLocalDataSource()

const authRepository = new AuthRepository(remoteDataSouce, localDataSource)

const exerciseDetailDataSource = new ExerciseDetailRemoteDataSource()
const exerciseDetailRepository = new ExerciseDetailRepository(exerciseDetailDataSource, authRepository)

const exercisesDataSource = new ExercisesRemoteDataSource()
const exercisesRepository = new ExercisesRepository(exercisesDataSource, authRepository)

const homeDataSource = new HomeRemoteDataSource()
const homeRepository = new HomeRepository(homeDataSource, authRepository)

const profileDataSource = new ProfileRemoteDataSource()
const profileRepository = new ProfileRepository(profileDataSource, authRepository)

export const container = {
    authRepository,
    loginUseCase: new LoginUseCase(authRepository),
    checkAuthUseCase: new CheckAuthUseCase(authRepository),
    getHomeUseCase: new GetHomeUseCase(homeRepository),
    getProfile: new GetProfileUseCase(profileRepository),
    getExercisesUseCase: new GetExercisesUseCase(exercisesRepository),
    getExerciseDetailUseCase: new GetExerciseDetailUseCase(exerciseDetailRepository),
    completeExerciseUseCase: new CompleteExerciseUseCase(exerciseDetailRepository),
}