import express from 'express';

import { getAllGrams, getGram, createGram, updateGram, deleteGram } from '../controllers/grams.js';

const router = express.Router();

router.get('/getAllGrams', getAllGrams);
router.get('/getGram/:id', getGram);
router.post('/createGram', createGram);
router.put('/updateGram/:id', updateGram);
router.delete('/deleteGram/:id', deleteGram);

export default router;