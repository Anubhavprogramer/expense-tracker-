import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

let user = null; // Exported as a module-level variable
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
auth.languageCode = 'en';
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', () => {
  const googleLogin = document.getElementById('Google');
  if (googleLogin) {
    googleLogin.addEventListener('click', async () => { 
      try {
        const result = await signInWithPopup(auth, provider);
        user = result.user;
        // console.log(user);

        // Store or update user data in Firestore
        const userDocRef = doc(db, 'users', user.uid);
        await setDoc(userDocRef, {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          lastLogin: new Date()
        });

        window.location.href = "main.html";
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        // console.error(`Error ${errorCode}: ${errorMessage}`);
      }
    });
  }

  const logout = document.getElementById('logout');
  if (logout) {
    logout.addEventListener('click', async () => {
      try {
        console.log('logout clicked');
        await auth.signOut();
        console.log('User signed out');
        user = null; // Reset user on sign out
        window.location.href = "Login.html";
      } catch (error) {
        console.error(error);
      }
    });
  }

  // Check authentication state
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // console.log('User is signed in:', user);
      // Optionally, you can perform actions with the user data here
    } else {
      console.log('No user is signed in');
      if (window.location.pathname.endsWith('main.html')) {
        window.location.href = "index.html";
      }
    }
  });
});

export { auth, db, user }; // Export user
