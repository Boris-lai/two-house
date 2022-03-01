import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAa0yoNxzzGsf_a2yp7epzmm14Wt7_0Jl0",
  authDomain: "house-marketplace-app-604da.firebaseapp.com",
  projectId: "house-marketplace-app-604da",
  storageBucket: "house-marketplace-app-604da.appspot.com",
  messagingSenderId: "824042982304",
  appId: "1:824042982304:web:d09f4f575c94883f87f2c5"
};

// Initialize Firebase
initializeApp(firebaseConfig)
export const db = getFirestore()