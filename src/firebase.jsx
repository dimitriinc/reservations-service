// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {

    apiKey: import.meta.env.VITE_PATO,
    authDomain: "cafe-y-vino.firebaseapp.com",
    databaseURL: "https://cafe-y-vino-default-rtdb.firebaseio.com",
    projectId: "cafe-y-vino",
    storageBucket: "cafe-y-vino.appspot.com",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: "G-D0VKYKE89E"
  };
  

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage(app)

export { db, storage }
