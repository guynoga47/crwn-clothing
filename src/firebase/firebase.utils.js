import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAfRV6JDzO_pYi9VnTD96hc_ifY9VFzyGE",
  authDomain: "crwn-db-13d42.firebaseapp.com",
  databaseURL: "https://crwn-db-13d42.firebaseio.com",
  projectId: "crwn-db-13d42",
  storageBucket: "crwn-db-13d42.appspot.com",
  messagingSenderId: "281025014313",
  appId: "1:281025014313:web:a0e60b44f7b121e1524a38",
  measurementId: "G-FZSFCN8R98",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("Error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);
  console.log("collectionRef: ", collectionRef);

  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

/* 
What we want to do in the code below is to convert the raw snapShot collections from the firestore into
a collections array which is tailor made to our usage in this specific application, meaning we want to add
properties like routeName and id which weren't present in the data we stored in the database before, so we are
modifying the original data to fit our needs 

Note: we still need to convert it into an OBJECT afterwards, for Data Normalization.
*/

export const convertCollectionsSnapshotToMap = (collections) => {
  console.log(`collections: `, collections);
  const transformedCollections = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });
  /* 
  reduce input parameters:
  1. a reducer function that executes on each element, of the type: (accumulator, currentValue) => ...action
  2. a starting value for the reducer results on the elements. 
  
  so in our case, the accumulator starting value is an EMPTY OBJECT, and for each
  collection in our array, we add it's title as key for the accumulating object that we are building,
  and the value is the collection itself. so in the end we have an accumulator object with 5 keys,
  which are the lower cased collections titles: hats, jackets, sneakers, womens, mens.

  start:           accumulator is {}
  first iteration: accumulator is { hats: [hatsCollectionData...]}
  second iteration: accumulator is { hats: [hatsCollectionData...]
                                    jackets: [jacketsCollectionData...]
                                    }
  ect
  */
  return transformedCollections.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ promt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
