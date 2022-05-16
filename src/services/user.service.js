import { firebaseService } from '../firebase.config'

const COLLECTION = 'users'

export const userService = {
  save,
  getById  
}


async function save(user) {
  return await firebaseService.addDocument(COLLECTION, user)
}

async function getById(id) {
    return await firebaseService.getDocument(COLLECTION, id)
  }