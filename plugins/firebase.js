import * as firebase from 'firebase'
import 'firebase/database'
import 'firebase/auth'

// Your web app's Firebase configuration
if (!firebase.apps.length) {
  const firebaseConfig = {
    apiKey: 'AIzaSyBnERuGcXsE3j-CNZm1jNKAZptpdRq4FK4',
    authDomain: 'mydatabase101-1b429.firebaseapp.com',
    databaseURL: 'https://mydatabase101-1b429.firebaseio.com',
    projectId: 'mydatabase101-1b429',
    storageBucket: 'mydatabase101-1b429.appspot.com',
    messagingSenderId: '866923770548',
    appId: '1:866923770548:web:051cebe5fb8b6b5e9a5de1',
    measurementId: 'G-QZC5HR43J6'
  }
  firebase.initializeApp(firebaseConfig)
}

// firebase.initializeApp(firebaseConfig)
const dbref = firebase.database().ref('chartbox')
export { dbref }
