import {
  useEffect,
  useState,
} from 'react';

import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  ScrollView,
  Text,
  View,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';

import {
  useAuth,
} from '../context/AuthContext';

import {
  saveCertificateLocally,
} from '../services/storageService';

import {
  getStudentByUserId,
  updateStudentCertificateUrl,
} from '../services/studentService';

type SelectedCertificate = {
  uri: string;
  fileName?: string | null;
};

export default function
UploadDocumentsScreen() {

  const {
    user,
  } = useAuth();

  const [
    certificate,
    setCertificate,
  ] = useState<SelectedCertificate | null>(
    null
  );

  const [
    certificateUri,
    setCertificateUri,
  ] = useState('');

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    loadingStudent,
    setLoadingStudent,
  ] = useState(true);

  useEffect(() => {

    async function
    loadStudent() {

      try {

        if (!user) {
          return;
        }

        const student =
          await getStudentByUserId(
            user.uid
          );

        if (
          student?.certificadoUrl
        ) {
          setCertificateUri(
            student.certificadoUrl
          );
        }

      } catch {

        Alert.alert(
          'Erro',
          'Falha ao carregar dados do aluno'
        );

      } finally {

        setLoadingStudent(
          false
        );
      }
    }

    loadStudent();

  }, [user]);

  async function
  handlePickCertificate() {

    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (
      !permission.granted
    ) {
      Alert.alert(
        'Permissão necessária',
        'Autorize o acesso à galeria para selecionar o certificado.'
      );

      return;
    }

    const result =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: [
          'images',
        ],
        allowsEditing: false,
        quality: 1,
      });

    if (
      result.canceled
    ) {
      return;
    }

    const asset =
      result.assets[0];

    setCertificate({
      uri: asset.uri,
      fileName: asset.fileName,
    });
  }

  async function
  handleSaveCertificate() {

    try {

      if (!user) {
        Alert.alert(
          'Erro',
          'Usuário não autenticado'
        );

        return;
      }

      if (!certificate) {
        Alert.alert(
          'Erro',
          'Selecione o certificado antes de salvar'
        );

        return;
      }

      setLoading(true);

      const student =
        await getStudentByUserId(
          user.uid
        );

      if (
        !student ||
        !student.id
      ) {
        Alert.alert(
          'Cadastro não encontrado',
          'Cadastre os dados do aluno antes de salvar o certificado.'
        );

        return;
      }

      const localUri =
        await saveCertificateLocally({
          userId: user.uid,
          uri: certificate.uri,
          fileName: certificate.fileName,
        });

      await updateStudentCertificateUrl(
        student.id,
        localUri
      );

      setCertificateUri(
        localUri
      );

      Alert.alert(
        'Sucesso',
        'Certificado salvo localmente e vinculado ao cadastro do aluno.'
      );

    } catch (error) {

      console.error(
        'Erro ao salvar certificado:',
        error
      );

      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Erro desconhecido';

      Alert.alert(
        'Erro',
        'Falha ao salvar certificado: ' + errorMessage
      );

    } finally {

      setLoading(false);
    }
  }

  if (
    loadingStudent
  ) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent:
            'center',
          alignItems:
            'center',
        }}
      >
        <ActivityIndicator />
        <Text>
          Carregando dados...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent:
          'center',
        padding: 20,
        gap: 16,
      }}
    >
      <Text
        style={{
          fontSize: 22,
          fontWeight:
            'bold',
          textAlign:
            'center',
        }}
      >
        Certificado
      </Text>

      <Text
        style={{
          textAlign:
            'center',
        }}
      >
        Selecione a imagem do certificado para salvar no dispositivo e vincular ao cadastro do aluno.
      </Text>

      {certificate && (
        <View
          style={{
            alignItems:
              'center',
            gap: 8,
          }}
        >
          <Image
            source={{
              uri: certificate.uri,
            }}
            style={{
              width: 220,
              height: 220,
              borderRadius: 8,
            }}
            resizeMode="cover"
          />

          <Text>
            Certificado selecionado
          </Text>
        </View>
      )}

      {certificateUri ? (
        <View
          style={{
            gap: 8,
          }}
        >
          <Text
            style={{
              textAlign:
                'center',
              fontWeight:
                'bold',
            }}
          >
            Certificado já vinculado ao cadastro.
          </Text>

          <Text
            style={{
              textAlign:
                'center',
              fontSize: 12,
            }}
          >
            URI salva no Firestore.
          </Text>
        </View>
      ) : null}

      <Button
        title="Selecionar certificado"
        onPress={
          handlePickCertificate
        }
        disabled={
          loading
        }
      />

      <Button
        title={
          loading
            ? 'Salvando...'
            : 'Salvar certificado'
        }
        onPress={
          handleSaveCertificate
        }
        disabled={
          loading
        }
      />

      {loading && (
        <ActivityIndicator />
      )}
    </ScrollView>
  );
}
