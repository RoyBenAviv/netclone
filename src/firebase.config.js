import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDoc, getFirestore, doc, addDoc, collection } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
}

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)
const auth = getAuth(app)


const getDocument = async (collectionName, id) => {
  const db = getFirestore(app)
  try {
    const snap = await getDoc(doc(db, collectionName, id))
    if (!snap.exists()) {
      return null
    }
    const docToReturn = snap.data()
    docToReturn.id = id
    return docToReturn
  } catch (err) {
    console.error('Error getting document: ', err)
    throw err
  }
}

const addDocument = async (collectionName, document) => {
  const db = getFirestore(app)
  try {
    const docRef = await addDoc(collection(db, collectionName), document)
    return docRef
  } catch (err) {
    console.error('Error adding document: ', err)
    throw err
  }
}

export const firebaseService = {
  getDocument,
  addDocument,
  db,
  auth
}
