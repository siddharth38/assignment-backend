const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.register = async (req, res) => {
    try {
        const { firstName, lastName, email, role, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('User already registered');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ firstName, lastName, email, role, password: hashedPassword });
        await user.save();
        res.status(201).send('User registered');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send('User not registered');
        }

        if (!await bcrypt.compare(password, user.password)) {
            return res.status(400).send('Invalid credentials');
        }

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '4h' });


        res.send({
            token,
            name: `${user.firstName} ${user.lastName}`,
            role: user.role
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
};
