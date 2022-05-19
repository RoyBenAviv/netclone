import { firebaseService } from './firebase.service'

const COLLECTION = 'movies'

export const movieService = {
  query,
}

async function query() {
  return await firebaseService.getDocuments(COLLECTION)
}

