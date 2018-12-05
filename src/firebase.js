import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
var config = {
    apiKey: "AIzaSyCQ4mluKQMc76D2sHEmPX85x0LSED2BFB0",
    authDomain: "react-slack-chat-a9edb.firebaseapp.com",
    databaseURL: "https://react-slack-chat-a9edb.firebaseio.com",
    projectId: "react-slack-chat-a9edb",
    storageBucket: "react-slack-chat-a9edb.appspot.com",
    messagingSenderId: "811485168009"
  };
  firebase.initializeApp(config);

  export default firebase