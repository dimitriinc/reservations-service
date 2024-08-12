// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: 'redacted',
    authDomain: 'redacted',
    databaseURL: 'redacted',
    projectId: 'redacted',
    storageBucket: 'redacted',
    messagingSenderId: 'redacted',
    appId: 'redacted',
    measurementId: 'redacted',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage(app)

export { db, storage }
