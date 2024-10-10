const { testFirestore } = require('./testing/firestoretest');
const express = require('express');
const cors = require('cors');
const { createUser } = require('./controllers/accountController');
const app = express();
const port = process.env.PORT || 5000;


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
// Allow all origins
app.use(cors());
app.use(express.json());
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


// app.post('/login', async (req, res) => {

//     console.log("req.body in main", req.body);


//     const userDetail = await createUser(req.body.email, req.body.password);
//     console.log("userDetail in main", userDetail);

//     res.send({
//         userDetail
//     })
// })

app.post('/signup', async (req, res) => {
    try {
        // Destructure and validate incoming request body
        const { uid, name, phone } = req.body;

        // Input validation
        if (!uid || !name || !phone) {
            return res.status(400).json({ error: 'Missing required fields: uid, name, and phone' });
        }

        // Proceed to create the user
        const userDetail = await createUser(uid, name, phone);

        // Handle successful user creation
        return res.status(201).json({
            message: 'User created successfully',
            user: {
                uid: userDetail.uid,  // Return only safe fields
                name: userDetail.name,
                phone: userDetail.phone,
            },
        });

    } catch (error) {
        // Error logging for debugging in production (use a proper logging tool)
        console.error('Error creating user:', error);

        // Respond with a general error message without exposing details
        return res.status(500).json({
            error: 'Internal Server Error. Please try again later.',
        });
    }
});