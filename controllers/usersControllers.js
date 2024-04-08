const User = require('../models/User');
const Thought = require('../models/Thought');

module.exports = {
    // Get users
    async getUsers(req, res) {
        try {
            const users = await User.find()
                .populate({ path: 'thoughts', select: '-__v' })
                .populate({ path: 'friends', select: '-__v' })
                .select('-__v');
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Create user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // get single user
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne(
                { _id: req.params.userId })
                .populate({ path: 'thoughts', select: '-__v' })
                .populate({ path: 'friends', select: '-__v' })
                .select('-__v');

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.json(this.getUsers);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Update a user
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { new: true }
            );

            if (!user) {
                res.status(404).json({ message: 'No user with this id!' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Delete a user
    deleteUser(req, res) {
        User.findByIdAndDelete(req.params.userId)
          .then((user) => {
            if (!user) {
              return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json({ message: 'User successfully deleted' });
          })
          .catch((err) => res.status(500).json(err));
      },
      
    // add friend
    addFriend(req, res) {
        User.findByIdAndUpdate(
          req.params.userId,
          { $addToSet: { friends: req.params.friendId } },
          { new: true, runValidators: true }
        )
          .then((user) => {
            if (!user) {
              return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(user);
          })
          .catch((err) => res.status(500).json(err));
      },
    // delete friend
    deleteFriend(req, res) {
        User.findByIdAndUpdate(
          req.params.userId,
          { $pull: { friends: req.params.friendId } },
          { new: true }
        )
          .then((user) => {
            if (!user) {
              return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(user);
          })
          .catch((err) => res.status(500).json(err));
      }
    };

