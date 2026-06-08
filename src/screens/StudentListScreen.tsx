import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { getStudents } from '../services/studentService';

// 🧠 Tipo do aluno baseado na collection "users"
type Student = {
  id: string;
  nome?: string;
  email?: string;
  role?: string;
};

export default function StudentListScreen() {

  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    console.log("CHEGUEI NA TELA");
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      console.log("BUSCANDO ALUNOS...");

      const data = await getStudents();

      console.log("RESULTADO:", data);

      setStudents(data);
    } catch (error) {
      console.error("ERRO AO CARREGAR ALUNOS:", error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>
        Lista de Alunos
      </Text>

      {students.length === 0 ? (
        <Text>Nenhum aluno encontrado</Text>
      ) : (
        students.map((student) => (
          <View key={student.id} style={{ marginBottom: 10 }}>
            <Text>Nome: {student.nome}</Text>
            <Text>Email: {student.email}</Text>
          </View>
        ))
      )}
    </View>
  );
}