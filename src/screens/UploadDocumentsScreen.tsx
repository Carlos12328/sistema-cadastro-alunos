import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, ScrollView, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { otimizarImagem } from '../services/imageService';
import { uploadDocumento } from '../services/storageService';
import { useAuth } from '../context/AuthContext';

type DocType = 'rg' | 'cpf';

interface DocState {
  uri: string | null;
  uploading: boolean;
  uploadedUrl: string | null;
}

export default function UploadDocumentsScreen() {
  const { user } = useAuth();
  const [rg, setRg] = useState<DocState>({ uri: null, uploading: false, uploadedUrl: null });
  const [cpf, setCpf] = useState<DocState>({ uri: null, uploading: false, uploadedUrl: null });

  const setDoc = (tipo: DocType, partial: Partial<DocState>) => {
    if (tipo === 'rg') setRg(prev => ({ ...prev, ...partial }));
    else setCpf(prev => ({ ...prev, ...partial }));
  };

  const getDoc = (tipo: DocType) => (tipo === 'rg' ? rg : cpf);

  async function selecionarImagem(tipo: DocType) {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissao necessaria', 'Precisamos de acesso a galeria para selecionar documentos.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled && result.assets[0]) {
      const asset = result.assets[0];
      const otimizada = await otimizarImagem(asset.uri, asset.width, asset.height);
      setDoc(tipo, { uri: otimizada.uri, uploadedUrl: null });
    }
  }

  async function fazerUpload(tipo: DocType) {
    const doc = getDoc(tipo);
    if (!doc.uri || !user) return;
    setDoc(tipo, { uploading: true });
    try {
      const url = await uploadDocumento(doc.uri, user.uid, tipo);
      setDoc(tipo, { uploading: false, uploadedUrl: url });
      Alert.alert('Sucesso', tipo.toUpperCase()+' enviado com sucesso!');
    } catch (err) {
      setDoc(tipo, { uploading: false });
      Alert.alert('Erro', 'Falha ao enviar o '+tipo.toUpperCase()+'. Tente novamente.');
    }
  }

  function renderDoc(tipo: DocType, label: string) {
    const doc = getDoc(tipo);
    return (
      <View style={styles.card} key={tipo}>
        <Text style={styles.label}>{label}</Text>
        {doc.uri ? (
          <>
            <Image source={{ uri: doc.uri }} style={styles.preview} />
            {doc.uploadedUrl ? (
              <Text style={styles.successText}>Enviado com sucesso</Text>
            ) : (
              <TouchableOpacity style={styles.uploadBtn} onPress={() => fazerUpload(tipo)} disabled={doc.uploading}>
                {doc.uploading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>Enviar {label}</Text>}
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.changeBtn} onPress={() => selecionarImagem(tipo)}>
              <Text style={styles.changeBtnText}>Trocar imagem</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={styles.selectBtn} onPress={() => selecionarImagem(tipo)}>
            <Text style={styles.btnText}>Selecionar {label}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Upload de Documentos</Text>
      {renderDoc('rg', 'RG')}
      {renderDoc('cpf', 'CPF')}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, gap: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 8 },
  card: { backgroundColor: '#f5f5f5', borderRadius: 12, padding: 16, gap: 12 },
  label: { fontSize: 16, fontWeight: '600' },
  preview: { width: '100%', height: 200, borderRadius: 8, resizeMode: 'cover' },
  selectBtn: { backgroundColor: '#2563eb', borderRadius: 8, padding: 14, alignItems: 'center' },
  uploadBtn: { backgroundColor: '#16a34a', borderRadius: 8, padding: 14, alignItems: 'center' },
  changeBtn: { alignItems: 'center', padding: 8 },
  btnText: { color: '#fff', fontWeight: '600', fontSize: 15 },
  changeBtnText: { color: '#2563eb', fontSize: 14 },
  successText: { color: '#16a34a', fontWeight: '600', fontSize: 15, textAlign: 'center' },
});
