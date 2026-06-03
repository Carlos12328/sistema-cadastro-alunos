import { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { login } from '../services/authService';


export default function LoginScreen({ navigation }: any) {

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

      if (!email.includes('@')) {
        Alert.alert(
          'Erro',
          'Informe um email válido'
        );
        return;
      }

      await login(email, senha);

      Alert.alert(
        'Sucesso',
        'Login realizado'
      );

    } catch (error: any) {

      switch (error.code) {

        case 'auth/user-not-found':
          Alert.alert(
            'Erro',
            'Usuário não encontrado'
          );
          break;

        case 'auth/invalid-credential':
          Alert.alert(
            'Erro',
            'Email ou senha inválidos'
          );
          break;

        case 'auth/network-request-failed':
          Alert.alert(
            'Erro',
            'Sem conexão com a internet'
          );
          break;

        default:
          Alert.alert(
            'Erro',
            'Falha ao realizar login'
          );
      }

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