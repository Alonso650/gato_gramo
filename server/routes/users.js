import express from 'express';

import { createUser, getUsers, getUser, updateUser } from '../controllers/users.js';

const router = express.Router(); 

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);

export default router;