import firebase from "./firebase";
import db from "./db";
export const handleDataChange = (requests, snapshot) => {
  const changes = snapshot.docChanges();
  const modified = changes.map(x => runReducer(requests, x)).filter(x => x);
  return [...requests, ...modified];
};

export const addRequest = req => {
  const breakdown = req.split("-");
  db.collection("Parties")
    .doc("hAlXTRnQLhPphs5OUsQ6")
    .collection("Requests")
    .add({
      title: breakdown[0].trim(),
      artist: breakdown[1].trim(),
      upvotes: 0,
      played: false,
      time_add: firebase.firestore.FieldValue.serverTimestamp()
    });
};

const runReducer = (requests, change) => {
  switch (change.type) {
    case "added":
      return { ...change.doc.data(), id: change.doc.id };
    case "modified": {
      requests.splice(requests.findIndex(x => x.id === change.doc.id), 1);
      return { ...change.doc.data(), id: change.doc.id };
    }
    case "removed":
      requests.splice(requests.findIndex(x => x.id === change.doc.id), 1);
      break;
    default:
      return null;
  }
};
