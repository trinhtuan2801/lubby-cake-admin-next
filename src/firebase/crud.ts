import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from 'firebase/firestore';
import firebaseServices from './services';
import { COLLECTION } from '@/constants';

const { firestore } = firebaseServices;

export const getDocumentById = (collectionName: COLLECTION, id: string) => {
  return getDoc(doc(firestore, collectionName, id));
};

export const getDocuments = (collectionName: COLLECTION) => {
  return getDocs(collection(firestore, collectionName));
};

export const addDocument = (collectionName: COLLECTION, data: object) => {
  return addDoc(collection(firestore, collectionName), data);
};

export const updateDocument = (
  collectionName: COLLECTION,
  id: string,
  data: object,
) => {
  return setDoc(doc(firestore, collectionName, id), data, { merge: true });
};

export const deleteDocument = (collectionName: COLLECTION, id: string) => {
  return deleteDoc(doc(firestore, collectionName, id));
};
