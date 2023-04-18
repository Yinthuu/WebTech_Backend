const User = require('../models/user');

// GET /users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

// GET /users/:id
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send('Username not found');
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

// POST /users
exports.createUser = async (req, res) => {
  try {
    const { email, username } = req.body;
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      return res.status(409).send('Username or email already exists');
    }

    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};


// PATCH /users/:id
exports.updateUser = async (req, res) => {
  const updates = Object.keys(req.body);
  //const allowedUpdates = ['email', 'password', 'username', 'purchase_history', 'shipping_address'];
  const allowedUpdates = ['email', 'password', 'username', 'address', 'city', 'state', 'country'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));
  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send('Username not found');
    }
    updates.forEach(update => user[update] = req.body[update]);
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

// DELETE /users/:id
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};
