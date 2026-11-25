import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { petService } from '../services/api';
import { LoadingState, ErrorState } from '../components/FeedbackState';

export default function HomeScreen() {
  const [totalPets, setTotalPets] = useState(null);
  const [erro, setErro] = useState(null);

  async function testarConexao() {
    setErro(null);
    setTotalPets(null);
    try {
      const pets = await petService.listar();
      setTotalPets(pets.length);
    } catch (e) {
      setErro('Falha ao conectar com a API. Verifique o IP e se o servidor está rodando.');
    }
  }

  useEffect(() => {
    testarConexao();
  }, []);

  if (erro) return <ErrorState mensagem={erro} onRetry={testarConexao} />;
  if (totalPets === null) return <LoadingState mensagem="Conectando à API AdotaPet..." />;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>AdotaPet Mobile</Text>
      <Text style={styles.subtitulo}>Conexão OK! Pets cadastrados na API: {totalPets}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  subtitulo: { fontSize: 16, color: '#16A34A', textAlign: 'center' },
});