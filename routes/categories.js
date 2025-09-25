const express = require('express');
const router = express.Router();
const Category = require('../schemas/category');

router.post('/', async (req, res, next) => {
    try {
        const c = await Category.create(req.body);
        res.status(201).json(c);
    } catch (e) { next(e); }
});

router.get('/', async (req, res, next) => {
    try {
        const list = await Category.find({});
        res.json(list);
    } catch (e) { next(e); }
});

router.get('/:id', async (req, res, next) => {
    try {
        const c = await Category.findById(req.params.id);
        if (!c) return res.status(404).json({ message: 'Not found' });
        res.json(c);
    } catch (e) { next(e); }
});

router.put('/:id', async (req, res, next) => {
    try {
        const c = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!c) return res.status(404).json({ message: 'Not found' });
        res.json(c);
    } catch (e) { next(e); }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const r = await Category.findByIdAndDelete(req.params.id);
        if (!r) return res.status(404).json({ message: 'Not found' });
        res.json({ ok: true, id: r._id });
    } catch (e) { next(e); }
});

module.exports = router;
