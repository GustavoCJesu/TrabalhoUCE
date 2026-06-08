// src/presentation/hooks/useExerciseDetail.ts

import { useEffect, useState } from 'react'
import { container } from '@/src/core/config/container'
import { AppError } from '@/src/core/errors/AppErrors'
import { ExerciseDetail } from '@/src/domain/entities/ExerciseDetail'

// O hook recebe o id do exercício (vem da navegação).
export function useExerciseDetail(prescriptionItemId: number) {
    // estados da BUSCA do detalhe
    const [detail, setDetail] = useState<ExerciseDetail | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // estados da AÇÃO de concluir
    const [completing, setCompleting] = useState(false)
    const [completed, setCompleted] = useState(false)

    const loadDetail = async () => {
        setLoading(true)
        setError(null)
        try {
            const data = await container.getExerciseDetailUseCase.execute(prescriptionItemId)
            setDetail(data)
        } catch (e) {
            setError(e instanceof AppError ? e.message : 'Erro ao carregar')
        } finally {
            setLoading(false)
        }
    }

    // Função chamada pelo botão "Marcar como concluído".
    const complete = async () => {
        setCompleting(true)
        try {
            await container.completeExerciseUseCase.execute(prescriptionItemId)
            setCompleted(true) // marca que deu certo, pra tela reagir
        } catch (e) {
            setError(e instanceof AppError ? e.message : 'Erro ao concluir')
        } finally {
            setCompleting(false)
        }
    }

    useEffect(() => {
        loadDetail()
    }, [prescriptionItemId])

    return { detail, loading, error, complete, completing, completed }
}