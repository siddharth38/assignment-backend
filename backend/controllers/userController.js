const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
    try {
        console.log(req.body)
        const { email, firstName, lastName, role, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ firstName, lastName, email, password: hashedPassword });
        await user.save();
        res.status(201).send('User created');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email, role } = req.body.selectedUser;
        const user = await User.findById(id);
        if (!user) return res.status(404).send('User not found');

        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.role = role;

        await user.save();
        res.send('User updated');
    } catch (error) {
        res.status(400).send(error.message);
    }
};


exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) return res.status(404).send('User not found');
        res.send('User deleted');
    } catch (error) {
        res.status(400).send(error.message);
    }
};
