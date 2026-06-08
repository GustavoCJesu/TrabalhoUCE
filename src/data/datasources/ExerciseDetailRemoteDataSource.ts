// src/data/datasources/ExerciseDetailRemoteDataSource.ts

import { config } from '@/src/core/config/env'
import { NetworkError, UnauthorizedError, UnexpectedError } from '@/src/core/errors/AppErrors'
import { ExerciseDetail, ExerciseCompletion } from '@/src/domain/entities/ExerciseDetail'

export class ExerciseDetailRemoteDataSource {

    // GET: busca o detalhe. Repara que o prescriptionItemId entra NA URL.
    async getExerciseDetail(token: string, prescriptionItemId: number): Promise<ExerciseDetail> {

        const url = `${config.baseUrl}/app/home/plan/exercises/${prescriptionItemId}`

        let response: Response

        try {
            response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
        } catch (e) {
            console.error('Falha no fetch do detalhe do exercicio:', e)
            throw new NetworkError()
        }

        if (response.status === 401) {
            throw new UnauthorizedError()
        }
        if (!response.ok) {
            throw new UnexpectedError()
        }

        const dados = await response.json()
        return dados
    }

    // POST: marca como concluído. A URL tem o id + "/complete".
    async completeExercise(token: string, prescriptionItemId: number): Promise<ExerciseCompletion> {

        const url = `${config.baseUrl}/app/home/plan/exercises/${prescriptionItemId}/complete`

        let response: Response

        try {
            response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
        } catch (e) {
            console.error('Falha ao concluir o exercicio:', e)
            throw new NetworkError()
        }

        if (response.status === 401) {
            throw new UnauthorizedError()
        }
        if (!response.ok) {
            throw new UnexpectedError()
        }

        const dados = await response.json()
        return dados
    }
}