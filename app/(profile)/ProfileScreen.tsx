import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const CardPessoa = ({ titulo, pessoa, pessoaEmail }: { titulo: string, pessoa: string, pessoaEmail: string }) => {
        return (
            <View style={styles.itemCard}>
                <Text style={styles.subtitulo}>{titulo}</Text>
                <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
                    <Image
                        style={styles.imgCard}
                        source={require('../../assets/images/icon.png')}
                        resizeMode="contain"
                    />
                    <View style={{ marginLeft: 20 }}>
                        <Text style={styles.subtitulo}>{pessoa}</Text>
                        <Text style={styles.txt}>{pessoaEmail}</Text>
                    </View>
                </View>
            </View>
        )
    }

    

export default function Profile() {
    const [id, setID] = useState('')
    const [user, setUser] = useState('')
    const [fisio, setFisio] = useState('')
    const [fisioEmail, setFisioEmail] = useState('')
    const [coord, setCoord] = useState('')
    const [coordEmail, setCoordEmail] = useState('')

    useEffect(() => {

        setFisio('Doutora')
        setFisioEmail('Especialista Ortopedica')

    })


    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.titulo}>Unifae Care</Text>
                <View style={{ alignItems: 'center' }}>
                    <Image style={styles.imgPerfil} source={require('../../assets/images/splash-icon.png')} resizeMode="contain" />
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