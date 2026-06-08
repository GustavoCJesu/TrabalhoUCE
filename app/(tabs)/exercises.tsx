import { StyleSheet, Text, View, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useExercises } from '@/src/presentation/hooks/useExercises';
import { router } from 'expo-router';

export default function ExercisesScreen() {
    const { exercises, loading, error } = useExercises()

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#10B981" />
            </View>
        )
    }

    if (error || !exercises) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={[styles.titulo, { marginBottom: 20 }]}>
                    {error ?? 'Erro ao carregar'}
                </Text>
                <TouchableOpacity
                    style={styles.botao}
                    onPress={() => router.replace('/(auth)/Login')}
                >
                    <Text style={styles.txtBotao}>Ir para o login</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.titulo}>Meus Exercícios</Text>
            <Text style={styles.subtitulo}>
                {exercises.items.length === 0
                    ? 'Nenhum exercício no plano'
                    : exercises.items.length === 1
                        ? '1 exercício no plano'
                        : `${exercises.items.length} exercícios no plano`}
            </Text>

            <View style={{ marginTop: 20 }}>
                {exercises.items.map((item) => (
                    <TouchableOpacity
                        key={item.prescriptionItemId}
                        style={styles.card}
                        onPress={() => router.push(`/exercise/${item.prescriptionItemId}`)}
                    >
                        <View style={styles.cardHeader}>
                            <Text style={styles.cardTitulo}>{item.title}</Text>
                            {item.completedToday ? (
                                <Ionicons name="checkmark-circle" size={28} color="#10B981" />
                            ) : (
                                <Ionicons name="ellipse-outline" size={28} color="#9CA3AF" />
                            )}
                        </View>

                        <View style={styles.tags}>
                            <View style={styles.tag}>
                                <Text style={styles.tagTexto}>{item.taxonomy.axis}</Text>
                            </View>
                            <View style={styles.tag}>
                                <Text style={styles.tagTexto}>{item.taxonomy.problem}</Text>
                            </View>
                            <View style={styles.tag}>
                                <Text style={styles.tagTexto}>{item.taxonomy.objective}</Text>
                            </View>
                        </View>

                        <Text style={styles.status}>
                            {item.completedToday ? 'Concluído hoje' : 'Pendente hoje'}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={{ height: 120 }} />
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
        fontSize: 28,
    },
    subtitulo: {
        textAlign: 'center',
        marginTop: 6,
        fontSize: 15,
        color: '#9CA3AF',
    },
    card: {
        backgroundColor: '#1F2937',
        padding: 20,
        borderRadius: 12,
        marginBottom: 16,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardTitulo: {
        color: '#F9FAFB',
        fontWeight: 'bold',
        fontSize: 18,
        flex: 1,
        marginRight: 10,
    },
    tags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: 14,
    },
    tag: {
        backgroundColor: '#374151',
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 20,
    },
    tagTexto: {
        color: '#10B981',
        fontSize: 13,
    },
    status: {
        marginTop: 16,
        color: '#9CA3AF',
        fontSize: 14,
    },
    botao: {
        backgroundColor: '#10B981',
        paddingHorizontal: 40,
        paddingVertical: 12,
        borderRadius: 5,
    },
    txtBotao: {
        fontSize: 16,
        color: '#F9FAFB',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});