// src/domain/entities/ExercisePlan.ts

// Cada exercício da lista tem uma "taxonomy" (objeto aninhado),
// igual ao padrão que já usamos na home e no profile.
export interface ExerciseTaxonomy {
    axis: string;
    problem: string;
    objective: string;
}

// Um item da lista de exercícios.
export interface ExerciseItem {
    prescriptionItemId: number;
    exerciseId: number;
    title: string;
    taxonomy: ExerciseTaxonomy;
    completedToday: boolean;
}

// O objeto que a rota retorna: o id da prescrição + a LISTA de itens.
export interface ExercisePlan {
    prescriptionId: number;
    items: ExerciseItem[];
}