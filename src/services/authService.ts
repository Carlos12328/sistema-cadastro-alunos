import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import {
  doc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';

import {
  auth,
  db,
} from './firebaseConfig';

type RegisterData = {
  nome: string;
  email: string;
  senha: string;
  role:
    | 'aluno'
    | 'atendente';

  cpf?: string;
  telefone?: string;
  dataNascimento?: string;
  curso?: string;
};

export async function
register(
  data: RegisterData
) {

  const userCredential =
    await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.senha
    );

  const uid =
    userCredential.user.uid;

  await setDoc(
    doc(
      db,
      'users',
      uid
    ),
    {
      uid,
      nome:
        data.nome,
      email:
        data.email,
      role:
        data.role,
    }
  );

  if (
    data.role ===
    'aluno'
  ) {

    await setDoc(
      doc(
        db,
        'alunos',
        uid
      ),
      {
        userId: uid,

        nomeCompleto:
          data.nome,

        cpf:
          data.cpf,

        dataNascimento:
          data.dataNascimento,

        email:
          data.email,

        telefone:
          data.telefone,

        curso:
          data.curso,

        status:
          'Pendente',

        rgUrl: '',
        certificadoUrl:
          '',

        criadoEm:
          serverTimestamp(),
      }
    );
  }

  return userCredential.user;
}

export async function
login(
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

export async function
logout() {

  await signOut(
    auth
  );
}