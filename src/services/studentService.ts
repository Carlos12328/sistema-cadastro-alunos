import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore';

import { db } from './firebaseConfig';

import { Student } from '../types/student';

export async function createStudent(
  student: Omit<
    Student,
    | 'id'
    | 'status'
    | 'rgUrl'
    | 'certificadoUrl'
    | 'criadoEm'
  >
) {

  const docRef =
    await addDoc(
      collection(db, 'alunos'),
      {
        ...student,

        status: 'Pendente',

        rgUrl: '',
        certificadoUrl: '',

        criadoEm:
          serverTimestamp(),
      }
    );

  return docRef.id;
}

export async function
getStudents(): Promise<Student[]> {

  const snapshot =
    await getDocs(
      collection(
        db,
        'alunos'
      )
    );

  const students =
    snapshot.docs.map(
      (doc) => ({
        id: doc.id,
        ...doc.data(),
      })
    ) as Student[];

  return students.sort(
    (a, b) =>
      a.nomeCompleto.localeCompare(
        b.nomeCompleto
      )
  );
}
