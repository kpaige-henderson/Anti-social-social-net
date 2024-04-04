const { User, Thoughts } = require('../models');

module.exports = {
    // Get users
    async getUsers(req, res) {
        try {
            const user = await User.find()
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
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });
            await Thought.deleteMany({_id: {$in: user.thoughts}});

            res.status(200).json({ message: 'User deleted!' });
            console.log(`Delected ${user}`);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // add friend
    async addFriend(req, res) {
        try {
            const user= await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.body } },
                { runValidators: true, new: true }
            )
            .populate({ path: 'thoughts', select: '-__v' })
                .populate({ path: 'friends', select: '-__v' })
                .select('-__v');

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // delete friend
    async deleteFriends(req, res) {
        try {
            const user= await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.body.friendId } },
            )
                .select('-__v');

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.json({ message: 'Friend deleted.' });
        } catch (err) {
            res.status(500).json(err);
        }
    }
}