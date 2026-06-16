import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

export type Student = {
  id: string;
  userId?: string;
  nomeCompleto?: string;
  cpf?: string;
  dataNascimento?: string;
  email?: string;
  telefone?: string;
  curso?: string;
  status?: string;
  rgUrl?: string;
  certificadoUrl?: string;
  criadoEm?: unknown;
};

export const getStudents = async (): Promise<Student[]> => {
  const snapshot = await getDocs(collection(db, "alunos"));

  const students = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Student[];

  return students.sort((a, b) =>
    (a.nomeCompleto || "").localeCompare(b.nomeCompleto || "")
  );
};
