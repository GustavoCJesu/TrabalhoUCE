import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [userName, setUserName] = useState('')
  const [nExe, setNExe] = useState(0)
  const [exes, setExes] = useState<user>({
    nome: '',
    detalhe: ''
  })
  const [temp, setTemp] = useState(0)
  const [status, setStatus] = useState(0)

  type user = {
    nome: string,
    detalhe: string,

  }


  useEffect(() => {
    setUserName('Igor')
    setNExe(1)
    setExes({
      nome: 'Mobilidade de ombro',
      detalhe: 'Pós cirurgico - Câncer de mama'
    })
    setTemp(12)
    setStatus(50)

  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.pageContent}>
          <View style={[styles.sec1, { marginBottom: 40 }]}>
            <View>
              <Text style={styles.titulo}>Olá, {userName}!</Text>
              <Text style={styles.subtitulo}>Seu cuidado diário{'\n'}faz toda a diferença na{'\n'}sua recuperação</Text>
            </View>
            <Image
              style={styles.imgCard}
              source={require('../../assets/images/favicon.png')}
              resizeMode="contain"
            />
          </View>
          <View style={styles.card}>
            <View style={styles.sec1}>
              <Text style={styles.cardTit}>Seu plano de hoje</Text>
              <Text style={styles.nExe}>{nExe === 0 ? 'Nenhum exercicio' : nExe > 1 ? nExe + ' exercícios' : nExe + ' exercício'}</Text>
            </View>
            <View style={styles.itemCard}>
              <Text style={styles.cardTit}>{exes.nome}</Text>
              <Text style={[styles.subtitulo, { marginBottom: 20 }]}>{exes.detalhe}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="time-outline" size={30} color="#10B981" />
                <Text style={[styles.nExe, { marginBottom: 5, marginLeft: 5 }]}>{temp} minutos</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.botao}>
            <Text style={styles.txtBotao}>Iniciar exercício</Text>
          </TouchableOpacity>
          <View style={styles.card}>
            <Text style={styles.cardTit}>Seu progresso</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginTop: 20 }}>
              <AnimatedCircularProgress
                size={100}
                width={10}
                fill={status}
                tintColor="#10B981"
                backgroundColor="#3d5875">
                {
                  (fill: number) => (
                    <Text style={styles.cardTit}>
                      {status} %
                    </Text>
                  )
                }
              </AnimatedCircularProgress>
              <Text style={styles.cardTit}>{status <= 25 ? 'Você precisa se exercitar' : status <= 50 ? 'Você está indo bem' : 'Parabens pelo resultado da semana'}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#111827',
    paddingHorizontal: 20,
  },
  pageContent:{
    marginHorizontal:10,
    marginBottom:120,
    marginTop: 20
  },
  sec1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  titulo: {
    color: '#F9FAFB',
    fontWeight: 'bold',
    fontSize: 22
  },
  cardTit: {
    color: '#F9FAFB',
    fontWeight: 'bold',
    fontSize: 16
  },
  imgCard: {
    width: 100,
    height: 100,
  },
  subtitulo: {
    marginTop: 5,
    fontSize: 15,
    color: 'gray',
  },
  itemCard: {
    marginTop: 30,
    backgroundColor: '#374151',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 10,
  },
  nExe: {
    color: '#10B981',
    fontSize: 16,
  },
  botao: {
    marginTop: 20,
    marginBottom: 20,
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
    paddingVertical: 20,
    borderRadius: 10,
  }
});
