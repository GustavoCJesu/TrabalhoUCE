// src/domain/entities/ExerciseDetail.ts

// Reaproveita a mesma ideia de taxonomy da lista.
export interface ExerciseTaxonomy {
    axis: string;
    problem: string;
    objective: string;
}

// Métricas do exercício (séries, repetições, volume).
export interface ExerciseMetrics {
    repetitionsRaw: string;
    series: string;
    volume: string;
}

// Cada passo da execução.
export interface ExerciseStep {
    order: number;
    text: string;
}

// O detalhe completo de um exercício (rota GET /exercises/{id}).
export interface ExerciseDetail {
    prescriptionId: number;
    prescriptionItemId: number;
    exerciseId: number;
    title: string;
    videoUrl: string;
    description: string;
    taxonomy: ExerciseTaxonomy;
    metrics: ExerciseMetrics;
    steps: ExerciseStep[];
    instructions: string;
    physiotherapistNotes: string;
}

// O que a rota POST /complete devolve ao registrar a conclusão.
export interface ExerciseCompletion {
    executionId: number;
    prescriptionId: number;
    prescriptionItemId: number;
    exerciseId: number;
    performedAt: string;
    message: string;
}