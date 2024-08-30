
const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');
require('dotenv').config();

const {

    API_KEY,
    AUTH_DOMAIN,
    PROJECT_ID,
    STORAGE_BUCKET,
    MESSAGING_SENDER_ID,
    APP_ID,
} = process.env;
// API_KEY = "AIzaSyBWVTy1n0ppyK2wlZNCstBwYH4noh_0_OY"
// AUTH_DOMAIN = "cusmartbudget.firebaseapp.com"
// PROJECT_ID = "cusmartbudget"
// STORAGE_BUCKET = "cusmartbudget.appspot.com"
// MESSAGING_SENDER_ID = "930238452730"
// APP_ID = "1:930238452730:web:40b47ad4d694a1d6244a43"




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