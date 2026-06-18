import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

export async function getUserRole(uid: string) {
  const docRef = doc(db, 'users', uid);

  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return null;
  }

  return docSnap.data().role;
}