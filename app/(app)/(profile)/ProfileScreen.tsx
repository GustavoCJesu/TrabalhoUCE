import { useEffect, useState } from 'react';
import { ScrollView, Image, StyleSheet, Text, View } from 'react-native'; // Correto
import { MaterialIcons } from '@expo/vector-icons';


const CardPessoa = ({ titulo, pessoa, pessoaEmail }: { titulo: string, pessoa: string, pessoaEmail: string }) => {
    return (
        <View style={styles.itemCard}>
            <Text style={styles.subtitulo}>{titulo}</Text>
            <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
                <Image
                    style={styles.imgCard}
                    source={require('../../../assets/images/icon.png')}
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
    const [id, setID] = useState('')
    const [user, setUser] = useState('')
    const [fisio, setFisio] = useState('')
    const [fisioEmail, setFisioEmail] = useState('')
    const [coord, setCoord] = useState('')
    const [coordEmail, setCoordEmail] = useState('')

    const percent = 50

    useEffect(() => {

        setFisio('Doutora')
        setFisioEmail('Especialista Ortopedica')

        setCoord('Coordenadora')
        setCoordEmail('Coordenadora do Curso de Fisioterapira')

    }, [])


    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.titulo}>Unifae Care</Text>
                    <View style={{ alignItems: 'center' }}>
                        <Image style={styles.imgPerfil} source={require('../../../assets/images/splash-icon.png')} resizeMode="contain" />
                        <Text style={[styles.titulo, { marginTop: 20 }]}>{user}</Text>
                        <Text style={{ fontSize: 16, color: '#10B981' }}>ID: {id}</Text>
                    </View>
                    <CardPessoa
                        titulo="Fisioterapeuta Responsável"
                        pessoa={fisio}
                        pessoaEmail={fisioEmail}
                    />
                    <CardPessoa
                        titulo="Coordenador Responsável"
                        pessoa={coord}
                        pessoaEmail={coordEmail}
                    />
                    <View style={styles.itemCard}>
                        <View style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            <Text style={{ color: 'white', fontSize: 18 }}>
                                META SEMANAL
                            </Text>
                            <Text style={{ fontSize: 30, color: 'white' }}>
                                {percent}%
                                <Text style={{ fontSize: 15 }}> Concluido</Text>
                            </Text>
                            <View style={{ width: '100%', height: 10, backgroundColor: '#fff', borderRadius: 20, overflow: 'hidden' }}>
                                <View style={{ width: `${percent}%`, height: '100%', backgroundColor: 'blue', borderRadius: 20 }}></View>
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
                                    source={require('../../../assets/images/icon.png')}
                                    resizeMode="contain"
                                />
                                <Text style={{ fontSize: 16, color: 'white' }}>Lembrete</Text>
                                <Text style={{ fontSize: 30, color: 'white' }}><MaterialIcons name="arrow-forward-ios" size={20} color="#9CA3AF" /></Text>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#464c55', padding: 10, marginTop: 10, borderRadius: 10, justifyContent: 'space-between', paddingHorizontal: 20 }}>
                                <Image
                                    style={{ width: 50, height: 50, borderRadius: 100 }}
                                    source={require('../../../assets/images/icon.png')}
                                    resizeMode="contain"
                                />
                                <Text style={{ fontSize: 16, color: 'white' }}>Notificações</Text>
                                <Text style={{ fontSize: 30, color: 'white' }}><MaterialIcons name="arrow-forward-ios" size={20} color="#9CA3AF" /></Text>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#464c55', padding: 10, marginTop: 10, borderRadius: 10, justifyContent: 'space-between', paddingHorizontal: 20 }}>
                                <Image
                                    style={{ width: 50, height: 50, borderRadius: 100 }}
                                    source={require('../../../assets/images/icon.png')}
                                    resizeMode="contain"
                                />
                                <Text style={{ fontSize: 16, color: 'white' }}>Privacidade e Dados</Text>
                                <Text style={{ fontSize: 30, color: 'white' }}><MaterialIcons name="arrow-forward-ios" size={20} color="#9CA3AF" /></Text>
                            </View>
                        </View>
                    </View>
                    <View style={{backgroundColor: '#f0a6a6', width: '80%', alignSelf: 'center', margin: 20, padding: 10, borderRadius: 20}}>
                        <Text style={{color: '#b62a2a', textAlign: 'center'}}>
                            Sair
                        </Text>
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
    }
});