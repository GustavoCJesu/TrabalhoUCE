import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import React, { useState } from 'react';

LocaleConfig.locales['pt-br'] = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ],
  monthNamesShort: [
    'Jan.',
    'Fev.',
    'Mar.',
    'Abr.',
    'Mai.',
    'Jun.',
    'Jul.',
    'Ago.',
    'Set.',
    'Out.',
    'Nov.',
    'Dez.'
  ],
  dayNames: [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado'
  ],
  dayNamesShort: [
    'Dom.',
    'Seg.',
    'Ter.',
    'Qua.',
    'Qui.',
    'Sex.',
    'Sáb.'
  ],
  today: 'Hoje'
};

LocaleConfig.defaultLocale = 'pt-br';

export default function CalendarScreen() {

  type Agendamento = {
    data: string
    descricao: string
  }
  // Só uma variavel pra permitir o usuario de selecionar o dia, pode ser usada posteriormente para marcar consultas
  const [dataSelecionada, setDataSelecionada] = useState(new Date().toISOString().split('T')[0])

  // Fiz um mock dos dados que viriam da API
  const [dados, setDados] = useState([
    { data: "2026-06-15", descricao: "Consulta as 16h" },
    { data: "2026-06-22", descricao: "Retorno as 14h" }
  ])

  const renderItem = ({ item }: { item: Agendamento }) => {
    return (
      <View style={{ marginTop: 8, flexDirection: 'row' }}>
        {/* Variavel de data traduzida pra dd/MM/yyyy */}
        <Text style={{ color: '#D6D6D6', fontSize: 16 }}>{item.data.split('-').reverse().join('/')} - </Text>
        <Text style={{ color: '#D6D6D6', fontSize: 16 }}>{item.descricao}</Text>
      </View>
    )
  }

  const Card = ({ dados }: { dados: Agendamento[] }) => {
    return (
      <View style={styles.card}>
        <View style={{ paddingVertical: 10 }}>
          <Text style={{ color: '#F9FAFB', fontSize: 20, marginBottom: 12, textAlign: 'center' }}>Agenda</Text>
          {dados.map((item) => (
            <View key={item.data} style={{ marginTop: 8, flexDirection: 'row' }}>
              <Text style={{ color: '#D6D6D6', fontSize: 16 }}>{item.data.split('-').reverse().join('/')} - </Text>
              <Text style={{ color: '#D6D6D6', fontSize: 16 }}>{item.descricao}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  }


  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Calendário</Text>
      <View style={{ marginVertical: 16 }}></View>
      <Calendar style={styles.cardCalendar}
        onDayPress={(day) => {
          setDataSelecionada(day.dateString)
        }}
        markedDates={{
          [dataSelecionada]: {
            selected: true,
            selectedColor: 'blue'
          },
          // Aqui entraria os dados da API e ou fariamos modificações para os pacientes conseguirem marcar consultas
          '2026-06-15': {
            marked: true,
            dotColor: 'blue'
          },
          '2026-06-22': {
            marked: true,
            dotColor: 'green'
          }
        }}
        theme={{
          textSectionTitleColor: '#666',
          selectedDayBackgroundColor: '#2563eb',
          selectedDayTextColor: '#fff',

          dayTextColor: '#222',
          textDisabledColor: '#ccc',

          arrowColor: '#2563eb',

          monthTextColor: '#111',
          textMonthFontWeight: 'bold',
          textMonthFontSize: 20,

          textDayFontSize: 16,
          textDayHeaderFontSize: 13.5,
        }}
      />

      <Card dados={dados} />
    </ScrollView>
  )
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
  cardCalendar: {
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 16,
  },
  card: {
    marginTop: 20,
    backgroundColor: '#1F2937',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
});
