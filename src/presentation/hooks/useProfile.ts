import { ProfileData } from "@/src/domain/entities/Profile";
import { useEffect, useState } from "react";
import { container } from "@/src/core/config/container";
import { AppError } from "@/src/core/errors/AppErrors";



export function useProfile() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [profile, setProfile] = useState<ProfileData | null>(null)

    const loadProfile = async () => {
        setLoading(true)
        setError(null)

        try {
            const data = await container.getProfile.execute()
            setProfile(data)
        } catch (e) {
            setError(e instanceof AppError ? e.message : 'Erro ao carregar')
        } finally {
            setLoading(false)
        }        
    }

    useEffect(()=>{
        loadProfile()
    },[])

    return { loading, error, profile}
}