const router = require('express').Router();
const {
    getAllThoughts,
    getThroughById,
    createThought,
    addReaction,
    updateThought,
    deleteThought,
    removeReaction
} = require('../controllers/thoughts-controller')

// SET up GET all and POST at /api/thoughts
router 
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

//  /api/thought/<thoughtId>
router
    .route('/:id')
    .get(getThroughById)
    .put(updateThought)
    .delete(deleteThought)
    .post(createThought);

router
    .route('/:thoughtsId/:reactionId')
    .delete(removeReaction)

router.route('/:thoughtId/reactions').post(addReaction);

module.exports = router;