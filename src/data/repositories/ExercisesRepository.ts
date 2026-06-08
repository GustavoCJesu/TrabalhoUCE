// src/data/repositories/ExercisesRepository.ts

import { ExercisePlan } from '@/src/domain/entities/ExercisePlan'
import { ExercisesRemoteDataSource } from '@/src/data/datasources/ExercisesRemoteDataSource'
import { IExercisesRepository } from '@/src/domain/repositories/IExercisesRepository'
import { IAuthRepository } from '@/src/domain/repositories/IAuthRepository'
import { UnauthorizedError } from '@/src/core/errors/AppErrors'

export class ExercisesRepository implements IExercisesRepository {

    constructor(
        private readonly exercisesDataSource: ExercisesRemoteDataSource,
        private readonly authRepository: IAuthRepository,
    ) { }

    async getExercises(): Promise<ExercisePlan> {
        const token = await this.authRepository.getToken()

        if (!token) {
            throw new UnauthorizedError()
        }

        return this.exercisesDataSource.getExercises(token)
    }
}