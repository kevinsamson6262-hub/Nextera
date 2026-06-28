import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCV1dD6XXZBYcqOa77DAp-fn-tkdBH-8xE",
  authDomain: "nextera-b3149.firebaseapp.com",
  projectId: "nextera-b3149",
  storageBucket: "nextera-b3149.firebasestorage.app",
  messagingSenderId: "956886681301",
  appId: "1:956886681301:web:64fb7023e9544cee31045c"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);