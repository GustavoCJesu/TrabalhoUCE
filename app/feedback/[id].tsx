// app/feedback/[id].tsx

import {
  StyleSheet, Text, View, TextInput,
  TouchableOpacity, ScrollView, Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';

// --- Tipos fora do componente ---
// Tipar o nível aqui evita erros de "nivelSelecionado === nivel.score"
// quando o score é 0 (falsy) — um bug clássico com useState<number | null>
type Nivel = {
  img: keyof typeof MaterialIcons.glyphMap;
  tit: string;
  subtit: string;
  score: number;
};

type CardProps = Nivel & {
  selected: boolean;
  onPress: () => void;
};

// --- Dados estáticos fora do componente ---
// Se ficassem dentro, seriam recriados a cada re-render sem motivo
const NIVEIS: Nivel[] = [
  { img: 'mood',                       tit: 'Sem dor / esforço', subtit: 'Absolutamente confortável',       score: 0  },
  { img: 'sentiment-satisfied',        tit: 'Leve',              subtit: 'Atividade tranquila e sustentável', score: 2  },
  { img: 'sentiment-neutral',          tit: 'Moderado',          subtit: 'Senti o esforço, mas sem dor',     score: 5  },
  { img: 'sentiment-dissatisfied',     tit: 'Intenso',           subtit: 'Exigiu bastante concentração',     score: 8  },
  { img: 'sentiment-very-dissatisfied',tit: 'Exaustão',          subtit: 'Limite físico atingido',           score: 10 },
];

// --- Componente Card separado e limpo ---
// Removemos os estilos inline e centralizamos no StyleSheet
// Isso melhora performance: objetos inline são recriados a cada render
function Card({ img, tit, subtit, score, selected, onPress }: CardProps) {
  return (
    <TouchableOpacity
      style={[styles.card, selected && styles.cardSelecionado]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <MaterialIcons
        name={img}
        size={36}
        color={selected ? '#10B981' : '#9CA3AF'}
      />
      <View style={styles.cardBody}>
        <Text style={styles.cardTit}>{tit}</Text>
        <Text style={styles.cardSubtit}>{subtit}</Text>
      </View>
      <Text style={[styles.cardScore, selected && styles.cardScoreSelecionado]}>
        {score}
      </Text>
    </TouchableOpacity>
  );
}

export default function FeedbackScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  // Usando null para "nenhum selecionado" — mas atenção:
  // nivelSelecionado === 0 é VÁLIDO (score 0 existe), então a checagem
  // precisa ser "=== null" e não simplesmente "!nivelSelecionado"
  const [nivelSelecionado, setNivelSelecionado] = useState<number | null>(null);
  const [observacao, setObservacao] = useState('');

  const salvarFeedback = () => {
    if (nivelSelecionado === null) {
      Alert.alert('Atenção', 'Selecione como você se sente antes de salvar.');
      return;
    }
    Alert.alert(
      'Feedback enviado!',
      'Obrigado por avaliar sua sessão.',
      [{ text: 'OK', onPress: () => router.replace('/(tabs)/home') }]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* Badge "Sessão finalizada" — mais elegante que texto solto em uppercase */}
      <View style={styles.badgeWrapper}>
        <View style={styles.badge}>
          <Text style={styles.badgeTexto}>Sessão finalizada</Text>
        </View>
      </View>

      <Text style={styles.titulo}>Como você se sente?</Text>
      <Text style={styles.descricao}>
        Avalie seu nível de dor e esforço após o exercício para que possamos
        ajustar seu plano.
      </Text>

      {NIVEIS.map((nivel) => (
        <Card
          key={nivel.score}
          {...nivel}
          selected={nivelSelecionado === nivel.score}
          onPress={() => setNivelSelecionado(nivel.score)}
        />
      ))}

      <Text style={styles.sectionLabel}>Observações adicionais</Text>
      <TextInput
        style={styles.textarea}
        multiline
        value={observacao}
        onChangeText={setObservacao}
        placeholder="Descreva qualquer desconforto ou comentário sobre os exercícios de hoje"
        placeholderTextColor="#6B7280"
        textAlignVertical="top"
      />

      <TouchableOpacity
        style={styles.botao}
        onPress={salvarFeedback}
        activeOpacity={0.85}
      >
        <Text style={styles.botaoTexto}>Salvar feedback</Text>
      </TouchableOpacity>

      <View style={{ height: 80 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    paddingTop: 40,
    paddingHorizontal: 20,
  },

  // --- Badge "Sessão finalizada" ---
  // Substituímos o texto uppercase solto por um pill colorido
  // Comunica o mesmo mas com muito mais hierarquia visual
  badgeWrapper: {
    alignItems: 'center',
    marginBottom: 12,
  },
  badge: {
    backgroundColor: '#064E3B', // verde bem escuro, combina com o verde principal
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 20,
  },
  badgeTexto: {
    color: '#10B981',
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },

  titulo: {
    textAlign: 'center',
    color: '#F9FAFB',
    fontWeight: '500',
    fontSize: 26,
  },
  descricao: {
    marginTop: 8,
    marginBottom: 24,
    color: '#6B7280',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
  },

  // --- Cards ---
  card: {
    marginBottom: 10,
    backgroundColor: '#1F2937',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  cardSelecionado: {
    borderColor: '#10B981',
  },
  cardBody: {
    flex: 1,
  },
  cardTit: {
    color: '#F9FAFB',
    fontSize: 15,
    fontWeight: '500',
  },
  cardSubtit: {
    color: '#6B7280',
    fontSize: 13,
    marginTop: 2,
  },
  cardScore: {
    color: '#6B7280',
    fontSize: 26,
    fontWeight: '500',
    minWidth: 28,
    textAlign: 'right',
  },
  cardScoreSelecionado: {
    color: '#10B981',
  },

  // --- Seção de observações ---
  sectionLabel: {
    color: '#6B7280',
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginTop: 24,
    marginBottom: 10,
  },
  textarea: {
    backgroundColor: '#1F2937',
    borderWidth: 0.5,
    borderColor: '#374151',
    borderRadius: 12,
    padding: 14,
    color: '#F9FAFB',
    fontSize: 14,
    minHeight: 110,
    lineHeight: 22,
  },

  // --- Botão ---
  botao: {
    marginTop: 20,
    backgroundColor: '#10B981',
    paddingVertical: 16,
    borderRadius: 12,
  },
  botaoTexto: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
    textAlign: 'center',
  },
});