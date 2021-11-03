import express from 'express';

import { getAllGrams, getGram, createGram, updateGram, deleteGram } from '../controllers/grams.js';

const router = express.Router();

router.get('/', getAllGrams);
router.get('/:id', getGram);
router.post('/', createGram);
router.put('/:id', updateGram);
router.delete('/:id', deleteGram);

export default router;