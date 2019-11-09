import firebase from 'firebase/app';
import 'firebase/analytics';

const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyDnzitIMJVHjnoYbOKKE4Abm4NFeSRHlsA',
  authDomain: 'fiery-pwa.firebaseapp.com',
  databaseURL: 'https://fiery-pwa.firebaseio.com',
  projectId: 'fiery-pwa',
  storageBucket: 'fiery-pwa.appspot.com',
  messagingSenderId: '507867920030',
  appId: '1:507867920030:web:faae3d6a29b9901f8bed8f',
  measurementId: 'G-KQ717SED0Y'
};

export const app = firebase.initializeApp(FIREBASE_CONFIG);
export const analytics = app.analytics();
