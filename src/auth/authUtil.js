const { collection, getDocs, query, where } = require('firebase/firestore');
const { db } = require('../config/firebase');


async function getUserByEmail() {
    console.log("inside getUserByEmail");
    const usersCollection = collection(db, 'users');
    const memberCode = 'MO01'

    try {
        const q = query(usersCollection, where('memberCode', '==', memberCode));
        // const docRef = doc(db, 'users', memberCode);
        let userDetail = [];

        // Fetch the document
        const docSnap = await getDocs(q);

        if (!docSnap.empty) {

            docSnap.forEach((doc) => {
                userDetail.push(doc.data());
                console.log('Document data:', doc.data());
            });
            console.log("userDetail inside authUtil", userDetail);
            return userDetail;
        } else {
            console.log('No such document!');
        }
    } catch (error) {
        console.error('Error fetching document: ', error);
    }



}

module.exports = {
    getUserByEmail
}
