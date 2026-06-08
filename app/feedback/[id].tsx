// app/feedback/[id].tsx

import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';

type CardImg = {
  img: keyof typeof MaterialIcons.glyphMap;
  tit: string;
  subtit: string;
  score: number;
  selected: boolean;
  onPress: () => void;
};

function Card({ img, tit, subtit, score, selected, onPress }: CardImg) {
  return (
    <TouchableOpacity
      style={[styles.card, selected && styles.cardSelecionado]}
      onPress={onPress}
    >
      <MaterialIcons name={img} size={50} color={selected ? '#10B981' : '#F9FAFB'} />
      <View style={{ marginLeft: 15, paddingVertical: 10 }}>
        <Text style={{ color: '#F9FAFB', fontSize: 20 }}>{tit}</Text>
        <Text style={{ color: 'gray', fontSize: 16 }}>{subtit}</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'flex-end', marginRight: 10 }}>
        <Text style={{ color: selected ? '#10B981' : 'gray', fontSize: 30 }}>{score}</Text>
      </View>
    </TouchableOpacity>
  );
}

const niveis = [
  { img: 'mood' as const, tit: 'Sem Dor/Esforço', subtit: 'Absolutamente confortável', score: 0 },
  { img: 'sentiment-satisfied' as const, tit: 'Leve', subtit: 'Atividade tranquila e \nsustentavel', score: 2 },
  { img: 'sentiment-neutral' as const, tit: 'Moderado', subtit: 'Senti o esforço, mas sem \ndor', score: 5 },
  { img: 'sentiment-dissatisfied' as const, tit: 'Intenso', subtit: 'Exigiu bastante \nconcentração', score: 8 },
  { img: 'sentiment-very-dissatisfied' as const, tit: 'Exaustão', subtit: 'Limite fisico atingido', score: 10 },
];

export default function FeedbackScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [nivelSelecionado, setNivelSelecionado] = useState<number | null>(null);
  const [observacao, setObservacao] = useState('');

  const salvarFeedback = () => {
    if (nivelSelecionado === null) {
      Alert.alert('Atenção', 'Selecione como você se sente antes de salvar.');
      return;
    }

    // MOCK: aqui no futuro entraria o POST do feedback pra API.
    Alert.alert(
      'Feedback enviado!',
      'Obrigado por avaliar sua sessão.',
      [
        {
          text: 'OK',
          onPress: () => router.replace('/(tabs)/home'),
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.subtitulo}>SESSÃO FINALIZADA</Text>
      <Text style={styles.titulo}>Como você se sente?</Text>
      <Text style={styles.txt}>
        Avalie seu nivel de dor e esforço após o exercicio para que possamos
        ajustar seu plano.
      </Text>

      {niveis.map((nivel) => (
        <Card
          key={nivel.score}
          img={nivel.img}
          tit={nivel.tit}
          subtit={nivel.subtit}
          score={nivel.score}
          selected={nivelSelecionado === nivel.score}
          onPress={() => setNivelSelecionado(nivel.score)}
        />
      ))}

      <Text style={{ color: '#F9FAFB', fontSize: 24, marginTop: 40 }}>
        Observações adicionais
      </Text>
      <TextInput
        style={styles.campos}
        multiline
        value={observacao}
        onChangeText={setObservacao}
        placeholder="Descreva qualquer desconforto específico ou comentário sobre os exercícios de hoje"
      />

      <TouchableOpacity style={styles.botao} onPress={salvarFeedback}>
        <Text style={{ fontSize: 18, color: '#F9FAFB', fontWeight: 'bold', textAlign: 'center' }}>
          Salvar Feedback
        </Text>
      </TouchableOpacity>

      <View style={{ height: 80 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  titulo: {
    textAlign: 'center',
    color: '#F9FAFB',
    fontWeight: 'bold',
    fontSize: 32,
  },
  subtitulo: {
    textAlign: 'center',
    color: '#10B981',
    fontSize: 24,
  },
  txt: {
    marginTop: 10,
    color: 'gray',
    fontSize: 20,
    textAlign: 'center',
  },
  campos: {
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    height: 150,
    backgroundColor: 'white',
    fontSize: 18,
    padding: 12,
    textAlignVertical: 'top',
  },
  botao: {
    marginTop: 40,
    backgroundColor: '#10B981',
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 5,
  },
  card: {
    marginTop: 20,
    backgroundColor: '#1F2937',
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cardSelecionado: {
    borderColor: '#10B981',
  },
});
