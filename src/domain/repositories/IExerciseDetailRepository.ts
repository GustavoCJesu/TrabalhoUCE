// src/domain/repositories/IExerciseDetailRepository.ts

import { ExerciseDetail, ExerciseCompletion } from '@/src/domain/entities/ExerciseDetail'

export interface IExerciseDetailRepository {
    // Busca o detalhe de um exercício pelo seu prescriptionItemId.
    getExerciseDetail(prescriptionItemId: number): Promise<ExerciseDetail>

    // Marca um exercício como concluído (POST).
    completeExercise(prescriptionItemId: number): Promise<ExerciseCompletion>
}