import { firebaseService } from './firebase.service'

const COLLECTION = 'users'

export const userService = {
  query,
  save,
  getById,
}

async function query() {
  return await firebaseService.getDocuments(COLLECTION)
}

async function save(userId, newUser) {
  return await firebaseService.addDocument(COLLECTION, userId, newUser)
}

async function getById(id) {
  return await firebaseService.getDocument(COLLECTION, id)
}
