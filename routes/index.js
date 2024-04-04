const router = require('express').Router();
const apiRoutes = require('./api');

//routes to initial api route
router.use('/api', apiRoutes);

//sends error
router.use((req, res) => res.send('Wrong route'));

module.exports = router;