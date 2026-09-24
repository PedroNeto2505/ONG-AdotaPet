import fs from 'fs/promises';
import path from 'path';

// Função auxiliar para ler dados de um arquivo JSON
export async function lerDados(nomeArquivo) {
  try {
    const caminho = path.resolve('data', `${nomeArquivo}.json`);
    const dados = await fs.readFile(caminho, 'utf-8');
    return JSON.parse(dados);
  } catch (erro) {
    // Pode retornar um array vazio
    return [];
  }
}

// Auxiliar para salvar dados JSON
export async function salvarDados(nomeArquivo, lista) {
  const caminho = path.resolve('data', `${nomeArquivo}.json`);
  const textoJson = JSON.stringify(lista, null, 2);
  await fs.writeFile(caminho, textoJson, 'utf-8');
}