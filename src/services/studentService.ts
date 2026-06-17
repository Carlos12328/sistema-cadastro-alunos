import {
  addDoc,
  collection,
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
