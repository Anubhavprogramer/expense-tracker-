import { db, user } from "./database.js"; // Ensure user is imported correctly
import { data, updateIncome } from "./main.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js"; 

var dataFromDB;
const addTransaction = document.querySelector('.add-transaction');
addTransaction.addEventListener('click', (e) => {
    e.preventDefault();
    updateIncome();
    if (user) { // Check if user is not null
        addData(data);
    } else {
        console.error('No user is signed in.');
    }
});

const addData = async (data) => {
  if (!user) {
    console.error('No user is signed in.');
    return;
  }
  const docRef = doc(db, "users", user.uid);
  await setDoc(docRef, data, { merge: true });
}

const showData = async () => {
  if (!user) {
    console.error('No user is signed in.');
    return;
  }
  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    dataFromDB = docSnap.data();
    renderData(dataFromDB);
  } else {
    console.log("No such document!");
  }
}

function renderData(data) {
  console.log(data);
}

export { addData, showData };
