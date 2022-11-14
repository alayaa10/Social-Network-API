// Require Users Model
const {Users} = require('../models');

const usersController = {

    // Get All Users
        getAllUsers(req, res) {
        Users.find({})
        .populate({
            path:"thoughts",
            select:'-__v'
        })
        .select('-__v')
        .then(dbUsersData => res.json(dbUsersData))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        });
    },

    // Create a new User
    createUsers({body}, res) {
        Users.create(body)
        .then(dbusersData => res.json(dbusersData))
        .catch(err => res.status(400).json(err));
    },

    // add friend 
    addFriend({ params}, res) {
        Users.findOneAndUpdate(
            {_id: params.UsersId},
            { $push: { friends: params.friendId }},
            { new: true, runValidators: true}
        )
        .then(dbUsersData => {
            if (!dbUsersData) {
                res.status(404).json({ message: "No user found with this ID." });
                return;
            }
            res.json(dbUsersData);
        })
        .catch(err => res.json(err));
    },

    // remove friend
    removeFriend( {params}, res) {
        Users.findOneAndUpdate(
            {_id: params.UsersId },
            { $pull: { friends: params.friendId }},
            { new: true}
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },

    // update user
    updateUser({ params, body }, res) {
        Users.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .then(dbUsersData => {
            if (!dbUsersData) {
                res.status(404).json({ message: "No user found with this ID" });
                return;
            }
            res.json(dbUsersData);
        })
        .catch(err => res.json(err))
    },

    // delete user
    deleteUser({ params}, res) {
        Users.findOneAndDelete({_id: params.id })
        .then(dbUsersData => {
        if(!dbUsersData) {
            res.status(404).json({ message: "No user found with this ID." });
            return;
        }
        res.json(dbUsersData);
        })
        .catch(err => res.status(400).json(err))
    }


};

module.exports = usersController 