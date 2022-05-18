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

async function save(userId, user) {
  if (user.id) {
    return await firebaseService.saveDocument(COLLECTION, user, user.id)
  } else {
    return await firebaseService.addDocument(COLLECTION, userId, user)
  }
}

async function getById(id) {
  return await firebaseService.getDocument(COLLECTION, id)
}
