import { db } from "./database.js"; // Ensure db is imported correctly
import { data, updateIncome } from "./main.js";
import { doc, setDoc, getDoc, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js"; // Import onAuthStateChanged
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyB-seTgEBIFx2VdnQTyetjzE6jsAMy5NP0",
  authDomain: "expense-traker-1cd49.firebaseapp.com",
  databaseURL: "https://expense-traker-1cd49-default-rtdb.firebaseio.com",
  projectId: "expense-traker-1cd49",
  storageBucket: "expense-traker-1cd49.appspot.com",
  messagingSenderId: "1042460632115",
  appId: "1:1042460632115:web:0a9efe701c16bf9036af46",
  measurementId: "G-546Z1JD44P"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
let user = null; // Global variable for user
let dataFromDB;

document.addEventListener('DOMContentLoaded', () => {

   onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log('User is signed in:', currentUser);
        user = currentUser; // Update global user variable
      } else {
        console.log('No user is signed in');
        if (window.location.pathname.endsWith('main.html')) {
          window.location.href = "Login.html";
        }
      }
    });

  const addTransaction = document.querySelector('.add-transaction');
  if (addTransaction) {
    addTransaction.addEventListener('click', async (e) => {
      e.preventDefault();
      updateIncome();
      if (user) { // Check if user is not null
        try {
          await addData(data);
        } catch (error) {
          console.error('Error adding data:', error);
        }
      } else {
        console.error('No user is signed in.');
      }
    });
  } else {
    console.error('.add-transaction element not found');
  }
  
  // Optionally, you can call showData on page load or based on some event
  showData();
});

const addData = async (data) => {
  if (!user) {
    console.error('No user is signed in.');
    return;
  }
  try {
    const userDocRef = doc(db, "users", user.uid);
    
    // create a string that will used as the document name monthly  name must have month asnd yead combined togather
    const subcollectionRef = collection(userDocRef, "transactions"); // Create a subcollection under users/user.uid/transactions
    await addDoc(subcollectionRef, data);
    console.log('Data added successfully to subcollection');
  } catch (error) {
    console.error('Error adding document:', error);
  }
}

const showData = async () => {
  if (!user) {
    console.error('No user is signed in.');
    return;
  }
  try {
    const userDocRef = doc(db, "users", user.uid);
    const subcollectionRef = collection(userDocRef, "transactions"); // Reference to the subcollection
    const querySnapshot = await getDocs(subcollectionRef);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  } catch (error) {
    console.error('Error fetching documents:', error);
  }
}

function renderData(data) {
  console.log(data);
}

export { addData, showData };
