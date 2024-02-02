import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
} from 'firebase/auth';
import { db } from '../firebase/firebase';
import { ref as dRef, push, onValue } from 'firebase/database';

const EVENTS = 'nsb/events';

const auth = getAuth();

export const login = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  return user;
};

export const logout = async () => {
  await signOut(auth);
};

export const emailVerification = async () => {
  const user = auth.currentUser;
  await sendEmailVerification(user);
  alert('Verificar correo electronico');
};

export const pushEvent = async (values) => {
  try {
    await push(dRef(db, EVENTS), values);
  } catch (error) {
    throw error;
  }
};

export const fetchEvent = async () => {
  return onValue(dRef(db, 'nsb/events/'), (snapshot) => {
    let keys = [],
      values = [];
    snapshot.forEach((child) => {
      keys.push(child.key);
      values.push(child.val());
    });
    console.log(keys, values);
  });
};
