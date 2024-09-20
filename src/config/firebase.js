
const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');
// const { initializeApp } = require('firebase-admin/app');
const admin = require('firebase-admin');

const serviceAccount = require('../../serviceAccountKey.json');

require('dotenv').config();

const {

    API_KEY,
    AUTH_DOMAIN,
    PROJECT_ID,
    STORAGE_BUCKET,
    MESSAGING_SENDER_ID,
    APP_ID,
} = process.env;



const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID
};


const firebaseApp = initializeApp(firebaseConfig);
console.log("firebaseApp", firebaseApp);
console.log("api key is", API_KEY);


const db = getFirestore(firebaseApp);
module.exports = { db };