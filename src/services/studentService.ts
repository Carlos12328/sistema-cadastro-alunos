export type Student = {
  id: string;
  nomeCompleto: string;
  cpf: string;
  email: string;
  telefone: string;
  curso: string;
  status: 'Pendente' | 'Aprovado' | 'Rejeitado';
  rgUrl?: string;
  certificadoUrl?: string;
};

export async function getStudentById(
  studentId: string
): Promise<Student | null> {
  console.log('Buscar aluno:', studentId);

  return null;
}

export async function updateStudentStatus(
  studentId: string,
  status: Student['status']
): Promise<void> {
  console.log(
    'Atualizar status:',
    studentId,
    status
  );
}

export function subscribeStudent(
  studentId: string,
  callback: (student: Student | null) => void
) {
  console.log(
    'Escutando alterações do aluno:',
    studentId
  );

  return () => {
    console.log(
      'Parando de escutar:',
      studentId
    );
  };
}