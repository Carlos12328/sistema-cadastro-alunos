import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { useRoute } from '@react-navigation/native';

import { useAuth } from '../context/AuthContext';
import { Student } from '../types/student';
import {
  subscribeStudent,
  updateStudentStatus,
} from '../services/studentService';

export default function StudentDetailsScreen() {
  const route = useRoute<any>();
  const { role } = useAuth();

  const studentId = route.params?.studentId;

  const [aluno, setAluno] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!studentId) {
      setLoading(false);
      return;
    }

    const unsubscribe = subscribeStudent(
      studentId,
      (student) => {
        setAluno(student);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [studentId]);

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

  async function alterarStatus(
    novoStatus: 'Aprovado' | 'Rejeitado'
  ) {
    if (!studentId) {
      Alert.alert(
        'Erro',
        'Aluno não identificado.'
      );
      return;
    }

    try {
      await updateStudentStatus(
        studentId,
        novoStatus
      );

      Alert.alert(
        'Sucesso',
        `Aluno ${novoStatus.toLowerCase()} com sucesso!`
      );
    } catch {
      Alert.alert(
        'Erro',
        'Não foi possível alterar o status do aluno.'
      );
    }
  }

  function abrirDocumento(url: string) {
    if (!url) {
      Alert.alert(
        'Documento',
        'Documento ainda não enviado.'
      );
      return;
    }

    Linking.openURL(url);
  }

  if (role && role !== 'atendente') {
    return (
      <View style={styles.accessDeniedContainer}>
        <Text style={styles.accessDeniedText}>
          Acesso restrito aos atendentes.
        </Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.accessDeniedContainer}>
        <ActivityIndicator size="large" />
        <Text>Carregando aluno...</Text>
      </View>
    );
  }

  if (!aluno) {
    return (
      <View style={styles.accessDeniedContainer}>
        <Text style={styles.accessDeniedText}>
          Aluno não encontrado.
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
          Data de nascimento: {aluno.dataNascimento}
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

        <TouchableOpacity
          style={styles.documentBox}
          onPress={() =>
            abrirDocumento(aluno.rgUrl)
          }
        >
          <Text style={styles.documentText}>
            {aluno.rgUrl
              ? 'Abrir documento'
              : 'Documento ainda não enviado'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>
          Certificado
        </Text>

        <TouchableOpacity
          style={styles.documentBox}
          onPress={() =>
            abrirDocumento(aluno.certificadoUrl)
          }
        >
          <Text style={styles.documentText}>
            {aluno.certificadoUrl
              ? 'Abrir certificado'
              : 'Certificado ainda não enviado'}
          </Text>
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.approveButton}
            onPress={() =>
              alterarStatus('Aprovado')
            }
          >
            <Text style={styles.buttonText}>
              Aprovar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.rejectButton}
            onPress={() =>
              alterarStatus('Rejeitado')
            }
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
  accessDeniedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  accessDeniedText: {
    fontSize: 18,
    fontWeight: 'bold',
  },

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

  documentText: {
    fontWeight: 'bold',
    color: '#2563eb',
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