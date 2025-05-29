const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

let users = [];
let currentId = 1;

app.post('/api/user', (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        res.status(400).json({ message: "Missing name or email" });
    }

    const newUser = { id: currentId++, name, email };
    users.push(newUser);
    res.status(201).json(newUser);
})

app.get("/api/users", (req, res) => {
    res.status(200).json(users);
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});