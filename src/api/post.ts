import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../util/firebase';

export async function fetchPosts() {
  const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));

  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}
