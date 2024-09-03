const { testFirestore } = require('./testing/firestoretest');
const express = require('express');
const cors = require('cors');




const app = express();
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// OR Use CORS with specific options
app.use(cors({
    origin: 'http://localhost:3000',
}));

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
