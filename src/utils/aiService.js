// import { model } from "../config/gemini";
const { model } = require('../config/gemini');

function analyzeExpenses() {

}
function suggestBudgetAdjustments() {

}

async function testGemini() {
    const prompt = "Write a story about a bird in 2 lines";

    const result = await model.generateContent(prompt);
    console.log(result.response.text());

    return result
}



module.exports = {
    analyzeExpenses,
    suggestBudgetAdjustments,
    testGemini
}

