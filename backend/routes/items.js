// routes/items.js
const express = require('express');
const auth = require('../middleware/auth');
const Item = require('../models/Items');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  const items = await Item.find({ user: req.user });
  res.json(items);
});

router.post('/', auth, async (req, res) => {
  const item = await Item.create({ ...req.body, user: req.user });
  res.json(item);
});

router.delete('/:id', auth, async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
