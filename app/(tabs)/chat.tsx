import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useProfile } from '@/src/presentation/hooks/useProfile';

type Mensagem = {
  mensagem: string
  id: string
  user: string
}

export default function ChatScreen() {

  const { profile } = useProfile()

  const [dados, setDados] = useState<Mensagem[]>([
    { mensagem: "Olá, como vai?", id: "1", user: "e" },
    { mensagem: "Bem e vc?", id: "2", user: "d" }
  ])

  // NOVO: guarda o texto que está sendo digitado no campo
  const [texto, setTexto] = useState('')

  // NOVO: função que envia a mensagem
  const enviarMensagem = () => {
    // não envia se o campo estiver vazio (ou só com espaços)
    if (texto.trim() === '') {
      return
    }

    // monta a nova mensagem (user "d" = direita, como se fosse o próprio usuário)
    const novaMensagem: Mensagem = {
      mensagem: texto,
      id: Date.now().toString(), // id único simples, baseado na hora atual
      user: "d"
    }

    // adiciona a nova mensagem à lista existente:
    // [...dados] copia as mensagens que já existem, e adiciona a nova no fim
    setDados([...dados, novaMensagem])

    // limpa o campo de texto após enviar
    setTexto('')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Fale com {profile?.coordinator.name ?? 'seu responsável'}
      </Text>
      <ScrollView style={styles.card}>
        {dados.map((item) => {
          if (item.user === "e") {
            return (
              <View key={item.id} style={[styles.campoTexto, { backgroundColor: 'white' }]}>
                <Text style={{ color: 'black', fontSize: 16 }}>{item.mensagem}</Text>
              </View>
            )
          } else {
            return (
              <View key={item.id} style={{ alignSelf: 'flex-end' }}>
                <View style={[styles.campoTexto, { backgroundColor: '#D6D6D6' }]}>
                  <Text style={{ color: 'black', fontSize: 16 }}>{item.mensagem}</Text>
                </View>
              </View>
            )
          }
        })}
      </ScrollView>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
        {/* NOVO: o campo agora está ligado ao estado "texto" */}
        <TextInput
          style={styles.campos}
          value={texto}
          onChangeText={setTexto}
          placeholder="Digite sua mensagem..."
        />

        {/* NOVO: o botão agora chama enviarMensagem */}
        <TouchableOpacity style={styles.botao} onPress={enviarMensagem}>
          <Ionicons name='arrow-forward-outline' size={30} color='#F9FAFB' />
        </TouchableOpacity>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    paddingVertical: 30,
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  campos: {
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 16,
    height: 40,
    backgroundColor: 'white',
    width: 280
  },
  botao: {
    backgroundColor: '#10B981',
    paddingHorizontal: 20,
    paddingVertical: 3.5,
    borderRadius: 5,
    marginLeft: 8
  },
  titulo: {
    textAlign: 'center',
    color: '#F9FAFB',
    fontWeight: 'bold',
    fontSize: 26,
    marginBottom: 16
  },
  card: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#1F2937',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  campoTexto: {
    marginVertical: 16,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignSelf: 'flex-start'
  }
});