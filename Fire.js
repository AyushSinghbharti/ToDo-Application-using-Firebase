// import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth"; // Import the "auth" module
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
 
const firebaseConfig = {
  apiKey: "AIzaSyABtZcLp4Z-9O6j0ciuAWlDwz8TEsDlZBM",
  authDomain: "yttodoapp-850c3.firebaseapp.com",
  projectId: "yttodoapp-850c3",
  storageBucket: "yttodoapp-850c3.appspot.com",
  messagingSenderId: "684100410758",
  appId: "1:684100410758:web:2036dbee04484e8afa2007",
};

class Fire {
  constructor(callback) {
    this.init(callback);
  }

  init(callback) {
    // Add callback as an argument here
    if (!firebase.apps.length) {
      // Check if the app is already initialized
      firebase.initializeApp(firebaseConfig); // Initialize the Firebase app
    }

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        callback(null, user);
      } else {
        firebase
          .auth()
          .signInAnonymously()
          .catch((error) => {
            callback(error);
          });
      }
    });
  }

  getLists(callback) {
    let ref = this.ref.orderBy('name')

    this.unsubscribe = ref.onSnapshot(snapshot => {
      lists = [];

      snapshot.forEach((doc) => {
        lists.push({ id: doc.id, ...doc.data() });
      });

      callback(lists);
    });
  }

  addList(list) {
    let ref = this.ref;

    ref.add(list);
  }

  updateList(list) {
    let ref = this.ref;

    ref.doc(list.id).update(list);
  }

  get userId() {
    return firebase.auth().currentUser.uid;
  }

  get ref() {
    return firebase
    .firestore()
    .collection("users")
    .doc(firebaseConfig.apiKey)
    .collection("lists");
  }

  detach() {
    this.unsubscribe();
  }
}

export default Fire;
