const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtsById,
    createThoughts,
    addReaction,
    updateThought,
    deleteThoughts,
    removeReaction
} = require('../../controllers/thoughts-controller')

// SET up GET all and POST at /api/thoughts
router 
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

//  /api/thought/<thoughtId>
router
    .route('/:id')
    .get(getThoughtsById)
    .put(updateThought)
    .delete(deleteThoughts);

router
    .route('/:thoughtsId/:reactionId')
    .delete(removeReaction)

router.route('/:thoughtId/reactions').post(addReaction);

module.exports = router;