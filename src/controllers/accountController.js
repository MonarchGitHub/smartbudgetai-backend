
const { collection, getDocs, doc, setDoc } = require('firebase/firestore');
const { db, checkIfUserExists } = require('../config/firebase');
const { getUserByEmail } = require('../auth/authUtil');
const { getAuth, createUserWithEmailAndPassword } = require('firebase/auth');




async function createUser(uid, name, phone) {

    const user = await checkIfUserExists(uid);

    if (!user) {
        console.log('User does not exist');
        return null;
    }

    try {

        const usersCollection = collection(db, 'users');

        const userData = {
            name: name,
            phone: phone,
        };
        await setDoc(doc(db, "users", uid), {
            userData
        });
        console.log('User created in database:', uid);

        return true;
    } catch (error) {
        console.error('Error creating user:', error);
    }
}


module.exports = {
    createUser
}
