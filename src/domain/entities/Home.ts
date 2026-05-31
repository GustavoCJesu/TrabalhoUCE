export interface Home{
    painToday: PainToday;
    plan: Plan;
    nextExercise: NextExercise;
    motivation: Motivation
}


interface PainToday{
    recorded: boolean;
    level: string;
    recordedAt: string;
}

interface Plan{
    totalExercises: number;
    completedExercises: number;
    percentCompleted: number;
}

interface NextExercise {
    prescriptionId: number;
    prescriptionItemId: number;
    exerciseId: number;
    exerciseName: string;
    axis: string;
    problem: string;
    objective: string
}

interface Motivation {
    id: number;
    message: string
}