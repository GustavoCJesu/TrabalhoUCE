import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react'; 

export default function ChatScreen() {
  // Mock dos dados que viriam da API para mensagens de texto, simulei o esquerda = e, direita = d, porém poderia ter validações de acordo com cada usuario conforme forem os dados
  const [dados, setDados] = useState([{mensagem: "Olá, como vai?", id: "1", user: "e"}, {mensagem: "Bem e vc?", id: "2", user: "d"}])

  const renderItem = ({ item }) => {
    if (item.user == "e"){
      return (
        <View style={[styles.campoTexto, {backgroundColor: 'white'}]}>
          {/* Variavel para mensagem na esquerda */}
          <Text style={{color: 'black', fontSize: 16}}>{item.mensagem}</Text>
        </View>
      )
    } else if (item.user == "d"){
      return (
        <View style={{alignSelf: 'flex-end'}}>
          <View style={[styles.campoTexto, {backgroundColor: '#D6D6D6'}]}>
            {/* Variavel para mensagem na direita */}
            <Text style={{color: 'black', fontSize: 16}}>{item.mensagem}</Text>
          </View>
        </View>
      )
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Fale com um especialista</Text>
      <ScrollView style={styles.card}>
        <FlatList
            data={dados}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
      </ScrollView>
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 16}}>
        <TextInput style={styles.campos}></TextInput>
        
        {/* Aqui entraria o envio para o banco de dados e depois a renderização da mensagem na tela */}
        <TouchableOpacity style={styles.botao}><Ionicons name='arrow-forward-outline' size={30} color='#F9FAFB'/></TouchableOpacity>
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
