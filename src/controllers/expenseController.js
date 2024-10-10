const { getUserByEmail } = require('../auth/authUtil');
const { getAuth, createUserWithEmailAndPassword } = require('firebase/auth');



const { collection, getDoc, addDoc, doc, updateDoc, deleteDoc } = require('firebase/firestore');
const { db } = require('../config/firebase');

async function getBudget(uid, month, year) {
    try {
        const usersCollection = collection(db, 'users');
        const userDocRef = doc(db, 'users', uid);
        const budgetCollectionRef = collection(userDocRef, 'budgets');
        const budgetDocRef = doc(budgetCollectionRef, `${month}-${year}`);

        const budgetDocSnap = await getDoc(budgetDocRef);

        if (budgetDocSnap.exists()) {
            console.log(`Budget fetched for ${month} ${year} for user ${uid}`);
            return budgetDocSnap.data();
        } else {
            console.log(`No budget found for ${month} ${year} for user ${uid}`);
            return null;
        }
    } catch (error) {
        console.error('Error fetching budget:', error);
        return null;
    }
}
async function updateBudget(uid, month, year, budgetData) {
    try {
        const usersCollection = collection(db, 'users');
        const userDocRef = doc(db, 'users', uid);
        const budgetCollectionRef = collection(userDocRef, 'budgets');
        const budgetDocRef = doc(budgetCollectionRef, `${month}-${year}`);

        await updateDoc(budgetDocRef, budgetData);

        console.log(`Budget updated for ${month} ${year} for user ${uid}`);

        return true;
    } catch (error) {
        console.error('Error updating budget:', error);
        return false;
    }
}
// Function to delete an expense
async function addCategory(uid, month, year, categoryName, value) {
    try {
        const usersCollection = collection(db, 'users');
        const userDocRef = doc(db, 'users', uid);
        const budgetCollectionRef = collection(userDocRef, 'budgets');
        const budgetDocRef = doc(budgetCollectionRef, `${month}-${year}`);

        const budgetDocSnap = await getDoc(budgetDocRef);
        if (budgetDocSnap.exists()) {
            const budgetData = budgetDocSnap.data();
            if (budgetData.category[categoryName] === undefined) {
                budgetData.category[categoryName] = value;
                const totalExpenses = Object.values(budgetData.category).reduce((acc, value) => acc + value, 0);
                budgetData.expenses = totalExpenses;
                await updateDoc(budgetDocRef, budgetData);
                console.log(`Category ${categoryName} added for ${month} ${year} for user ${uid}`);
                return true;
            } else {
                console.log(`Category ${categoryName} already exists for ${month} ${year} for user ${uid}`);
                return false;
            }
        } else {
            console.log(`No budget found for ${month} ${year} for user ${uid}`);
            return false;
        }
    } catch (error) {
        console.error('Error adding category:', error);
        return false;
    }
}

async function updateCategory(uid, month, year, categoryName, newValue) {
    try {
        const usersCollection = collection(db, 'users');
        const userDocRef = doc(db, 'users', uid);
        const budgetCollectionRef = collection(userDocRef, 'budgets');
        const budgetDocRef = doc(budgetCollectionRef, `${month}-${year}`);

        const budgetDocSnap = await getDoc(budgetDocRef);
        if (budgetDocSnap.exists()) {
            const budgetData = budgetDocSnap.data();
            if (budgetData.category[categoryName] !== undefined) {
                budgetData.category[categoryName] = newValue;
                const totalExpenses = Object.values(budgetData.category).reduce((acc, value) => acc + value, 0);
                budgetData.expenses = totalExpenses;
                await updateDoc(budgetDocRef, budgetData);
                console.log(`Category ${categoryName} updated for ${month} ${year} for user ${uid}`);
                return true;
            } else {
                console.log(`Category ${categoryName} does not exist for ${month} ${year} for user ${uid}`);
                return false;
            }
        } else {
            console.log(`No budget found for ${month} ${year} for user ${uid}`);
            return false;
        }
    } catch (error) {
        console.error('Error updating category:', error);
        return false;
    }
}

async function deleteCategory(uid, month, year, categoryName) {
    try {
        const usersCollection = collection(db, 'users');
        const userDocRef = doc(db, 'users', uid);
        const budgetCollectionRef = collection(userDocRef, 'budgets');
        const budgetDocRef = doc(budgetCollectionRef, `${month}-${year}`);

        const budgetDocSnap = await getDoc(budgetDocRef);
        if (budgetDocSnap.exists()) {
            const budgetData = budgetDocSnap.data();
            if (budgetData.category[categoryName] !== undefined) {
                delete budgetData.category[categoryName];
                const totalExpenses = Object.values(budgetData.category).reduce((acc, value) => acc + value, 0);
                budgetData.expenses = totalExpenses;
                await updateDoc(budgetDocRef, budgetData);
                console.log(`Category ${categoryName} deleted for ${month} ${year} for user ${uid}`);
                return true;
            } else {
                console.log(`Category ${categoryName} does not exist for ${month} ${year} for user ${uid}`);
                return false;
            }
        } else {
            console.log(`No budget found for ${month} ${year} for user ${uid}`);
            return false;
        }
    } catch (error) {
        console.error('Error deleting category:', error);
        return false;
    }
}

async function getCategories(uid, month, year) {
    try {
        const usersCollection = collection(db, 'users');
        const userDocRef = doc(db, 'users', uid);
        const budgetCollectionRef = collection(userDocRef, 'budgets');
        const budgetDocRef = doc(budgetCollectionRef, `${month}-${year}`);

        const budgetDocSnap = await getDoc(budgetDocRef);
        if (budgetDocSnap.exists()) {
            const budgetData = budgetDocSnap.data();
            const categories = budgetData.category;
            console.log(`Categories fetched for ${month} ${year} for user ${uid}`);
            return categories;
        } else {
            console.log(`No budget found for ${month} ${year} for user ${uid}`);
            return null;
        }
    } catch (error) {
        console.error('Error fetching categories:', error);
        return null;
    }
}
// Export the functions
module.exports = {
    updateBudget,
    getBudget,
    getCategories,
    deleteCategory,
    updateCategory,
    addCategory
};