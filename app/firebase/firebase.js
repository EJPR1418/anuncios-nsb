import firebase from 'firebase/compat/app';
import { getDatabase } from 'firebase/database';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDGqxzNGDPOmrFkeAjgLBQz05uWqUQRuDs',
  authDomain: 'newsigmabeta.firebaseapp.com',
  projectId: 'newsigmabeta',
  storageBucket: 'newsigmabeta.appspot.com',
  messagingSenderId: '277262378074',
  appId: '1:277262378074:web:4e6d33198416c3a715e463',
  measurementId: 'G-X9SBB0PC6Q',
};
const app = firebase.initializeApp(firebaseConfig);

// if (!firebase.apps.length) {
//   const app = firebase.initializeApp(firebaseConfig);
// }
const db = getDatabase(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { db, app, auth };
