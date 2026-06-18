export type StudentStatus =
  | 'Pendente'
  | 'Entregue'
  | 'Aprovado'
  | 'Rejeitado';

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
