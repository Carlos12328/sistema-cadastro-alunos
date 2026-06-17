import {
  View,
  Text,
  Button,
} from 'react-native';

import {
  useAuth,
} from '../context/AuthContext';

import {
  logout,
} from '../services/authService';

export default function HomeScreen({
  navigation,
}: any) {

  const {
    role,
  } = useAuth();

  async function
  handleLogout() {

    await logout();
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent:
          'center',
        alignItems:
          'center',
        padding: 20,
        gap: 10,
      }}
    >

      <Text>
        Perfil: {role}
      </Text>

      {role ===
        'aluno' && (
        <Button
          title=
            "Enviar documentos"
          onPress={() =>
            navigation.navigate(
              'UploadDocuments'
            )
          }
        />
      )}

      {role ===
        'atendente' && (
        <Button
          title=
            "Listar alunos"
          onPress={() =>
            navigation.navigate(
              'StudentList'
            )
          }
        />
      )}

      <Button
        title="Sair"
        onPress={
          handleLogout
        }
      />

    </View>
  );
}
