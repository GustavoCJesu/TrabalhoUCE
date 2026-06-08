// src/domain/repositories/IExercisesRepository.ts

import { ExercisePlan } from '@/src/domain/entities/ExercisePlan'

export interface IExercisesRepository {
    getExercises(): Promise<ExercisePlan>
}