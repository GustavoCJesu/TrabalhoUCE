// src/application/usecases/GetExercisesUseCase.ts

import { ExercisePlan } from '@/src/domain/entities/ExercisePlan'
import { IExercisesRepository } from '@/src/domain/repositories/IExercisesRepository'

export class GetExercisesUseCase {
    constructor(private readonly exercisesRepository: IExercisesRepository) { }

    async execute(): Promise<ExercisePlan> {
        return this.exercisesRepository.getExercises()
    }
}