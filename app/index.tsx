import { Redirect } from 'expo-router';
import React from 'react';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import * as SecureStore from 'expo-secure-store';




export default function Home() {

  const router = useRouter()

  useEffect(()=>{
    const verifyLogin = async ()=>{

    try{
      
      await SecureStore.setItemAsync('userToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjksImVtYWlsIjoiZ3VzdGF2by5qZXN1aW5vQHNvdS5mYWUuYnIiLCJyb2xlIjoiUEFUSUVOVCIsImFwcElkIjoxLCJjb3Vyc2VJZCI6MSwiaWF0IjoxNzc3OTQwNjYzLCJleHAiOjE3Nzc5NDE1NjN9.jf4x97itpznaul08LDPenv8Y4VA32q8JEUSrQMmSqBE')
      const access_token = await SecureStore.getItemAsync('userToken')

      if(access_token){
      console.log('Tem token')

      const payload = jwtDecode(access_token)
      const dateNow = Math.floor(Date.now() / 1000)

      if(payload.exp && payload.exp < dateNow){
        console.log('Token expirou. Fazendo logout...')
        await SecureStore.deleteItemAsync('userToken')

        router.replace('/(auth)/Login')
      }else{
        return router.replace('/(app)/paginaPrincipal')
      }
    }else{
      return router.replace('/(auth)/Login')
    }
    }catch(e){
      console.log(e)
    }

  }
    verifyLogin()
  }, [])

  return null
}