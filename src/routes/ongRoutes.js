import { Router } from 'express';
import { criarOng, listarOngs, buscarOngPorId, atualizarOng } from '../controllers/ongController.js';

const router = Router();

router.post('/', criarOng);
router.get('/', listarOngs);
router.get('/:id', buscarOngPorId);
router.put('/:id', atualizarOng);

export default router;