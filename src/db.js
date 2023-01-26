import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getDatabase,
  ref,
  set,
  update,
} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";

// web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9TpzPneOPOEkdGhcpX39m239Gw58vdsQ",
  authDomain: "users-login-4c009.firebaseapp.com",
  projectId: "users-login-4c009",
  storageBucket: "users-login-4c009.appspot.com",
  messagingSenderId: "765968837432",
  appId: "1:765968837432:web:c9cc70a24068217451afcd",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase(app);

const createAccountForm = document.getElementById("submitData");
const login = document.getElementById("submit");

login.addEventListener("click", (e) => {
  e.preventDefault();

  var password = document.getElementById("loginPassword").value;
  var email = document.getElementById("username").value;

  signInWithEmailAndPassword(auth,email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
      var lgDate = new Date();
      update(ref(db, "users/" + user.uid), {
        last_login: lgDate,
      })
        .then(() => {
          alert("Login successfully ");
        })
        .catch((error) => {
          alert(error.message);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
});

createAccountForm.addEventListener("click", (e) => {
  e.preventDefault();

  var email = document.getElementById("emailAddress").value;
  var password = document.getElementById("password").value;
  var username = document.getElementById("signupUsername").value;

  createUserWithEmailAndPassword(auth, email, password, username)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
      set(ref(db, "users/" + user.uid), {
        username: username,
        password: password,
        email: email,
      })
        .then(() => {
          alert(
            "Your account has been created successfully with " + username + "."
          );
        })
        .catch((error) => {
          alert(error.message);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      alert(errorCode + ": " + errorMessage);
    });
});
