import { Redirect } from 'expo-router';
import React from 'react';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'
import * as SecureStore from 'expo-secure-store';




export default function Home() {

  const verifyLogin = async ()=>{

    const access_token = SecureStore.getItemAsync('userToken')
    
    if(await access_token){
      console.log('Tem token')


    }else{
      return <Redirect href="/(auth)/Login" />;
    }

  }
  
}