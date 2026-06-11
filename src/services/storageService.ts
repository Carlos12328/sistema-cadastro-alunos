import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import app from './firebaseConfig';

const storage = getStorage(app);

export async function uploadDocumento(
  uri: string,
  userId: string,
  tipo: 'rg' | 'cpf'
): Promise<string> {
  const response = await fetch(uri);
  const blob = await response.blob();
  const path = 'documentos/' + userId + '/' + tipo + '_' + Date.now() + '.jpg';
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, blob);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
}
