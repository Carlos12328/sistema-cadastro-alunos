import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
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
  const docRef = await addDoc(
    collection(db, 'alunos'),
    {
      ...student,
      status: 'Pendente',
      rgUrl: '',
      certificadoUrl: '',
      criadoEm: serverTimestamp(),
    }
  );

  return docRef.id;
}

export async function getStudents(): Promise<Student[]> {
  const snapshot = await getDocs(
    collection(db, 'alunos')
  );

  const students = snapshot.docs.map(
    (docItem) =>
      ({
        id: docItem.id,
        ...docItem.data(),
      } as Student)
  );

  return students.sort((a, b) =>
    a.nomeCompleto.localeCompare(
      b.nomeCompleto
    )
  );
}

export async function getStudentById(
  studentId: string
): Promise<Student | null> {
  const docRef = doc(db, 'alunos', studentId);

  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return null;
  }

  return {
    id: docSnap.id,
    ...docSnap.data(),
  } as Student;
}

export async function getStudentByUserId(
  userId: string
): Promise<Student | null> {
  const studentsQuery = query(
    collection(db, 'alunos'),
    where('userId', '==', userId),
    limit(1)
  );

  const snapshot = await getDocs(
    studentsQuery
  );

  if (snapshot.empty) {
    return null;
  }

  const studentDoc =
    snapshot.docs[0];

  return {
    id: studentDoc.id,
    ...studentDoc.data(),
  } as Student;
}

export async function updateStudentStatus(
  studentId: string,
  status: Student['status']
): Promise<void> {
  const studentRef = doc(
    db,
    'alunos',
    studentId
  );

  const updateData: any = {
    status,
  };

  if (status === 'Rejeitado') {
    updateData.certificadoUrl = '';
  }

  await updateDoc(
    studentRef,
    updateData
  );
}

export async function updateStudentCertificateUrl(
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
      status: 'Pendente',
    }
  );
}

export function subscribeStudent(
  studentId: string,
  callback: (
    student: Student | null
  ) => void
) {
  const studentRef = doc(
    db,
    'alunos',
    studentId
  );

  const unsubscribe =
    onSnapshot(
      studentRef,
      (snapshot) => {
        if (!snapshot.exists()) {
          callback(null);
          return;
        }

        callback({
          id: snapshot.id,
          ...snapshot.data(),
        } as Student);
      }
    );

  return unsubscribe;
}
