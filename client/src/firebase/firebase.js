import firebase from 'firebase/app'
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyBmCkA-4PuuC0clQSoC_GC1qMEWi7abHdw",
    authDomain: "first-project-65d14.firebaseapp.com",
    databaseURL: "https://first-project-65d14.firebaseio.com",
    projectId: "first-project-65d14",
    storageBucket: "first-project-65d14.appspot.com",
    messagingSenderId: "993800731740",
    appId: "1:993800731740:web:a46a10248b603d7f583a99",
    measurementId: "G-8CKJ3TGPR6"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const storage = firebase.storage();

  export  {
    storage, firebase as default
  }