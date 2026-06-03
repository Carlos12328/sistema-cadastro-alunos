import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import {
  doc,
  setDoc,
} from 'firebase/firestore';

import { auth, db } from './firebaseConfig';

export async function register(
  nome: string,
  email: string,
  senha: string,
  role: 'aluno' | 'atendente'
) {
  const userCredential =
    await createUserWithEmailAndPassword(
      auth,
      email,
      senha
    );

  const uid = userCredential.user.uid;

  await setDoc(doc(db, 'users', uid), {
    uid,
    nome,
    email,
    role,
  });

  return userCredential.user;
}

export async function login(
  email: string,
  senha: string
) {
  const userCredential =
    await signInWithEmailAndPassword(
      auth,
      email,
      senha
    );

  return userCredential.user;
}

export async function logout() {
  await signOut(auth);
}