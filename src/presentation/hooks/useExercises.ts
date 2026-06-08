// src/presentation/hooks/useExercises.ts

import { useEffect, useState } from 'react'
import { container } from '@/src/core/config/container'
import { AppError } from '@/src/core/errors/AppErrors'
import { ExercisePlan } from '@/src/domain/entities/ExercisePlan'

export function useExercises() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [exercises, setExercises] = useState<ExercisePlan | null>(null)

    const loadExercises = async () => {
        setLoading(true)
        setError(null)

        try {
            const data = await container.getExercisesUseCase.execute()
            setExercises(data)
        } catch (e) {
            setError(e instanceof AppError ? e.message : 'Erro ao carregar')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadExercises()
    }, [])

    return { exercises, loading, error }
}