const { Thoughts, User } = require('../models');

// Set up Thoughts Controller
const thoughtsController = {
    // get thoughts
    getAllThoughts(req, res) {
        Thoughts.find({})
            .populate({ path: 'reactions', select:'-__v'})
            .select('-__v')
            .then(dbThoughtsData => res.json(dbThoughtsData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })    
    },

    // get thoughts by id
    getThoughtsById(req, res) {
        Thoughts.findOne({ _id: req.params.id })
        .populate({ path: 'reactions', select:'-__v'})
        .select('-__v')
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({ message: "No thought found." });
                return;
            }
            res.json(dbThoughtsData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // create thoughts
    createThoughts({ params, body }, res) {
        Thoughts.create(body)
        .then(({_id}) => {
            return User.findOneAndUpdate(
                { username: body.username },
                { $plush: { thoughts: _id } },
                { new: true }
            );
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message:"No user found with this username!"});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    // update a thought by Id
    updateThought({ params, body }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true, runValidators: true }
        )
        .then(updatedThoughts => {
            if (!updatedThoughts) {
                return res.status(404).json({ message: "No thought with this ID." });
            }
        res.json(updatedThoughts);
        })
        .catch(err => res.json(err));
    },

   // delete a thought by ID 
   deleteThoughts({ params, body }, res) {
    Thoughts.findOneAndDelete({ _id: params.id })
    .then(deletedThoughts => {
        if (!deletedThoughts) {
            return res.status(404).json({ message: "No thought with this ID." })
        }
        res.json(deletedThoughts);
    })
    .catch(err => res.json(err));
   },

   // Add a Reaction
   addReaction({params}, res) {
    Thoughts.findOneAndUpdate(
        { _id: params.thoughtId },
        { $push: {reactions: body } },
        { new: true, runValidators: true }
    )
    .then(dbThoughtsData => {
        if (!dbThoughtsData) {
            res.status(404).json({ message:"No thoughts with this ID." });
            return;
        }
        res.json(dbThoughtsData)
    })
    .catch(err => res.json(err));
   },
   
   // Delete a Reaction
   removeReaction({ params }, res) {
    Thoughts.findOneAndUpdate(
        { _id: params.thoughtId },
        { $pull: {reactions: { reactionId: params.reactionId } } },
        { new: true }
    )
    .then(dbThroughData => res.json(dbThoughtsData))
    .catch(err => res.json(err));
   }
};

module.exports = thoughtsController