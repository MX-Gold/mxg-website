import PocketBase from 'pocketbase'

const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL ?? 'http://localhost:8090')

export default {
  pb,
  user: pb.collection('users'),
  userMeta: pb.collection('userMetas'),
  trade: pb.collection('trades'),
}
