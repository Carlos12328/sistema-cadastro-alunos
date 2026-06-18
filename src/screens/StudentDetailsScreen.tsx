import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';

import { useAuth } from '../context/AuthContext';
import { getUserRole } from '../services/userService';

export default function StudentDetailsScreen() {
  const { user } = useAuth();

  const [role, setRole] = useState('');

  const [aluno, setAluno] = useState({
    nomeCompleto: 'João Silva',
    cpf: '123.456.789-00',
    email: 'joao@email.com',
    telefone: '(61) 99999-9999',
    curso: 'Análise e Desenvolvimento de Sistemas',
    status: 'Pendente',

    rgUrl: 'Documento enviado',
    certificadoUrl: 'Documento enviado',
  });

  useEffect(() => {
    async function carregarRole() {
      if (!user) return;

      const userRole = await getUserRole(user.uid);

      if (userRole) {
        setRole(userRole);
      }
    }

    carregarRole();
  }, [user]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aprovado':
        return 'green';

      case 'Rejeitado':
        return 'red';

      default:
        return 'orange';
    }
  };

  function aprovarAluno() {
    setAluno({
      ...aluno,
      status: 'Aprovado',
    });

    Alert.alert(
      'Aprovação',
      'Aluno aprovado com sucesso!'
    );
  }

  function rejeitarAluno() {
    setAluno({
      ...aluno,
      status: 'Rejeitado',
    });

    Alert.alert(
      'Rejeição',
      'Aluno rejeitado.'
    );
  }

  if (role && role !== 'atendente') {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
          }}
        >
          Acesso restrito aos atendentes.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        Detalhes do Aluno
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>
          Nome: {aluno.nomeCompleto}
        </Text>

        <Text style={styles.label}>
          CPF: {aluno.cpf}
        </Text>

        <Text style={styles.label}>
          E-mail: {aluno.email}
        </Text>

        <Text style={styles.label}>
          Telefone: {aluno.telefone}
        </Text>

        <Text style={styles.label}>
          Curso: {aluno.curso}
        </Text>

        <Text
          style={[
            styles.status,
            {
              color: getStatusColor(aluno.status),
            },
          ]}
        >
          Status: {aluno.status}
        </Text>

        <Text style={styles.sectionTitle}>
          RG / CPF
        </Text>

        <View style={styles.documentBox}>
          <Text>
            {aluno.rgUrl
              ? 'Documento enviado'
              : 'Documento ainda não enviado'}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>
          Certificado
        </Text>

        <View style={styles.documentBox}>
          <Text>
            {aluno.certificadoUrl
              ? 'Documento enviado'
              : 'Documento ainda não enviado'}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.approveButton}
            onPress={aprovarAluno}
          >
            <Text style={styles.buttonText}>
              Aprovar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.rejectButton}
            onPress={rejeitarAluno}
          >
            <Text style={styles.buttonText}>
              Rejeitar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },

  card: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 10,
    elevation: 3,
  },

  label: {
    fontSize: 16,
    marginBottom: 10,
  },

  status: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },

  documentBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#fafafa',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  approveButton: {
    backgroundColor: '#16a34a',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },

  rejectButton: {
    backgroundColor: '#dc2626',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});