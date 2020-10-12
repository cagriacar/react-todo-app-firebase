

  import firebase from "firebase";

  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCvOc9bOpR7qd5LtiFSNqf34BwDfPJ6Epc",
    authDomain: "todo-app-cp-769ff.firebaseapp.com",
    databaseURL: "https://todo-app-cp-769ff.firebaseio.com",
    projectId: "todo-app-cp-769ff",
    storageBucket: "todo-app-cp-769ff.appspot.com",
    messagingSenderId: "284124660278",
    appId: "1:284124660278:web:8498a1395667a574458e97",
    measurementId: "G-YNZ1FXSL92"
      }
    )
      const db = firebaseApp.firestore();

      export default db;

