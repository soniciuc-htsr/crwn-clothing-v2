import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider 
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCytWa9ZSRKVp4al5Svgya0bN3ezBD0Kd0",
    authDomain: "tutorial-crwn-db-23d99.firebaseapp.com",
    projectId: "tutorial-crwn-db-23d99",
    storageBucket: "tutorial-crwn-db-23d99.appspot.com",
    messagingSenderId: "576022596856",
    appId: "1:576022596856:web:45800e45fc61b344463f0d"
  };
  
  const firebaseAapp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        } catch(error) {
            console.log('error creating the user', error.message)
        }
    }
    return userDocRef;
  }