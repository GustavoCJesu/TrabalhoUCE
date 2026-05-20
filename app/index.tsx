import { Redirect, useRouter } from 'expo-router';
import { useEffect } from 'react';


import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';




export default function Home() {

  const router = useRouter()

  // useEffect(()=>{
  //   const verifyLogin = async ()=>{

  //   try{
      
  //     const access_token = await SecureStore.getItemAsync('userToken')

  //     if(access_token){
  //     console.log('Tem token')

  //     const payload = jwtDecode(access_token)
  //     const dateNow = Math.floor(Date.now() / 1000)

  //     if(payload.exp && payload.exp < dateNow){
  //       console.log('Token expirou. Fazendo logout...')
  //       await SecureStore.deleteItemAsync('userToken')

  //       router.replace('/(auth)/Login')
  //     }else{
  //       return router.replace('/(app)/paginaPrincipal')
  //     }
  //   }else{
  //     return router.replace('/(auth)/Login')
  //   }
  //   }catch(e){
  //     console.log(e)
  //   }

  // }
  //   verifyLogin()
  // }, [router])

  return <Redirect href={'/(app)/paginaPrincipal'}/>
}