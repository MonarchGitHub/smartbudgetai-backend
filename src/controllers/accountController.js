
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
        const currentMonth = new Date().toLocaleString('default', { month: 'long' });
        const currentYear = new Date().getFullYear();


        const budgetData = {
            month: currentMonth,
            year: currentYear,
            income: 0,
            expenses: 0,
            savings: 0,
            budget: 0,
            category: {
                food: 0,
                academics: 0,
                entertainment: 0,
                clothes: 0,
            },
        };

        const usersCollection = collection(db, 'users');
        const userDocRef = doc(db, 'users', uid);
        const budgetCollectionRef = collection(userDocRef, 'budgets');
        const userData = {
            name: name,
            phone: phone
        };
        await setDoc(doc(db, "users", uid), {
            userData
        });
        // await setDoc(doc(budgetCollectionRef, `01-2024`), budgetData);
        await setDoc(doc(budgetCollectionRef, `${currentMonth}-${currentYear}`), budgetData);
        // console.log('User created in database:', uid);

        return true;
    } catch (error) {
        console.error('Error creating user:', error);
    }
}


module.exports = {
    createUser
}
