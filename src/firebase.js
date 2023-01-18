// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { addDoc, collection, getDocs, getFirestore, query } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);



// Currently, this doesn't handle if a habit with the same name already exists.
async function createHabit(db, habit) {
  try {
    const docRef = await addDoc(collection(db, "habits"), habit);
    console.log("here");
  } catch (e) {
    console.error("Error adding habit document: ", e);
  }
}

async function getHabits(db, userEmail) {
  const q = query(collection(db, "habits"));
  
  const querySnapshot = await getDocs(q);

  let result = [];
  querySnapshot.forEach((doc) => {
    result.push(doc.data());
  });

  console.log(result);
  
  return result;
}

export {db, createHabit, getHabits };
