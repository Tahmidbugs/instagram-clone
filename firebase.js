import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCAyN18fcmCqPZ9sWtTT8m-AlWZkWSqA-w",
  authDomain: "project-instagram-1039f.firebaseapp.com",
  projectId: "project-instagram-1039f",
  storageBucket: "project-instagram-1039f.appspot.com",
  messagingSenderId: "769385802254",
  appId: "1:769385802254:web:eb7dec83d3fac5fd396a5f",
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

export { auth };
export { firestore };
export default firebase;
