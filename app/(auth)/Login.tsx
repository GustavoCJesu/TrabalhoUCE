import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const router = useRouter()

  const login = async () => {

    try {
      const response = await fetch('http://185.217.125.219:3000/api/v1/auth/login', {
        method: 'POST',
        headers: {
          "Accept": 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "email": email,
          "password": senha,
          "accessMode": "APP",
          "appId": 1
        })
      })
      const dados = await response.json()

      


      if(response.ok){
        console.log('logado com sucesso')
        const access_token = dados.access_token

        console.log(access_token)

        SecureStore.setItemAsync('userToken', access_token)

        router.push('/(app)/paginaPrincipal')
        
      }else{
        Alert.alert('Erro no login!', 'Login ou senha incorretos')
      }

      console.log(email)


    } catch (e) {
      console.log('Erro ao fazer o login', e)
    }



  }


  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.titulo}>Bem Vindo ao Unifae Care</Text>
        <Text style={styles.subtitulo}>Entre com suas credenciais para continuar</Text>
        <View style={{ marginTop: 40 }}>
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.campos} onChangeText={email => setEmail(email)} value={email} placeholder="nome@exemplo.com.br" keyboardType="email-address" />
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.label}>Senha</Text>
          <TextInput style={styles.campos} onChangeText={senha => setSenha(senha)} value={senha} placeholder="●●●●●●●●" secureTextEntry={true} />
          <TouchableOpacity style={{ marginTop: 20 }} onPress={() => router.push('/(recover)/recAcesso')}>
            <Text style={styles.recSenha}>Recuperar Senha</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.botao} onPress={login}>
          <Text style={styles.txtBotao}>Entrar</Text>
        </TouchableOpacity>
      </View>

      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <Text style={{ color: '#F9FAFB', fontSize: 16 }}>Não tem uma conta?</Text>
        <TouchableOpacity style={{ marginTop: 10 }} onPress={() => router.replace('/Registrar')}>
          <Text style={styles.recSenha}>Clique aqui</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#111827',
    paddingHorizontal: 20
  },
  titulo: {
    color: '#F9FAFB',
    fontWeight: 'bold',
    fontSize: 22
  },
  subtitulo: {
    marginTop: 5,
    fontSize: 14,
    color: 'gray'
  },
  label: {
    color: '#F9FAFB',
    fontSize: 16,
    marginBottom: 5
  },
  recSenha: {
    color: '#10B981',
    fontSize: 16,
    textAlign: 'right'
  },
  campos: {
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    width: 250,
    textAlign: 'center',
    backgroundColor: 'white',
  },
  botao: {
    marginTop: 60,
    backgroundColor: '#10B981',
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 5
  },
  txtBotao: {
    fontSize: 14,
    color: '#F9FAFB',
    fontWeight: 'bold'
  },
  card: {
    alignItems: 'center',
    backgroundColor: '#1F2937',
    paddingHorizontal: 20,
    paddingVertical: 60,
    borderRadius: 10,
  }
});