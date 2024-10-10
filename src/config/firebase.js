
const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');
// const { initializeApp } = require('firebase-admin/app');
const admin = require('firebase-admin');

const serviceAccount = require(process.env.SERVICE_ACCOUNT_KEY);

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

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount), // Or use admin.credential.cert(serviceAccount) for a service account key file
});

const checkIfUserExists = async (uid) => {
    try {
        const userRecord = await admin.auth().getUser(uid);
        console.log('User exists:', userRecord.toJSON());
        return userRecord.toJSON();
        // If the user exists, you can handle further logic here
    } catch (error) {
        if (error.code === 'auth/user-not-found') {
            console.log('User not found');
            // Handle logic if the user does not exist
        } else {
            console.error('Error fetching user data:', error);
        }
        return false;
    }
};

const firebaseApp = initializeApp(firebaseConfig);
console.log("firebaseApp", firebaseApp);
console.log("api key is", API_KEY);


const db = getFirestore(firebaseApp);
module.exports = { db, checkIfUserExists };