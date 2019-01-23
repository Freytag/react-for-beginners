import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyDCOxsqRWryyt9r452PCqkqHfJGqSJrhAY',
  authDomain: 'catch-of-the-day-3c682.firebaseapp.com',
  databaseURL: 'https://catch-of-the-day-3c682.firebaseio.com'
});

const base = Rebase.createClass(firebase.database());

//this is a named export
export { firebaseApp };

//this is a default export
export default base;
