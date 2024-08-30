const { collection, getDocs } = require('firebase/firestore');
const { db } = require('../config/firebase');
const { getUserByEmail } = require('../auth/authUtil');

async function testFirestore() {
    console.log("inside test");
    const userList = collection(db, 'users');
    const snapshot = await getDocs(userList);
    snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
    });

    getUserByEmail();
}

module.exports = {
    testFirestore
}
