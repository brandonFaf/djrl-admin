import firebase from "./firebase";
// import "firebase/firebase-database";
const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true
});

export default db;
