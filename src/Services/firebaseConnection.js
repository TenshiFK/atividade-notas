import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCmqYP4vqgpfb0-u1U_vLdePj3aw9L0uWg",
    authDomain: "ativ-notas.firebaseapp.com",
    projectId: "ativ-notas",
    storageBucket: "ativ-notas.appspot.com",
    messagingSenderId: "949097704689",
    appId: "1:949097704689:web:26b9523e88644ea59dcd50"
  };

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { auth, db, storage };