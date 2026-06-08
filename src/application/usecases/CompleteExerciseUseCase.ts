// src/application/usecases/CompleteExerciseUseCase.ts

import { ExerciseCompletion } from '@/src/domain/entities/ExerciseDetail'
import { IExerciseDetailRepository } from '@/src/domain/repositories/IExerciseDetailRepository'

export class CompleteExerciseUseCase {
    constructor(private readonly detailRepository: IExerciseDetailRepository) { }

    async execute(prescriptionItemId: number): Promise<ExerciseCompletion> {
        return this.detailRepository.completeExercise(prescriptionItemId)
    }
}