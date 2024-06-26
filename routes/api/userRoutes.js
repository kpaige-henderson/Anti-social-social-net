const express = require('express');
const router = express.Router();
const {
    getUsers,
    createUser,
    getSingleUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/usersControllers');

//routes for api users
router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;