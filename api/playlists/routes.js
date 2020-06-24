const controllers = require('./controllers.js');
const express = require('express');

const router = express.Router();

router.get('/', controllers.getAll);

router.get('/:id', controllers.getOne);

router.post('/', controllers.create);

router.put('/:id', controllers.update);

router.delete('/:id', controllers.delete);

router.delete('/:id/:trackid', controllers.delete_track);

router.post('/add_track', controllers.add_track);

module.exports = router;
