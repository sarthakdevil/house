import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAaTOvYjqp_BZVnpcDfH_NdAs_0SN9w8r4",
  authDomain: "photos-f8863.firebaseapp.com",
  projectId: "photos-f8863",
  storageBucket: "photos-f8863.appspot.com",
  messagingSenderId: "1051895550584",
  appId: "1:1051895550584:web:0b48c6c27b579a594c538d",
  measurementId: "G-X553734496"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
export const storage = getStorage(app);
