import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const getStudents = async () => {
  const q = query(
    collection(db, "users"),
    where("role", "==", "aluno")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};