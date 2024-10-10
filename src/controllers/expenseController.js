const { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } = require('firebase/firestore');
const { db } = require('../config/firebase');

// Function to set a new expense
async function setExpense(expenseData) {
    try {
        const expensesCollection = collection(db, 'expenses');
        const docRef = await addDoc(expensesCollection, expenseData);
        console.log(`Expense added with ID: ${docRef.id}`);
        return docRef.id;
    } catch (error) {
        console.error('Error adding expense: ', error);
    }
}

// Function to update an existing expense
async function updateExpense(expenseId, updatedExpenseData) {
    try {
        const expenseDocRef = doc(db, 'expenses', expenseId);
        await updateDoc(expenseDocRef, updatedExpenseData);
        console.log(`Expense with ID ${expenseId} updated successfully`);
    } catch (error) {
        console.error('Error updating expense: ', error);
    }
}

// Function to delete an expense
async function deleteExpense(expenseId) {
    try {
        const expenseDocRef = doc(db, 'expenses', expenseId);
        await deleteDoc(expenseDocRef);
        console.log(`Expense with ID ${expenseId} deleted successfully`);
    } catch (error) {
        console.error('Error deleting expense: ', error);
    }
}

// Export the functions
module.exports = {
    setExpense,
    updateExpense,
    deleteExpense,
};