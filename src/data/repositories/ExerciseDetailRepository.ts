// src/data/repositories/ExerciseDetailRepository.ts

import { ExerciseDetail, ExerciseCompletion } from '@/src/domain/entities/ExerciseDetail'
import { ExerciseDetailRemoteDataSource } from '@/src/data/datasources/ExerciseDetailRemoteDataSource'
import { IExerciseDetailRepository } from '@/src/domain/repositories/IExerciseDetailRepository'
import { IAuthRepository } from '@/src/domain/repositories/IAuthRepository'
import { UnauthorizedError } from '@/src/core/errors/AppErrors'

export class ExerciseDetailRepository implements IExerciseDetailRepository {

    constructor(
        private readonly detailDataSource: ExerciseDetailRemoteDataSource,
        private readonly authRepository: IAuthRepository,
    ) { }

    async getExerciseDetail(prescriptionItemId: number): Promise<ExerciseDetail> {
        const token = await this.authRepository.getToken()
        if (!token) {
            throw new UnauthorizedError()
        }
        return this.detailDataSource.getExerciseDetail(token, prescriptionItemId)
    }

    async completeExercise(prescriptionItemId: number): Promise<ExerciseCompletion> {
        const token = await this.authRepository.getToken()
        if (!token) {
            throw new UnauthorizedError()
        }
        return this.detailDataSource.completeExercise(token, prescriptionItemId)
    }
}