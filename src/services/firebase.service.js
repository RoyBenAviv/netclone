import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDoc, getFirestore, doc, collection, getDocs, setDoc } from 'firebase/firestore'

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

const getDocuments = async (collectionName) => {
  const db = getFirestore(app)
  var collectionRef = collection(db, collectionName)
  const querySnapshot = await getDocs(collectionRef)
  const docs = []
  querySnapshot.forEach((doc) => {
    docs.push({ id: doc.id, ...doc.data() })
  })
  return docs
}

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

const addDocument = async (collectionName, id, document) => {
  const db = getFirestore(app)
  try {
    const docRef = await setDoc(doc(db, collectionName, id), document)
    return docRef
  } catch (err) {
    console.error('Error adding document: ', err)
    throw err
  }
}

async function saveDocument(collectionName, document, id) {
  const db = getFirestore(app)
  const newTaskRef = doc(db, collectionName, id)
  await setDoc(newTaskRef, document)
}

export const firebaseService = {
  db,
  auth,
  getDocuments,
  getDocument,
  addDocument,
  saveDocument,
}
