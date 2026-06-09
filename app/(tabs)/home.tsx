import { useHome } from '@/src/presentation/hooks/useHome';
import { useProfile } from '@/src/presentation/hooks/useProfile';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Image, StyleSheet, Text, TouchableOpacity,
  View, ScrollView, ActivityIndicator,
} from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const getProgressMessage = (percent: number) => {
  if (percent <= 25) return 'Você precisa se exercitar mais';
  if (percent <= 50) return 'Você está indo bem';
  return 'Parabéns pelo resultado da semana!';
};


const getExerciseLabel = (total: number) => {
  if (total === 0) return 'Nenhum exercício';
  return total === 1 ? '1 exercício' : `${total} exercícios`;
};

const getInitials = (name: string) =>
  name.split(' ').slice(0, 2).map(n => n[0].toUpperCase()).join('');

export default function HomeScreen() {
  const { home, loading, error } = useHome();
  const { profile } = useProfile();
  const router = useRouter();

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#10B981" />
      </SafeAreaView>
    );
  }

  if (error || !profile || !home) {
    return (
      <SafeAreaView style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>{error ?? 'Erro ao carregar'}</Text>
        <TouchableOpacity
          style={styles.botao}
          onPress={() => router.replace('/(auth)/Login')}
        >
          <Text style={styles.txtBotao}>Ir para o login</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const firstName = profile.profile.name.split(' ')[0];
  const initials = getInitials(profile.profile.name);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.pageContent}>

          {/* Header com avatar e notificação */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{initials}</Text>
              </View>
              <View>
                <Text style={styles.titulo}>Olá, {firstName}!</Text>
                <Text style={styles.motivacao}>{home.motivation.message}</Text>
              </View>
            </View>
            <TouchableOpacity hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Ionicons name="notifications-outline" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {/* Cards de estatística rápida */}
          <View style={styles.statRow}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Semana atual</Text>
              <Text style={styles.statValue}>
                {home.plan.totalExercises}
                <Text style={styles.statUnit}> sessões</Text>
              </Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Progresso</Text>
              <Text style={styles.statValue}>
                {home.plan.percentCompleted}
                <Text style={styles.statUnit}>%</Text>
              </Text>
            </View>
          </View>

          {/* Plano de hoje */}
          <Text style={styles.sectionLabel}>Plano de hoje</Text>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTit}>Exercícios</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeTexto}>
                  {getExerciseLabel(home.plan.totalExercises)}
                </Text>
              </View>
            </View>
            <View style={styles.exerciseBlock}>
              <View style={styles.exerciseBlockRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.exerciseName}>{home.nextExercise.exerciseName}</Text>
                  <Text style={styles.exerciseSub}>{home.nextExercise.problem}</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#6B7280" />
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.botao} activeOpacity={0.85} onPress={ ()=>{router.push('/(tabs)/exercises')}}>
            <Text style={styles.txtBotao}>Iniciar exercício</Text>
          </TouchableOpacity>

          {/* Progresso semanal */}
          <Text style={styles.sectionLabel}>Seu progresso</Text>
          <View style={styles.card}>
            <View style={styles.progressRow}>
              <AnimatedCircularProgress
                size={80}
                width={8}
                fill={home.plan.percentCompleted}
                tintColor="#10B981"
                backgroundColor="#3d5875"
              >
                {(fill:number) => (
                  <Text style={styles.progressPercent}>
                    {Math.round(fill)}%
                  </Text>
                )}
              </AnimatedCircularProgress>
              <View style={{ flex: 1 }}>
                <Text style={styles.progressMsg}>
                  {getProgressMessage(home.plan.percentCompleted)}
                </Text>
                <Text style={styles.progressSub}>
                  {home.plan.totalExercises} exercícios no plano
                </Text>
              </View>
            </View>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorText: {
    color: '#F9FAFB',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  pageContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 120,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#064E3B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#10B981',
    fontSize: 16,
    fontWeight: '500',
  },
  titulo: {
    color: '#F9FAFB',
    fontSize: 18,
    fontWeight: '500',
  },
  motivacao: {
    color: '#6B7280',
    fontSize: 13,
    marginTop: 2,
  },

  statRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 4,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 14,
  },
  statLabel: {
    color: '#6B7280',
    fontSize: 11,
    marginBottom: 4,
  },
  statValue: {
    color: '#F9FAFB',
    fontSize: 22,
    fontWeight: '500',
  },
  statUnit: {
    color: '#6B7280',
    fontSize: 13,
    fontWeight: '400',
  },

  sectionLabel: {
    color: '#6B7280',
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginTop: 20,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTit: {
    color: '#F9FAFB',
    fontSize: 15,
    fontWeight: '500',
  },
  badge: {
    backgroundColor: '#064E3B',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },
  badgeTexto: {
    color: '#10B981',
    fontSize: 12,
    fontWeight: '500',
  },
  exerciseBlock: {
    backgroundColor: '#374151',
    borderRadius: 12,
    padding: 14,
    marginTop: 12,
  },
  exerciseBlockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  exerciseName: {
    color: '#F9FAFB',
    fontSize: 14,
    fontWeight: '500',
  },
  exerciseSub: {
    color: '#6B7280',
    fontSize: 13,
    marginTop: 3,
  },

  botao: {
    backgroundColor: '#10B981',
    paddingVertical: 15,
    borderRadius: 12,
    marginBottom: 4,
  },
  txtBotao: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '500',
    textAlign: 'center',
  },

  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  progressPercent: {
    color: '#F9FAFB',
    fontSize: 13,
    fontWeight: '500',
  },
  progressMsg: {
    color: '#F9FAFB',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  progressSub: {
    color: '#6B7280',
    fontSize: 12,
    marginTop: 4,
  },
});