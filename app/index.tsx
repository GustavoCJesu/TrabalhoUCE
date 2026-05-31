import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { container } from '@/src/core/config/container'




export default function Index() {

  const router = useRouter()

  useEffect(() => {
    const verifyLogin = async () => {

        const isAuthenticated = await container.checkAuthUseCase.execute()

        if(isAuthenticated){
          router.replace('/(tabs)/home')
        }else{
          router.replace('/(auth)/Login')
        }
    }

    verifyLogin()
  }, [router])

  return null
}