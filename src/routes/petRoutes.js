import { Router } from 'express';
import {
  criarPet,
  listarPets,
  buscarPetPorId,
  atualizarPet,
  deletarPet
} from '../controllers/petController.js';

const router = Router();

router.post('/', criarPet);
router.get('/', listarPets);
router.get('/:id', buscarPetPorId);
router.put('/:id', atualizarPet);
router.delete('/:id', deletarPet);

export default router;