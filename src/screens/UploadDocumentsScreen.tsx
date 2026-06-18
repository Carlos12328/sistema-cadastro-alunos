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

import {
  Student,
} from '../types/student';

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
    student,
    setStudent,
  ] = useState<Student | null>(
    null
  );

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

  const hasCertificate =
    certificateUri.trim().length > 0;

  const status =
    student?.status ||
    'Não informado';

  const documentStatus =
    !hasCertificate &&
    student?.status === 'Rejeitado'
      ? 'Aguardando reenvio'
      : status;

  const isApprovedStatus =
    student?.status === 'Aprovado' ||
    student?.status === 'Entregue';

  const canSendCertificate =
    !!student &&
    !hasCertificate &&
    !isApprovedStatus;

  function
  getBlockedMessage() {

    if (!student) {
      return 'Cadastro do aluno não encontrado.';
    }

    if (isApprovedStatus) {
      return 'Seu certificado já foi aprovado. Não é necessário enviar novamente.';
    }

    return 'No momento não é possível enviar o certificado.';
  }

  function
  getStatusMessage() {

    if (
      status === 'Aprovado' ||
      status === 'Entregue'
    ) {
      return 'Seu certificado foi aprovado.';
    }

    if (
      status === 'Rejeitado'
    ) {

      if (hasCertificate) {
        return 'Seu certificado foi rejeitado, mas ainda existe uma URI vinculada. Aguarde o atendente remover a URI para enviar novamente.';
      }

      return 'Seu certificado foi rejeitado. Você pode enviar um novo certificado.';
    }

    if (
      status === 'Pendente'
    ) {

      if (hasCertificate) {
        return 'Seu certificado foi enviado e está aguardando análise.';
      }

      return 'Seu cadastro está pendente. Envie o certificado para análise.';
    }

    return 'Status não informado no cadastro.';
  }

  useEffect(() => {

    async function
    loadStudent() {

      try {

        if (!user) {
          return;
        }

        const foundStudent =
          await getStudentByUserId(
            user.uid
          );

        setStudent(
          foundStudent
        );

        setCertificateUri(
          foundStudent?.certificadoUrl ||
          ''
        );

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

    if (
      !canSendCertificate
    ) {
      Alert.alert(
        'Envio bloqueado',
        getBlockedMessage()
      );

      return;
    }

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

      setLoading(true);

      const currentStudent =
        await getStudentByUserId(
          user.uid
        );

      if (
        !currentStudent ||
        !currentStudent.id
      ) {
        Alert.alert(
          'Cadastro não encontrado',
          'Cadastre os dados do aluno antes de salvar o certificado.'
        );

        return;
      }

      setStudent(
        currentStudent
      );

      const currentCertificateUri =
        currentStudent.certificadoUrl || '';

      if (
        currentCertificateUri.trim()
      ) {
        setCertificateUri(
          currentCertificateUri
        );

    

        return;
      }

      if (
        currentStudent.status === 'Aprovado' ||
        currentStudent.status === 'Entregue'
      ) {
        Alert.alert(
          'Envio bloqueado',
          'Seu certificado já foi aprovado. Não é necessário enviar novamente.'
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

      const localUri =
        await saveCertificateLocally({
          userId: user.uid,
          uri: certificate.uri,
          fileName: certificate.fileName,
        });

      await updateStudentCertificateUrl(
        currentStudent.id,
        localUri
      );

      setCertificateUri(
        localUri
      );

      setStudent({
        ...currentStudent,
        certificadoUrl:
          localUri,
        status:
          'Pendente',
      });

      setCertificate(
        null
      );

      Alert.alert(
        'Sucesso',
        'Certificado enviado com sucesso.'
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

      <View
        style={{
          gap: 8,
          padding: 12,
          borderWidth: 1,
          borderRadius: 8,
        }}
      >
        <Text
          style={{
            fontWeight:
              'bold',
            textAlign:
              'center',
          }}
        >
          Status do documento
        </Text>

        <Text
          style={{
            textAlign:
              'center',
          }}
        >
          {documentStatus}
        </Text>

        <Text
          style={{
            textAlign:
              'center',
            fontSize: 13,
          }}
        >
          {getStatusMessage()}
        </Text>
      </View>

      {hasCertificate ? (
        <View
          style={{
            alignItems:
              'center',
            gap: 8,
          }}
        >
          <Text
            style={{
              fontWeight:
                'bold',
            }}
          >
            Imagem enviada
          </Text>

          <Image
            source={{
              uri: certificateUri,
            }}
            style={{
              width: 220,
              height: 220,
              borderRadius: 8,
            }}
            resizeMode="cover"
          />

          <Text
            style={{
              textAlign:
                'center',
              fontSize: 12,
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
            
          </Text>
        </View>
      ) : null}

      {!hasCertificate && certificate ? (
        <View
          style={{
            alignItems:
              'center',
            gap: 8,
          }}
        >
          <Text
            style={{
              fontWeight:
                'bold',
            }}
          >
            Certificado selecionado
          </Text>

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
        </View>
      ) : null}

      {!hasCertificate ? (
        <Text
          style={{
            textAlign:
              'center',
          }}
        >
          Selecione a imagem do certificado para salvar no dispositivo e vincular ao cadastro do aluno.
        </Text>
      ) : null}

      {!canSendCertificate ? (
        <Text
          style={{
            textAlign:
              'center',
            fontSize: 12,
          }}
        >
          {getBlockedMessage()}
        </Text>
      ) : null}

      <Button
        title="Selecionar certificado"
        onPress={
          handlePickCertificate
        }
        disabled={
          loading ||
          !canSendCertificate
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
          loading ||
          !canSendCertificate
        }
      />

      {loading && (
        <ActivityIndicator />
      )}
    </ScrollView>
  );
}


