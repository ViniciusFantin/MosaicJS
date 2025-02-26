import { initializeApp } from "firebase/app";
import { getFireStore } from "firebase/firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBao1Qlcd-76bRE5g5kbK7YrIbakQRtBdk",
  authDomain: "myspace-f170c.firebaseapp.com",
  projectId: "myspace-f170c",
  storageBucket: "myspace-f170c.firebasestorage.app",
  messagingSenderId: "743741621438",
  appId: "1:743741621438:web:ea29f8b561b1a896cd4aef",
};

const app = initializeApp(firebaseConfig);
const db = getFireStore(app);

export { db };
