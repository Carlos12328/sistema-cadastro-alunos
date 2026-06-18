import { useState } from 'react';

import {
  Text,
  TextInput,
  Button,
  Alert,
  ScrollView,
} from 'react-native';

import {
  register,
} from '../services/authService';

import {
  validateCPF,
  validateEmail,
  validatePhone,
  validateBirthDate,
  validateCourse,
  validateRequired,
} from '../utils/validations';

import {
  maskCPF,
  maskPhone,
  maskBirthDate,
  onlyLetters,
} from '../utils/masks';

export default function RegisterScreen() {

  const [nome, setNome] =
    useState('');

  const [email, setEmail] =
    useState('');

  const [senha, setSenha] =
    useState('');

  const [cpf, setCpf] =
    useState('');

  const [telefone,
    setTelefone] =
    useState('');

  const [
    dataNascimento,
    setDataNascimento,
  ] = useState('');

  const [curso,
    setCurso] =
    useState('');

  const [role, setRole] =
    useState<
      'aluno'
      | 'atendente'
    >('aluno');

  async function handleRegister() {

    try {

      if (
        !validateRequired(nome) ||
        !validateRequired(email) ||
        !validateRequired(senha)
      ) {

        Alert.alert(
          'Erro',
          'Preencha os campos obrigatórios'
        );

        return;
      }

      if (
        !validateEmail(email)
      ) {

        Alert.alert(
          'Erro',
          'Email inválido'
        );

        return;
      }

      if (
        senha.length < 6
      ) {

        Alert.alert(
          'Erro',
          'Senha deve ter pelo menos 6 caracteres'
        );

        return;
      }

      if (
        role === 'aluno'
      ) {

        if (
          !validateRequired(cpf) ||
          !validateRequired(telefone) ||
          !validateRequired(dataNascimento) ||
          !validateRequired(curso)
        ) {

          Alert.alert(
            'Erro',
            'Preencha todos os dados do aluno'
          );

          return;
        }

        if (
          nome.trim().split(' ')
            .length < 2
        ) {

          Alert.alert(
            'Erro',
            'Digite nome e sobrenome'
          );

          return;
        }

        if (
          !validateCPF(cpf)
        ) {

          Alert.alert(
            'Erro',
            'CPF inválido'
          );

          return;
        }

        if (
          !validatePhone(
            telefone
          )
        ) {

          Alert.alert(
            'Erro',
            'Telefone inválido'
          );

          return;
        }

        if (
          !validateBirthDate(
            dataNascimento
          )
        ) {

          Alert.alert(
            'Erro',
            'Data inválida'
          );

          return;
        }

        if (
          !validateCourse(
            curso
          )
        ) {

          Alert.alert(
            'Erro',
            'Curso inválido'
          );

          return;
        }
      }

      await register({
        nome:
          nome.trim(),

        email:
          email
            .trim()
            .toLowerCase(),

        senha,

        role,

        cpf:
          cpf.replace(
            /\D/g,
            ''
          ),

        telefone:
          telefone.replace(
            /\D/g,
            ''
          ),

        dataNascimento,

        curso:
          curso.trim(),
      });

      Alert.alert(
        'Sucesso',
        'Usuário cadastrado'
      );

    } catch (
      error: any
    ) {

      switch (
        error.code
      ) {

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
            'Senha fraca'
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
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        padding: 20,
        justifyContent:
          'center',
        gap: 10,
      }}
    >

      <Text>
        Cadastro
      </Text>

      <TextInput
        placeholder="Nome completo *"
        value={nome}
        onChangeText={(text) =>
          setNome(
            onlyLetters(text)
          )
        }
        maxLength={100}
        style={{
          borderWidth: 1,
          padding: 10,
        }}
      />

      <TextInput
        placeholder="Email *"
        value={email}
        onChangeText={
          setEmail
        }
        autoCapitalize="none"
        keyboardType="email-address"
        maxLength={100}
        style={{
          borderWidth: 1,
          padding: 10,
        }}
      />

      <TextInput
        placeholder="Senha *"
        value={senha}
        onChangeText={
          setSenha
        }
        secureTextEntry
        style={{
          borderWidth: 1,
          padding: 10,
        }}
      />

      <Text>
        Perfil
      </Text>

      <Button
        title="Aluno"
        onPress={() =>
          setRole(
            'aluno'
          )
        }
      />

      <Button
        title="Atendente"
        onPress={() =>
          setRole(
            'atendente'
          )
        }
      />

      <Text>
        Perfil: {role}
      </Text>

      {role === 'aluno' && (
        <>

          <TextInput
            placeholder="CPF *"
            value={cpf}
            onChangeText={(text) =>
              setCpf(
                maskCPF(text)
              )
            }
            keyboardType="numeric"
            maxLength={14}
            style={{
              borderWidth: 1,
              padding: 10,
            }}
          />

          <TextInput
            placeholder="Telefone *"
            value={telefone}
            onChangeText={(text) =>
              setTelefone(
                maskPhone(text)
              )
            }
            keyboardType="phone-pad"
            maxLength={15}
            style={{
              borderWidth: 1,
              padding: 10,
            }}
          />

          <TextInput
            placeholder="Data nascimento *"
            value={dataNascimento}
            onChangeText={(text) =>
              setDataNascimento(
                maskBirthDate(text)
              )
            }
            keyboardType="numeric"
            maxLength={10}
            style={{
              borderWidth: 1,
              padding: 10,
            }}
          />

          <TextInput
            placeholder="Curso *"
            value={curso}
            onChangeText={(text) =>
              setCurso(
                onlyLetters(text)
              )
            }
            maxLength={50}
            style={{
              borderWidth: 1,
              padding: 10,
            }}
          />

        </>
      )}

      <Button
        title="Cadastrar"
        onPress={
          handleRegister
        }
      />

    </ScrollView>
  );
}