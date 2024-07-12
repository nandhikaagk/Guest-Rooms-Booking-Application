const express = require("express");
const router = express.Router();
const Houseowner = require("../roommodels/houseowner");
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    const newhouseowner = new Houseowner({ name, email, password });
    try {
        const houseowner = await newhouseowner.save();
        res.send('Houseowner Registered Successfully');
    } catch (error) {
        return res.status(400).json({ error });
    }
});
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const houseowner = await Houseowner.findOne({ email, password });

        if (houseowner) {
            const temporary = {
                name: houseowner.name,
                email: houseowner.email,
                _id: houseowner._id
            };
            res.send(temporary);
        } else {
            return res.status(400).json({ message: 'Login failed' });
        }
    } catch (error) {
        return res.status(400).json({ error });
    }
});

module.exports = router;
