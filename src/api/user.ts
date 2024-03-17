import { COLLECTION } from '@/constants';
import { getDocumentById } from '@/firebase/crud';
import { User } from 'firebase/auth';

export interface UserData extends UserFromDb {
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  uid: string;
}

export interface UserFromDb {
  roles: {
    admin: boolean;
    user: boolean;
  };
}

export const getUserFromDb = async (uid: string) => {
  const doc = await getDocumentById(COLLECTION.Users, uid);
  const data = doc.data();
  if (!data) return undefined;
  return data as UserFromDb;
};

export const getUserData = async (user: User) => {
  try {
    const { email, uid, photoURL, displayName } = user;
    const userFromDb = await getUserFromDb(uid);
    if (!userFromDb || !userFromDb.roles.admin) throw new Error();
    return {
      email,
      uid,
      photoURL,
      displayName,
      ...userFromDb,
    } as UserData;
  } catch (err) {
    return undefined;
  }
};
