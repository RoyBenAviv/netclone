import { firebaseService } from './firebase.service'

const COLLECTION = 'tvshows'

export const tvShowsService = {
  query,
}

async function query() {
  return await firebaseService.getDocuments(COLLECTION)
}

