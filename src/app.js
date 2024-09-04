const { testFirestore } = require('./testing/firestoretest');
const express = require('express');
const cors = require('cors');




const app = express();
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
// Allow all origins
app.use(cors());

// OR, if you want to allow credentials (e.g., cookies), use the following:
// app.use(cors({
//     origin: '*', // Allow any origin
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
//     allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
//     credentials: false, //not Allow cookies to be sent with requests
// }));


app.get('/', (req, res) => {
    res.json({
        message: '🔥'
    })
})


app.get('/testing', async (req, res) => {

    const userDetail = await testFirestore();
    console.log("userDetail in main", userDetail);

    res.send({
        userDetail
    })
})
