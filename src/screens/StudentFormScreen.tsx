import { useState } from 'react';

import {
  Text,
  TextInput,
  Button,
  Alert,
  ScrollView,
} from 'react-native';

import { useAuth }
from '../context/AuthContext';

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

import {
  createStudent,
} from '../services/studentService';

export default function
StudentFormScreen() {

  const { user } =
    useAuth();

  const [
    nomeCompleto,
    setNomeCompleto,
  ] = useState('');

  const [cpf, setCpf] =
    useState('');

  const [
    dataNascimento,
    setDataNascimento,
  ] = useState('');

  const [email, setEmail] =
    useState('');

  const [
    telefone,
    setTelefone,
  ] = useState('');

  const [curso, setCurso] =
    useState('');

  async function
  handleSubmit() {

    try {

      if (
        !validateRequired(
          nomeCompleto
        ) ||
        !validateRequired(cpf) ||
        !validateRequired(
          dataNascimento
        ) ||
        !validateRequired(
          email
        ) ||
        !validateRequired(
          telefone
        ) ||
        !validateRequired(
          curso
        )
      ) {
        Alert.alert(
          'Erro',
          'Preencha todos os campos'
        );

        return;
      }

      if (
        nomeCompleto
          .trim()
          .split(' ')
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
        !validateBirthDate(
          dataNascimento
        )
      ) {
        Alert.alert(
          'Erro',
          'Data inválida. Use dd/mm/aaaa'
        );

        return;
      }

      if (
        !validateEmail(
          email
        )
      ) {
        Alert.alert(
          'Erro',
          'Email inválido'
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

      if (!user) {
        Alert.alert(
          'Erro',
          'Usuário não autenticado'
        );

        return;
      }

      await createStudent({
        userId:
          user.uid,

        nomeCompleto:
          nomeCompleto.trim(),

        cpf:
          cpf.replace(
            /\D/g,
            ''
          ),

        dataNascimento:
          dataNascimento.trim(),

        email:
          email
            .trim()
            .toLowerCase(),

        telefone:
          telefone.replace(
            /\D/g,
            ''
          ),

        curso:
          curso.trim(),
      });

      Alert.alert(
        'Sucesso',
        'Aluno cadastrado'
      );

      setNomeCompleto('');
      setCpf('');
      setDataNascimento('');
      setEmail('');
      setTelefone('');
      setCurso('');

    } catch {

      Alert.alert(
        'Erro',
        'Falha ao cadastrar aluno'
      );
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
        gap: 10,
      }}
    >
      <Text>
        Cadastro de aluno
      </Text>

      <TextInput
        placeholder=
          "Nome completo *"
        value={
          nomeCompleto
        }
        onChangeText={(
          text
        ) =>
          setNomeCompleto(
            onlyLetters(
              text
            )
          )
        }
        maxLength={100}
        style={{
          borderWidth: 1,
          padding: 10,
        }}
      />

      <TextInput
        placeholder="CPF *"
        value={cpf}
        onChangeText={(
          text
        ) =>
          setCpf(
            maskCPF(text)
          )
        }
        keyboardType=
          "numeric"
        maxLength={14}
        style={{
          borderWidth: 1,
          padding: 10,
        }}
      />

      <TextInput
        placeholder=
          "Data nascimento (dd/mm/aaaa) *"
        value={
          dataNascimento
        }
        onChangeText={(
          text
        ) =>
          setDataNascimento(
            maskBirthDate(
              text
            )
          )
        }
        keyboardType=
          "numeric"
        maxLength={10}
        style={{
          borderWidth: 1,
          padding: 10,
        }}
      />

      <TextInput
        placeholder=
          "Email *"
        value={email}
        onChangeText={
          setEmail
        }
        autoCapitalize=
          "none"
        keyboardType=
          "email-address"
        maxLength={100}
        style={{
          borderWidth: 1,
          padding: 10,
        }}
      />

      <TextInput
        placeholder=
          "Telefone *"
        value={
          telefone
        }
        onChangeText={(
          text
        ) =>
          setTelefone(
            maskPhone(
              text
            )
          )
        }
        keyboardType=
          "phone-pad"
        maxLength={15}
        style={{
          borderWidth: 1,
          padding: 10,
        }}
      />

      <TextInput
        placeholder=
          "Curso *"
        value={curso}
        onChangeText={(
          text
        ) =>
          setCurso(
            onlyLetters(
              text
            )
          )
        }
        maxLength={50}
        style={{
          borderWidth: 1,
          padding: 10,
        }}
      />

      <Button
        title="Cadastrar"
        onPress={
          handleSubmit
        }
      />
    </ScrollView>
  );
}
