import { Text, View} from 'react-native';
import React from 'react';

export default function paginaPrincipal() {

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'white'}}>
                Tela Inicial do app
            </Text>
        </View>
    )
}