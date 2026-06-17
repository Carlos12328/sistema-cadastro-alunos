export type StudentStatus =
  | 'Pendente'
  | 'Entregue';

export interface Student {
  id?: string;

  userId: string;

  nomeCompleto: string;
  cpf: string;
  dataNascimento: string;
  email: string;
  telefone: string;
  curso: string;

  status: StudentStatus;

  rgUrl: string;
  certificadoUrl: string;

  criadoEm?: Date;
}
