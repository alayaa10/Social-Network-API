const router = require("express").Router();

const {
    getAllUsers,
    getUsersById,
    createUsers,
    addFriend,
    deleteUsers,
    updateUsers,
    removeFriend,
} = require("../../controllers/users-controller");

router.route("/").get(getAllUsers).post(createUsers);

router.route('/:id').get(getUsersById).put(updateUsers).delete(deleteUsers);

router.route('/id:friends/:friendId').post(addFriend).delete(removeFriend)

module.exports = router;