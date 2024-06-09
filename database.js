import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

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
        console.log(user);
        window.location.href = "main.html";
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`Error ${errorCode}: ${errorMessage}`);
      }
    });
  }

  const logout = document.getElementById('logout');
  if (logout) {
    logout.addEventListener('click', () => {
      console.log('logout clicked');
      auth.signOut().then(() => {
        console.log('User signed out');
        user = null; // Reset user on sign out
        window.location.href = "Login.html";
      }).catch((error) => {
        console.error(error);
      });
    });
  }
});

export { auth, db, user }; // Export user
