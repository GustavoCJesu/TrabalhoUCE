import { ScrollView, Image, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'; // Correto
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useProfile } from '@/src/presentation/hooks/useProfile';
import { useHome } from '@/src/presentation/hooks/useHome';
import { container } from '@/src/core/config/container';



const logout = async () => {
    await container.authRepository.logout()
    router.replace('/(auth)/Login')
}


const CardPessoa = ({ titulo, pessoa, pessoaEmail, fotoUrl }: { titulo: string, pessoa: string, pessoaEmail: string, fotoUrl: string | null }) => {
    return (
        <View style={styles.itemCard}>
            <Text style={styles.subtitulo}>{titulo}</Text>
            <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
                <Image
                    style={styles.imgCard}
                    source={fotoUrl ? { uri: fotoUrl } : require('../../assets/images/icon.png')}
                    resizeMode="contain"
                />
                <View style={{ marginLeft: 20, width: '80%' }}>
                    <Text style={styles.subtitulo}>{pessoa}</Text>
                    <Text style={styles.txt}>{pessoaEmail}</Text>
                </View>
            </View>
        </View>
    )
}



export default function ProfileScreen() {

    const { profile, loading, error } = useProfile()
    const { home } = useHome()

    const percent = home?.plan.percentCompleted

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#10B981" />
            </View>
        )
    }

    if (error || !profile) {
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
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.titulo}>Unifae Care</Text>
                    <View style={{ alignItems: 'center' }}>
                        <Image style={styles.imgPerfil} source={profile.profile.photoUrl ? { uri: profile.profile.photoUrl } : require('../../assets/images/icon.png')} resizeMode="contain" />
                        <Text style={[styles.titulo, { marginTop: 20 }]}>{profile.profile.name}</Text>
                        <Text style={{ fontSize: 16, color: '#10B981' }}>ID: {profile.profile.id}</Text>
                    </View>
                    <CardPessoa
                        titulo="Fisioterapeuta Responsável"
                        pessoa={'Não informado'}
                        pessoaEmail={'-'}
                        fotoUrl={null}
                    />
                    <CardPessoa
                        titulo="Coordenador Responsável"
                        pessoa={profile.coordinator.name}
                        pessoaEmail={profile.coordinator.email}
                        fotoUrl={profile.profile.photoUrl}
                    />
                    <View style={styles.itemCard}>
                        <View style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            <Text style={{ color: 'white', fontSize: 18 }}>
                                META SEMANAL
                            </Text>
                            <Text style={{ fontSize: 30, color: 'white' }}>
                                {home?.plan.percentCompleted}%
                                <Text style={{ fontSize: 15 }}> Concluido</Text>
                            </Text>
                            <View style={{ width: '100%', height: 10, backgroundColor: '#fff', borderRadius: 20, overflow: 'hidden' }}>
                                <View style={{ width: `${percent ?? 100}%`, height: '100%', backgroundColor: 'blue', borderRadius: 20 }}></View>
                            </View>
                        </View>
                    </View>
                    <View>
                        <View style={styles.itemCard}>
                            <Text style={{ color: 'white', fontSize: 20, marginBottom: 20 }}>
                                Configurações de suporte
                            </Text>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#464c55', padding: 10, marginTop: 10, borderRadius: 10, justifyContent: 'space-between', paddingHorizontal: 20 }}>
                                <Image
                                    style={{ width: 50, height: 50, borderRadius: 100 }}
                                    source={require('../../assets/images/icon.png')}
                                    resizeMode="contain"
                                />
                                <Text style={{ fontSize: 16, color: 'white' }}>Lembrete</Text>
                                <Text style={{ fontSize: 30, color: 'white' }}><MaterialIcons name="arrow-forward-ios" size={20} color="#9CA3AF" /></Text>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#464c55', padding: 10, marginTop: 10, borderRadius: 10, justifyContent: 'space-between', paddingHorizontal: 20 }}>
                                <Image
                                    style={{ width: 50, height: 50, borderRadius: 100 }}
                                    source={require('../../assets/images/icon.png')}
                                    resizeMode="contain"
                                />
                                <Text style={{ fontSize: 16, color: 'white' }}>Notificações</Text>
                                <Text style={{ fontSize: 30, color: 'white' }}><MaterialIcons name="arrow-forward-ios" size={20} color="#9CA3AF" /></Text>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#464c55', padding: 10, marginTop: 10, borderRadius: 10, justifyContent: 'space-between', paddingHorizontal: 20 }}>
                                <Image
                                    style={{ width: 50, height: 50, borderRadius: 100 }}
                                    source={require('../../assets/images/icon.png')}
                                    resizeMode="contain"
                                />
                                <Text style={{ fontSize: 16, color: 'white' }}>Privacidade e Dados</Text>
                                <Text style={{ fontSize: 30, color: 'white' }}><MaterialIcons name="arrow-forward-ios" size={20} color="#9CA3AF" /></Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ backgroundColor: '#f0a6a6', width: '80%', alignSelf: 'center', margin: 20, padding: 10, borderRadius: 20 }}>
                        <TouchableOpacity onPress={logout}>
                            <Text style={{ color: '#b62a2a', textAlign: 'center' }}>
                                Sair
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#111827',
        paddingHorizontal: 20,
        paddingVertical: 70,
    },
    titulo: {
        color: '#F9FAFB',
        fontWeight: 'bold',
        fontSize: 22
    },
    card: {
        backgroundColor: '#1F2937',
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 10,
    },
    itemCard: {
        marginTop: 30,
        backgroundColor: '#374151',
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 10,
    },
    imgCard: {
        width: 50,
        height: 50,
        borderRadius: 10,
    },
    imgPerfil: {
        marginTop: 40,
        borderRadius: 50,
        width: 100,
        height: 100,
        borderWidth: 2,
        borderColor: '#fff',
    },
    subtitulo: {
        fontSize: 14,
        color: '#F9FAFB'
    },
    txt: {
        color: '#9CA3AF'
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