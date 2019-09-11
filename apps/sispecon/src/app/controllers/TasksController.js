const express = require('express');
const router = express.Router();
router.post('/', async (req, res) => {
  res.status(200).send({ error: 'disabled' })
});
router.post('/update/:id', async (req, res) => {
  res.status(200).send({ error: 'disabled' })
});
router.post('/list', async (req, res ) => {
  res.status(200).send({ error: 'disabled' })
});
router.post('/:id', async (req, res ) => {
  res.status(200).send({ error: 'disabled' })
});
module.exports = app => app.use('/sispecon/tasks', router);