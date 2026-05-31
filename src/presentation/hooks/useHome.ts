import { container } from "@/src/core/config/container";
import { AppError } from "@/src/core/errors/AppErrors";
import { Home } from "@/src/domain/entities/Home";
import { useEffect, useState } from "react";



export function useHome(){

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [home, setHome] = useState<Home | null>(null)

    const loadHome = async ()=>{
        setLoading(true)
        setError(null)

        try{
            const data = await container.getHomeUseCase.execute()
            setHome(data)
        }catch(e){
            setError(e instanceof AppError ? e.message : 'Erro ao carregar')
        } finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        loadHome()
    },[])

    return { home, loading, error}
}