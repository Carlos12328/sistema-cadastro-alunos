import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
} from 'react-native';

import { register } from '../services/authService';

export default function RegisterScreen() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [role, setRole] = useState<'aluno' | 'atendente'>('aluno');

  async function handleRegister() {
    try {
      if (!nome || !email || !senha) {
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

      if (senha.length < 6) {
        Alert.alert(
          'Erro',
          'A senha deve ter pelo menos 6 caracteres'
        );
        return;
      }

      await register(
        nome,
        email,
        senha,
        role
      );

      Alert.alert(
        'Sucesso',
        'Usuário cadastrado'
      );
    } catch (error: any) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          Alert.alert(
            'Erro',
            'Este email já está cadastrado'
          );
          break;

        case 'auth/invalid-email':
          Alert.alert(
            'Erro',
            'Email inválido'
          );
          break;

        case 'auth/weak-password':
          Alert.alert(
            'Erro',
            'A senha deve possuir pelo menos 6 caracteres'
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
            'Falha ao realizar cadastro'
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
      <Text>Cadastro</Text>

      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        style={{
          borderWidth: 1,
          padding: 10,
        }}
      />

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

      <Text>Perfil</Text>

      <Button
        title="Aluno"
        onPress={() => setRole('aluno')}
      />

      <Button
        title="Atendente"
        onPress={() => setRole('atendente')}
      />

      <Text>
        Perfil selecionado: {role}
      </Text>

      <Button
        title="Cadastrar"
        onPress={handleRegister}
      />
    </View>
  );
}