import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBX0H74qmEJ0YGE200nB3Dbyv4NbP32vZ4",
  authDomain: "mosaic-a4ca6.firebaseapp.com",
  projectId: "mosaic-a4ca6",
  storageBucket: "mosaic-a4ca6.firebasestorage.app",
  messagingSenderId: "553230087621",
  appId: "1:553230087621:web:840cd44d407b0d0fbf87ac",
};
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
