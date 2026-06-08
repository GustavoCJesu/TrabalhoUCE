// src/application/usecases/GetExerciseDetailUseCase.ts

import { ExerciseDetail } from '@/src/domain/entities/ExerciseDetail'
import { IExerciseDetailRepository } from '@/src/domain/repositories/IExerciseDetailRepository'

export class GetExerciseDetailUseCase {
    constructor(private readonly detailRepository: IExerciseDetailRepository) { }

    async execute(prescriptionItemId: number): Promise<ExerciseDetail> {
        return this.detailRepository.getExerciseDetail(prescriptionItemId)
    }
} 