import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type cardImg ={
  img: keyof typeof MaterialIcons.glyphMap;
  tit: string,
  subtit: string,
  score: number
}

function Card({img, tit, subtit, score}: cardImg) {
  return (
    <TouchableOpacity style={styles.card}>
      <MaterialIcons name={img} size={50} color='#F9FAFB'/>
      <View style={{marginLeft: 15, paddingVertical: 10}}>
        <Text style={{color: '#F9FAFB', fontSize: 20}}>{tit}</Text>
        <Text style={{color: 'gray', fontSize: 16}}>{subtit}</Text>
      </View>
      <View style={{flex: 1, alignItems: 'flex-end', marginRight: 10}}>
        <Text style={{color: 'gray', fontSize: 30}}>{score}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function FeedbackScreen() {
  
  return (
    <ScrollView style={styles.container}>
        <Text style={styles.subtitulo}>SESSÃO FINALIZADA</Text>
        <Text style={styles.titulo}>Como você se sente?</Text>
        <Text style={styles.txt}>
          Avalie seu nivel de dor e esforço após o exercicio para que possamos
          ajustar seu plano.
        </Text>
        <Card img="mood" tit="Sem Dor/Esforço" subtit="Absolutamente confortável" score={0}/>
        <Card img="sentiment-satisfied" tit="Leve" subtit={"Atividade tranquila e \nsustentavel"} score={2}/>
        <Card img="sentiment-neutral" tit="Moderado" subtit={"Senti o esforço, mas sem \ndor"} score={5}/>
        <Card img="sentiment-dissatisfied" tit="Intenso" subtit={"Exigiu bastante \nconcentração"} score={8}/>
        <Card img="sentiment-very-dissatisfied" tit="Exaustão" subtit={"Limite fisico atingido"} score={10}/>
        <Text style={{color: '#F9FAFB', fontSize: 24, marginTop: 40}}>Observações adicionais</Text>
        <TextInput style={styles.campos} multiline placeholder={"Descreva qualquer desconforto específico ou comentário sobre os exercícios de hoje"}/>
        <TouchableOpacity style={styles.botao}>
          <Text style={{fontSize: 18, color: '#F9FAFB', fontWeight: 'bold', textAlign: 'center'}}>Salvar Feedback</Text>
        </TouchableOpacity>
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
    fontSize: 18
  },
  botao: {
    textAlign: 'center',
    marginTop: 60,
    backgroundColor: '#10B981',
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 5,
  },
  card: {
    marginTop: 40,
    backgroundColor: '#1F2937',
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
