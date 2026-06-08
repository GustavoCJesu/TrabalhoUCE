// app/exercise/[id].tsx

import { StyleSheet, Text, View, ScrollView, ActivityIndicator, TouchableOpacity, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { useExerciseDetail } from '@/src/presentation/hooks/useExerciseDetail';

export default function ExerciseDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>()
    const prescriptionItemId = Number(id)

    const { detail, loading, error, complete, completing, completed } = useExerciseDetail(prescriptionItemId)

    // Quando o exercício for concluído com sucesso, navega pro feedback
    // passando o id do exercício. Usa replace pra não "voltar" pro detalhe.
    useEffect(() => {
        if (completed) {
            router.replace(`/feedback/${prescriptionItemId}`)
        }
    }, [completed])

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#10B981" />
            </View>
        )
    }

    if (error || !detail) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={styles.titulo}>{error ?? 'Erro ao carregar'}</Text>
                <TouchableOpacity style={styles.botaoVoltar} onPress={() => router.back()}>
                    <Text style={styles.txtBotao}>Voltar</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const abrirVideo = () => {
        if (detail.videoUrl) {
            Linking.openURL(detail.videoUrl).catch(() => {
                Alert.alert('Erro', 'Não foi possível abrir o vídeo.')
            })
        }
    }

    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity style={styles.voltar} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="#F9FAFB" />
                <Text style={styles.voltarTexto}>Voltar</Text>
            </TouchableOpacity>

            <Text style={styles.titulo}>{detail.title}</Text>

            <View style={styles.tags}>
                <View style={styles.tag}><Text style={styles.tagTexto}>{detail.taxonomy.axis}</Text></View>
                <View style={styles.tag}><Text style={styles.tagTexto}>{detail.taxonomy.problem}</Text></View>
                <View style={styles.tag}><Text style={styles.tagTexto}>{detail.taxonomy.objective}</Text></View>
            </View>

            <TouchableOpacity style={styles.videoBtn} onPress={abrirVideo}>
                <Ionicons name="play-circle" size={24} color="#fff" />
                <Text style={styles.videoTexto}>Assistir vídeo</Text>
            </TouchableOpacity>

            <View style={styles.card}>
                <Text style={styles.cardTitulo}>Descrição</Text>
                <Text style={styles.texto}>{detail.description}</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitulo}>Métricas</Text>
                <View style={styles.metricas}>
                    <View style={styles.metrica}>
                        <Text style={styles.metricaValor}>{detail.metrics.series}</Text>
                        <Text style={styles.metricaLabel}>Séries</Text>
                    </View>
                    <View style={styles.metrica}>
                        <Text style={styles.metricaValor}>{detail.metrics.volume}</Text>
                        <Text style={styles.metricaLabel}>Repetições</Text>
                    </View>
                    <View style={styles.metrica}>
                        <Text style={styles.metricaValor}>{detail.metrics.repetitionsRaw}</Text>
                        <Text style={styles.metricaLabel}>Total</Text>
                    </View>
                </View>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitulo}>Passo a passo</Text>
                {detail.steps.map((step) => (
                    <View key={step.order} style={styles.passo}>
                        <View style={styles.passoNumero}>
                            <Text style={styles.passoNumeroTexto}>{step.order}</Text>
                        </View>
                        <Text style={styles.passoTexto}>{step.text}</Text>
                    </View>
                ))}
            </View>

            <View style={[styles.card, { backgroundColor: '#374151' }]}>
                <Text style={styles.cardTitulo}>Nota do fisioterapeuta</Text>
                <Text style={styles.texto}>{detail.physiotherapistNotes}</Text>
            </View>

            <TouchableOpacity
                style={styles.botaoConcluir}
                onPress={complete}
                disabled={completing}
            >
                {completing ? (
                    <ActivityIndicator color="#F9FAFB" />
                ) : (
                    <>
                        <Ionicons name="checkmark" size={24} color="#F9FAFB" />
                        <Text style={styles.txtConcluir}>Marcar como concluído</Text>
                    </>
                )}
            </TouchableOpacity>

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
    voltar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    voltarTexto: {
        color: '#F9FAFB',
        fontSize: 16,
        marginLeft: 6,
    },
    titulo: {
        color: '#F9FAFB',
        fontWeight: 'bold',
        fontSize: 26,
    },
    tags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: 14,
    },
    tag: {
        backgroundColor: '#1F2937',
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 20,
    },
    tagTexto: {
        color: '#10B981',
        fontSize: 13,
    },
    videoBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#10B981',
        paddingVertical: 12,
        borderRadius: 10,
        marginTop: 20,
        gap: 8,
    },
    videoTexto: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: '#1F2937',
        padding: 20,
        borderRadius: 12,
        marginTop: 16,
    },
    cardTitulo: {
        color: '#F9FAFB',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 12,
    },
    texto: {
        color: '#D1D5DB',
        fontSize: 15,
        lineHeight: 22,
    },
    metricas: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    metrica: {
        alignItems: 'center',
    },
    metricaValor: {
        color: '#10B981',
        fontSize: 24,
        fontWeight: 'bold',
    },
    metricaLabel: {
        color: '#9CA3AF',
        fontSize: 13,
        marginTop: 4,
    },
    passo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    passoNumero: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#10B981',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    passoNumeroTexto: {
        color: '#fff',
        fontWeight: 'bold',
    },
    passoTexto: {
        color: '#D1D5DB',
        fontSize: 15,
        flex: 1,
    },
    botaoConcluir: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#10B981',
        paddingVertical: 16,
        borderRadius: 12,
        marginTop: 24,
        gap: 8,
    },
    txtConcluir: {
        color: '#F9FAFB',
        fontSize: 16,
        fontWeight: 'bold',
    },
    txtBotao: {
        color: '#F9FAFB',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    botaoVoltar: {
        backgroundColor: '#10B981',
        paddingHorizontal: 40,
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 20,
    },
});
