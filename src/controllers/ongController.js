import crypto from 'crypto';
import { lerDados, salvarDados } from '../utils/database.js';

// 1. Cadastrar uma nova ONG
export async function criarOng(req, res) {
  const { nome, email, telefone, cidade, estado } = req.body;

  // Validação simples de campos obrigatórios
  if (!nome || !email || !telefone || !cidade || !estado) {
    return res.status(400).json({ mensagem: 'Preencha todos os campos obrigatórios.' });
  }

  const ongs = await lerDados('ongs');

  // Verifica se já existe uma ONG cadastrada com o mesmo email
  const ongJaExiste = ongs.find((item) => item.email === email);
  if (ongJaExiste) {
    return res.status(400).json({ mensagem: 'Este e-mail de ONG já está em uso.' });
  }

  const novaOng = {
    id: crypto.randomUUID(),
    nome,
    email,
    telefone,
    cidade,
    estado
  };

  ongs.push(novaOng);
  await salvarDados('ongs', ongs);

  return res.status(201).json(novaOng);
}

// 2. Listar todas as ONGs
export async function listarOngs(req, res) {
  const ongs = await lerDados('ongs');
  return res.status(200).json(ongs);
}

// 3. Buscar uma ONG específica pelo ID
export async function buscarOngPorId(req, res) {
  const { id } = req.params;
  const ongs = await lerDados('ongs');

  const ong = ongs.find((item) => item.id === id);

  if (!ong) {
    return res.status(404).json({ mensagem: 'ONG não encontrada.' });
  }

  return res.status(200).json(ong);
}
// 4. Atualizar os dados de uma ONG
export async function atualizarOng(req, res) {
  const { id } = req.params;
  const { nome, email, telefone, cidade, estado } = req.body;

  const ongs = await lerDados('ongs');
  const ong = ongs.find((item) => item.id === id);

  if (!ong) {
    return res.status(404).json({ mensagem: 'ONG não encontrada para atualização.' });
  }

  // Atualiza apenas os campos enviados no corpo da requisição
  if (nome) ong.nome = nome;
  if (email) ong.email = email;
  if (telefone) ong.telefone = telefone;
  if (cidade) ong.cidade = cidade;
  if (estado) ong.estado = estado;

  await salvarDados('ongs', ongs);

  return res.status(200).json(ong);
}