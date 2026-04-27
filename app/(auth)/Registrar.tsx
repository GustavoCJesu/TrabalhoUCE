import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router'
import * as SecureStore from 'expo-secure-store'


export default function Registrar() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [conSenha, setConSenha] = useState('')
    const [nome, setNome] = useState('')
    const router = useRouter()

    interface Usuario {
        id: string
        nome: string
        email: string
        senha: string
    }

    async function RegistrarUsuario() {
        if (!nome || !email || !senha || !conSenha) {
            Alert.alert('Erro', 'Preencha todos os campos.')
            return
        }

        if (senha !== conSenha) {
            Alert.alert('Erro', 'As senhas não coincidem.')
            return
        }

        if (senha.length < 6) {
            Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres.')
            return
        }

        const raw = await SecureStore.getItemAsync('usuarios')
        const usuarios: Usuario[] = raw ? JSON.parse(raw) : []

        const jaExiste = usuarios.some(u => u.email === email.toLowerCase().trim())
        if (jaExiste) {
            Alert.alert('Erro', 'E-mail já cadastrado.')
            return
        }

        const id = `${Date.now()}_${Math.random().toString(36).slice(2)}`
        const novoUsuario: Usuario = { id, nome, email: email.toLowerCase().trim(), senha }

        await SecureStore.setItemAsync('usuarios', JSON.stringify([...usuarios, novoUsuario]))
        Alert.alert('Sucesso', 'Conta criada com sucesso!')
        router.replace('/(auth)/Login')
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.titulo}>Bem Vindo ao Unifae Care</Text>
                <Text style={styles.subtitulo}>Preencha os campos para fazer parte do futuro</Text>
                <View style={{ marginTop: 40 }}>
                    <Text style={styles.label}>Nome</Text>
                    <TextInput style={styles.campos} onChangeText={nome => setNome(nome)} value={nome} placeholder="José da Silva" />
                </View>
                <View>
                    <Text style={styles.label}>Email</Text>
                    <TextInput style={styles.campos} onChangeText={email => setEmail(email)} value={email} placeholder="nome@exemplo.com.br" />
                </View>
                <View>
                    <Text style={styles.label}>Senha</Text>
                    <TextInput style={styles.campos} onChangeText={senha => setSenha(senha)} value={senha} placeholder="●●●●●●●●" secureTextEntry={true} />
                </View>
                <View>
                    <Text style={styles.label}>Confirmar Senha</Text>
                    <TextInput style={styles.campos} onChangeText={conSenha => setConSenha(conSenha)} value={conSenha} placeholder="●●●●●●●●" secureTextEntry={true} />
                </View>

                <TouchableOpacity style={styles.botao} onPress={() => RegistrarUsuario()}>
                    <Text style={styles.txtBotao}>Cadastrar</Text>
                </TouchableOpacity>
            </View>

            <View style={{ alignItems: 'center', marginTop: 20 }}>
                <Text style={{ color: '#F9FAFB', fontSize: 16 }}>Ja tem uma conta?</Text>
                <TouchableOpacity style={{ marginTop: 10 }} onPress={() => router.push('/(auth)/Login')}>
                    <Text style={styles.recSenha}>Clique aqui</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#111827',
        paddingHorizontal: 20
    },
    titulo: {
        color: '#F9FAFB',
        fontWeight: 'bold',
        fontSize: 22
    },
    subtitulo: {
        marginTop: 5,
        fontSize: 14,
        color: 'gray'
    },
    label: {
        color: '#F9FAFB',
        fontSize: 16,
        marginBottom: 5
    },
    recSenha: {
        color: '#10B981',
        fontSize: 16,
        textAlign: 'right'
    },
    campos: {
        borderWidth: 1,
        borderRadius: 5,
        height: 40,
        width: 250,
        textAlign: 'center',
        backgroundColor: 'white',
    },
    botao: {
        marginTop: 60,
        backgroundColor: '#10B981',
        paddingHorizontal: 40,
        paddingVertical: 10,
        borderRadius: 5
    },
    txtBotao: {
        fontSize: 14,
        color: '#F9FAFB',
        fontWeight: 'bold'
    },
    card: {
        alignItems: 'center',
        backgroundColor: '#1F2937',
        paddingHorizontal: 20,
        paddingVertical: 60,
        borderRadius: 10,
        gap: 10
    }
});