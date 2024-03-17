// Import the functions you need from the SDKs you need
import APP_ENV from '@/app-env';
import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = APP_ENV.firebase;

export const app = initializeApp(firebaseConfig);

const firebaseServices = {
  auth: getAuth(app),
  provider: new GoogleAuthProvider(),
  firestore: getFirestore(app),
  storage: getStorage(app),
};

const { auth, provider } = firebaseServices;

export const signInWithGoogle = () => signInWithPopup(auth, provider);

export default firebaseServices;
