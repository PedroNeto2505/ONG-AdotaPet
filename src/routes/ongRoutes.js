import { Router } from 'express';
import { criarOng, listarOngs, buscarOngPorId } from '../controllers/ongController.js';

const router = Router();

router.post('/', criarOng);
router.get('/', listarOngs);
router.get('/:id', buscarOngPorId);

export default router;