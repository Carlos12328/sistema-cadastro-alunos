import { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
} from 'react-native';

import { login } from '../services/authService';

export default function LoginScreen({
  navigation,
}: any) {

  const [email, setEmail] =
    useState('');

  const [senha, setSenha] =
    useState('');

  async function handleLogin() {

    try {

      if (!email || !senha) {

        Alert.alert(
          'Erro',
          'Preencha todos os campos'
        );

        return;
      }

      await login(email, senha);

      Alert.alert(
        'Sucesso',
        'Login realizado'
      );

    } catch (error: any) {

      Alert.alert(
        'Erro',
        error.message
      );

    }

  }

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        gap: 10,
      }}
    >

      <Text>Login</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{
          borderWidth: 1,
          padding: 10,
        }}
      />

      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        style={{
          borderWidth: 1,
          padding: 10,
        }}
      />

      <Button
        title="Entrar"
        onPress={handleLogin}
      />

      <Button
        title="Ir para cadastro"
        onPress={() =>
          navigation.navigate('Cadastro')
        }
      />

    </View>
  );
}