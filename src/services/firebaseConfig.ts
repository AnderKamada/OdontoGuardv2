import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"; 



const firebaseConfig = {
  apiKey: "AIzaSyChEG507GyjxWBSVfMweJTbnQPTjcuYDFU",
  authDomain: "odontoguardv2.firebaseapp.com",
  projectId: "odontoguardv2",
  storageBucket: "odontoguardv2.firebasestorage.app",
  messagingSenderId: "592187527578",
  appId: "1:592187527578:web:687c8a2b2d201b72662a23",
  measurementId: "G-DYN9ZQWQJE"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);