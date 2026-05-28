// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-47BHjI-iIWo3npwJdNaCyrsd606gAhc",
  authDomain: "sistema-cadastro-alunos-ab0cc.firebaseapp.com",
  projectId: "sistema-cadastro-alunos-ab0cc",
  storageBucket: "sistema-cadastro-alunos-ab0cc.firebasestorage.app",
  messagingSenderId: "735863991387",
  appId: "1:735863991387:web:983daa590f5e696325237e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export default app;



