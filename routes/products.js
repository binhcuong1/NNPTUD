const express = require('express');
const router = express.Router();
const Product = require('../schemas/product');

router.get('/', async (req, res, next) => {
  try {
    const list = await Product.find({ isDelete: false });
    res.json(list);
  } catch (e) { next(e); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p || p.isDelete) return res.status(404).json({ message: 'Not found' });
    res.json(p);
  } catch (e) { next(e); }
});

router.post('/', async (req, res, next) => {
  try {
    const p = await Product.create(req.body);
    res.status(201).json(p);
  } catch (e) { next(e); }
});

router.put('/:id', async (req, res, next) => {
  try {
    const p = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!p) return res.status(404).json({ message: 'Not found' });
    res.json(p);
  } catch (e) { next(e); }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const p = await Product.findByIdAndUpdate(
      req.params.id,
      { isDelete: true },
      { new: true }
    );
    if (!p) return res.status(404).json({ message: 'Not found' });
    res.json({ ok: true, id: p._id });
  } catch (e) { next(e); }
});

module.exports = router;
