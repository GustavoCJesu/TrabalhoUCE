import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react'; 
import { useRouter } from 'expo-router';

export default function RecSenha() {
  const [email, setEmail] = useState('')

  const router = useRouter()

  return (
    <View style={styles.container}>
      <View style={{marginBottom: 40}}>
        <Text style={styles.titulo}>Recuperar Senha</Text>
        <Text style={styles.subtitulo}>Insira seu e-mail para receber um código de 8 dígitos para redefinir sua conta</Text>
      </View>
      <View style={styles.card}>
        <View style={{}}>
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.campos} onChangeText={email => setEmail(email)} value={email} placeholder="nome@exemplo.com.br" keyboardType="email-address"/>
        </View>
        <TouchableOpacity style={styles.botao}>
          <Text style={styles.txtBotao}>Enviar código</Text> 
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop: 20}} onPress={() => router.replace('/(auth)/Login')}>
          <Text style={{fontSize: 14, color: '#F9FAFB', fontWeight: 'bold', textAlign: 'right'}}>Voltar ao login</Text> 
        </TouchableOpacity>
      </View>

      <View style={styles.cardInfo}>
        <Text style={{fontWeight: 'bold', fontSize: 16}}>Informação Importante</Text>
        <Text style={{marginTop: 10, fontSize: 14}}>Por motivos de segurança, o código de recuperação expira em 15 minutos. Verifique sua caixa de spam caso não receba o e-mail em instantes.</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#111827',
    paddingBottom: 50,
    paddingHorizontal: 20
  },
  titulo: {
    color: '#F9FAFB',
    fontWeight: 'bold', 
    fontSize: 24,
    textAlign: 'center'
  },
  subtitulo: {
    marginTop: 5, 
    fontSize: 16, 
    color: 'gray', 
    textAlign: 'center'
  },
  label: {
    color: '#F9FAFB',
    fontSize: 16,
    marginBottom: 5
  },
  campos: {
    borderWidth: 1, 
    borderRadius: 5, 
    height: 40,
    textAlign: 'center',
    marginBottom: 20,
    backgroundColor: 'white',
  },
  botao: {
    textAlign: 'center',
    backgroundColor: '#10B981',
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 5
  },
  txtBotao: {
    fontSize: 14, 
    color: '#F9FAFB', 
    fontWeight: 'bold', 
    textAlign: 'center'
  },
  card: {
    backgroundColor: '#1F2937',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 10,
  },
  cardInfo: {
    marginTop: 40,
    backgroundColor: '#657894',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 10,
  }
});