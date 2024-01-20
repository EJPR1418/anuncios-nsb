import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
} from 'firebase/auth';
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
