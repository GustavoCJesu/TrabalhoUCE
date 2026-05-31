import { useState } from 'react';
import { container } from '@/src/core/config/container';
import { AppError } from '@/src/core/errors/AppErrors';

export function useLogin(){
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const login = async (email: string, password: string): Promise<boolean> =>{
        setLoading(true)
        setError(null)

        try{
            await container.loginUseCase.execute(email, password)
            return true
        }catch(e){
            setError(e instanceof AppError ? e.message: 'Erro inesperado')
            return false
        }finally{
            setLoading(false)
        }
    }
    return {login, loading, error}
}