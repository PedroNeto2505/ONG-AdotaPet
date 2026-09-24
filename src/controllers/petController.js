import crypto from 'crypto';
import { lerDados, salvarDados } from '../utils/database.js';

// 1. Cadastrar um Pet
export async function criarPet(req, res) {
  const { nome, especie, porte, idade, ongId } = req.body;

  if (!nome || !especie || !porte || !ongId) {
    return res.status(400).json({ mensagem: 'Nome, espécie, porte e ongId são obrigatórios.' });
  }

  // Verifica se a ONG informada realmente existe
  const ongs = await lerDados('ongs');
  const ongExiste = ongs.find((item) => item.id === ongId);
  if (!ongExiste) {
    return res.status(404).json({ mensagem: 'ONG informada não existe.' });
  }

  const pets = await lerDados('pets');

  const novoPet = {
    id: crypto.randomUUID(),
    nome,
    especie,
    porte,
    idade: idade || 'Não informada',
    status: 'disponivel',
    ongId
  };

  pets.push(novoPet);
  await salvarDados('pets', pets);

  return res.status(201).json(novoPet);
}

// 2. Listar Pets (com suporte a filtro por espécie na URL: ?especie=gato)
export async function listarPets(req, res) {
  const { especie } = req.query;
  const pets = await lerDados('pets');

  if (especie) {
    const petsFiltrados = pets.filter(
      (item) => item.especie.toLowerCase() === especie.toLowerCase()
    );
    return res.status(200).json(petsFiltrados);
  }

  return res.status(200).json(pets);
}

// 3. Buscar Pet por ID trazendo os dados da ONG vinculada
export async function buscarPetPorId(req, res) {
  const { id } = req.params;
  const pets = await lerDados('pets');

  const pet = pets.find((item) => item.id === id);
  if (!pet) {
    return res.status(404).json({ mensagem: 'Pet não encontrado.' });
  }

  const ongs = await lerDados('ongs');
  const ongResponsavel = ongs.find((item) => item.id === pet.ongId);

  return res.status(200).json({
    ...pet,
    ong: ongResponsavel || null
  });
}

// 4. Atualizar os dados de um Pet
export async function atualizarPet(req, res) {
  const { id } = req.params;
  const { nome, especie, porte, idade, status } = req.body;

  const pets = await lerDados('pets');
  const pet = pets.find((item) => item.id === id);

  if (!pet) {
    return res.status(404).json({ mensagem: 'Pet não encontrado para atualização.' });
  }

  // Atualiza apenas os campos que forem enviados na requisição
  if (nome) pet.nome = nome;
  if (especie) pet.especie = especie;
  if (porte) pet.porte = porte;
  if (idade) pet.idade = idade;
  if (status) pet.status = status;

  await salvarDados('pets', pets);

  return res.status(200).json(pet);
}

// 5. Excluir um Pet
export async function deletarPet(req, res) {
  const { id } = req.params;
  const pets = await lerDados('pets');

  const posicao = pets.findIndex((item) => item.id === id);
  if (posicao === -1) {
    return res.status(404).json({ mensagem: 'Pet não encontrado para remoção.' });
  }

  pets.splice(posicao, 1);
  await salvarDados('pets', pets);

  return res.status(204).send();
}