import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAMDdK36AwaFwHVEIZydBYBZE8kM00Ikh4",
  authDomain: "instagram-clone-abf6f.firebaseapp.com",
  projectId: "instagram-clone-abf6f",
  storageBucket: "instagram-clone-abf6f.appspot.com",
  messagingSenderId: "954754842536",
  appId: "1:954754842536:web:90c68a83bf89205ec4279d",
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const auth = firebase.auth();
const firestore = firebase.firestore();

export { auth };
export { firestore };
export default firebase;
