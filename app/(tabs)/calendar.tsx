import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import React, { useState } from 'react';

type Agendamento = {
  data: string;
  descricao: string;
  tipo: 'consulta' | 'retorno'; 
};

const MOCK_DADOS: Agendamento[] = [
  { data: '2026-06-15', descricao: 'Consulta', tipo: 'consulta' },
  { data: '2026-06-22', descricao: 'Retorno', tipo: 'retorno' },
];

const TIPO_CONFIG = {
  consulta: { dot: '#2563eb', label: 'Consulta' },
  retorno:  { dot: '#10B981', label: 'Retorno'  },
};

export default function CalendarScreen() {
  const [dataSelecionada, setDataSelecionada] = useState(
    new Date().toISOString().split('T')[0]
  );
  const markedDates = MOCK_DADOS.reduce<Record<string, object>>((acc, item) => {
    acc[item.data] = {
      marked: true,
      dotColor: TIPO_CONFIG[item.tipo].dot,
    };
    return acc;
  }, {
    [dataSelecionada]: { selected: true, selectedColor: '#2563eb' },
  });

  const formatarData = (dataStr: string) => {
    const [ano, mes, dia] = dataStr.split('-').map(Number);
    return new Intl.DateTimeFormat('pt-BR', {
      day: 'numeric',
      month: 'long',
    }).format(new Date(ano, mes - 1, dia));
  };

  const diasRestantes = (dataStr: string) => {
    const hoje = new Date();
    const [ano, mes, dia] = dataStr.split('-').map(Number);
    const alvo = new Date(ano, mes - 1, dia);
    const diff = Math.ceil((alvo.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? `${diff} dias` : 'Hoje';
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Calendário</Text>
      <Text style={styles.subtitulo}>
        {new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' })
          .format(new Date())
          .replace(/^\w/, c => c.toUpperCase())}
      </Text>

      <Calendar
        style={styles.cardCalendar}
        onDayPress={(day) => setDataSelecionada(day.dateString)}
        markedDates={markedDates}
        theme={{
          textSectionTitleColor: '#9CA3AF',
          selectedDayBackgroundColor: '#2563eb',
          selectedDayTextColor: '#fff',
          dayTextColor: '#111827',
          textDisabledColor: '#D1D5DB',
          arrowColor: '#2563eb',
          monthTextColor: '#111827',
          textMonthFontWeight: '500',
          textMonthFontSize: 17,
          textDayFontSize: 14,
          textDayHeaderFontSize: 11,
        }}
      />

      <View style={styles.legenda}>
        {Object.entries(TIPO_CONFIG).map(([key, cfg]) => (
          <View key={key} style={styles.legendaItem}>
            <View style={[styles.legendaDot, { backgroundColor: cfg.dot }]} />
            <Text style={styles.legendaTexto}>{cfg.label}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionLabel}>Próximos agendamentos</Text>
      <View style={styles.agendaCard}>
        {MOCK_DADOS.map((item, index) => (
          <View
            key={item.data}
            style={[
              styles.agendaItem,
              index < MOCK_DADOS.length - 1 && styles.agendaItemBorder,
            ]}
          >
            <View style={[styles.agendaDot, { backgroundColor: TIPO_CONFIG[item.tipo].dot }]} />
            <View style={{ flex: 1 }}>
              <Text style={styles.agendaDesc}>{item.descricao}</Text>
              <Text style={styles.agendaData}>{formatarData(item.data)}</Text>
            </View>
            <Text style={styles.agendaContagem}>{diasRestantes(item.data)}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  titulo: {
    textAlign: 'center',
    color: '#F9FAFB',
    fontWeight: '500',
    fontSize: 28,
  },
  subtitulo: {
    textAlign: 'center',
    color: '#6B7280',
    fontSize: 13,
    marginTop: 4,
    marginBottom: 24,
  },
  cardCalendar: {
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: '#fff',
    overflow: 'hidden', 
  },
 
  legenda: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 16,
    marginTop: 10,
  },
  legendaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  legendaDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  legendaTexto: {
    color: '#6B7280',
    fontSize: 11,
  },
  sectionLabel: {
    color: '#6B7280',
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginTop: 24,
    marginBottom: 10,
  },
  agendaCard: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 32,
  },
  agendaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  agendaItemBorder: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#374151',
  },
  agendaDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  agendaDesc: {
    color: '#F9FAFB',
    fontSize: 14,
  },
  agendaData: {
    color: '#9CA3AF',
    fontSize: 12,
    marginTop: 2,
  },
  agendaContagem: {
    color: '#6B7280',
    fontSize: 12,
  },
});