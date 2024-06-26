const router = require('express').Router();
const {
    getThoughts,
    createThought,
    getSingleThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtsControllers');

//routes for api thoughts
router.route('/').get(getThoughts).post(createThought)

router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought)

router.route('/:thoughtId/reactions/:reactionId').post(createReaction).delete(deleteReaction)
router.route('/:thoughtId/reactions').post(createReaction)

module.exports = router;