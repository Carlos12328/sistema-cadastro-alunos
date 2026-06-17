import {
  doc,
  getDoc,
} from 'firebase/firestore';

import { db } from './firebaseConfig';

export async function getUserRole(
  uid: string
) {

  const docRef =
    doc(
      db,
      'users',
      uid
    );

  const snapshot =
    await getDoc(
      docRef
    );

  if (
    !snapshot.exists()
  ) {
    return null;
  }

  return snapshot.data()
    .role;
}
