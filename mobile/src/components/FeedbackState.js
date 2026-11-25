import React from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';

export function LoadingState({ mensagem = 'Carregando...' }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#4F46E5" />
      <Text style={styles.texto}>{mensagem}</Text>
    </View>
  );
}

export function ErrorState({ mensagem = 'Não foi possível conectar à API.', onRetry }) {
  return (
    <View style={styles.container}>
      <Text style={styles.erroTexto}>{mensagem}</Text>
      {onRetry && (
        <TouchableOpacity style={styles.botao} onPress={onRetry}>
          <Text style={styles.botaoTexto}>Tentar novamente</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export function EmptyState({ mensagem = 'Nenhum registro encontrado.' }) {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>{mensagem}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  texto: { marginTop: 12, fontSize: 16, color: '#555', textAlign: 'center' },
  erroTexto: { fontSize: 16, color: '#DC2626', textAlign: 'center', marginBottom: 16 },
  botao: { backgroundColor: '#4F46E5', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
  botaoTexto: { color: '#FFF', fontWeight: 'bold' },
});