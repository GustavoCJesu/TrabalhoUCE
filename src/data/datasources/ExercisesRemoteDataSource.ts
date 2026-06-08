// src/data/datasources/ExercisesRemoteDataSource.ts

import { config } from '@/src/core/config/env'
import { NetworkError, UnauthorizedError, UnexpectedError } from '@/src/core/errors/AppErrors'
import { ExercisePlan } from '@/src/domain/entities/ExercisePlan'

export class ExercisesRemoteDataSource {

    async getExercises(token: string): Promise<ExercisePlan> {

        const url = `${config.baseUrl}/app/home/plan/exercises`

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
            console.error('Falha no fetch dos Exercicios:', e)
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