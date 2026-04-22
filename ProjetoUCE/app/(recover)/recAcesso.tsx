import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router'
import * as SecureStore from 'expo-secure-store'

export default function RecAcesso() {
    const [email, setEmail] = useState('')
    const [codigo, setCodigo] = useState('')
    const [senha, setSenha] = useState('')
    const [repSenha, setRepSenha] = useState('')

    const router = useRouter()
    const [codigoGerado, setCodigoGerado] = useState('')

    async function enviarCodigo() {
        if (!email) {
            Alert.alert('Erro', 'Informe o e-mail.')
            return
        }

        const raw = await SecureStore.getItemAsync('usuarios')
        const usuarios = raw ? JSON.parse(raw) : []

        const existe = usuarios.some((u: any) => u.email === email.toLowerCase().trim())
        if (!existe) {
            Alert.alert('Erro', 'E-mail não cadastrado.')
            return
        }

        const codigo = Math.floor(100000 + Math.random() * 900000).toString()
        setCodigoGerado(codigo)
        Alert.alert('Código gerado', `Seu código é: ${codigo}`) // simulando o envio
    }

    async function atualizarSenha() {
        if (!codigo || !senha || !repSenha) {
            Alert.alert('Erro', 'Preencha todos os campos.')
            return
        }

        if (codigo !== codigoGerado) {
            Alert.alert('Erro', 'Código incorreto.')
            return
        }

        if (senha !== repSenha) {
            Alert.alert('Erro', 'As senhas não coincidem.')
            return
        }

        if (senha.length < 6) {
            Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres.')
            return
        }

        const raw = await SecureStore.getItemAsync('usuarios')
        const usuarios = raw ? JSON.parse(raw) : []

        const index = usuarios.findIndex((u: any) => u.email === email.toLowerCase().trim())
        usuarios[index].senha = senha

        await SecureStore.setItemAsync('usuarios', JSON.stringify(usuarios))
        Alert.alert('Sucesso', 'Senha atualizada!')
        router.replace('/(auth)/Login')
    }

    return (
        <View style={styles.container}>
            <View style={{ marginBottom: 20 }}>
                <Text style={styles.titulo}>Recuperação de Acesso</Text>
                <Text style={styles.subtitulo}>Redefina sua senha para continuar acessando seus dados clínicos e acadêmicos com total segurança.</Text>

                <View style={styles.cardInfo}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Dica de Segurança</Text>
                    <Text style={{ marginTop: 10, fontSize: 14 }}>Use ao menos 8 caracteres, incluindo letras maiúsculas, números e um símbolo especial.</Text>
                </View>

            </View>
            <View style={styles.card}>

                <View>
                    <View>
                        <Text style={styles.label}>Email</Text>
                        <TextInput style={[styles.campos, { marginBottom: 5 }]} onChangeText={email => setEmail(email)} value={email} placeholder="nome@exemplo.com.br" keyboardType="email-address" />
                        <TouchableOpacity style={{ padding: 10, alignSelf: 'center', backgroundColor: '#10B981', marginBottom: 20 }} onPress={enviarCodigo}>
                            <Text style={{ color: 'white' }}>
                                Enviar Código
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.label}>Código de verificação</Text>
                    <TextInput style={styles.campos} onChangeText={codigo => setCodigo(codigo)} value={codigo} placeholder="0000-0000" />
                    <Text style={styles.label}>Nova Senha</Text>
                    <TextInput style={styles.campos} onChangeText={senha => setSenha(senha)} value={senha} placeholder="●●●●●●●●" secureTextEntry={true} />
                    <Text style={styles.label}>Confirmar Senha</Text>
                    <TextInput style={styles.campos} onChangeText={repSenha => setRepSenha(repSenha)} value={repSenha} placeholder="●●●●●●●●" secureTextEntry={true} />
                </View>
                <TouchableOpacity style={styles.botao} onPress={atualizarSenha}>
                    <Text style={styles.txtBotao}>Atualizar Senha</Text>
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
        fontSize: 24,
        textAlign: 'center'
    },
    subtitulo: {
        marginTop: 5,
        fontSize: 16,
        color: 'gray',
        textAlign: 'center'
    },
    label: {
        color: '#F9FAFB',
        fontSize: 16,
    },
    campos: {
        borderWidth: 1,
        borderRadius: 5,
        height: 40,
        textAlign: 'center',
        backgroundColor: 'white',
        marginBottom: 20,
    },
    botao: {
        textAlign: 'center',
        backgroundColor: '#10B981',
        paddingHorizontal: 40,
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 20
    },
    txtBotao: {
        fontSize: 14,
        color: '#F9FAFB',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    card: {
        backgroundColor: '#1F2937',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 10,
    },
    cardInfo: {
        marginTop: 30,
        backgroundColor: '#657894',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 10,
    }
});