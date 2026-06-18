import {
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  updateDoc,
  where,
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

export async function
getStudentByUserId(
  userId: string
): Promise<Student | null> {

  const studentsQuery =
    query(
      collection(
        db,
        'alunos'
      ),
      where(
        'userId',
        '==',
        userId
      ),
      limit(1)
    );

  const snapshot =
    await getDocs(
      studentsQuery
    );

  if (
    snapshot.empty
  ) {
    return null;
  }

  const studentDoc =
    snapshot.docs[0];

  return {
    id: studentDoc.id,
    ...studentDoc.data(),
  } as Student;
}

export async function
updateStudentCertificateUrl(
  studentId: string,
  certificadoUrl: string
) {

  await updateDoc(
    doc(
      db,
      'alunos',
      studentId
    ),
    {
      certificadoUrl,
    }
  );
}
