import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router'
import * as SecureStore from 'expo-secure-store'

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const router = useRouter()


  interface Usuario {
    id: string
    nome: string
    email: string
    senha: string
  }

  async function login() {
    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos.')
      return
    }

    const raw = await SecureStore.getItemAsync('usuarios')
    const usuarios: Usuario[] = raw ? JSON.parse(raw) : []

    const usuario = usuarios.find(
      u => u.email === email.toLowerCase().trim() && u.senha === senha
    )

    if (!usuario) {
      Alert.alert('Erro', 'E-mail ou senha incorretos.')
      return
    }

    router.push('/(app)/paginaPrincipal')
  }


  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push('/(recover)/recAcesso')}>
        <Text style={{ color: 'white' }}>
          Tela de Recuperação de Acesso
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/(recover)/recSenha')}>
        <Text style={{ color: 'white' }}>
          Tela de Recuperação de Senha
        </Text>
      </TouchableOpacity>
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