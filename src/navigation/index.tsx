import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import UploadDocumentsScreen from '../screens/UploadDocumentsScreen';
import StudentListScreen from '../screens/StudentListScreen';
import StudentDetailsScreen from '../screens/StudentDetailsScreen';

import { useAuth } from '../context/AuthContext';

const Stack =
  createNativeStackNavigator();

export default function Routes() {

  const {
    user,
    loading,
  } = useAuth();

  if (loading) {
    return null;
  }

  return (
    <NavigationContainer>

      <Stack.Navigator>

        {user ? (
          <>

            <Stack.Screen
              name="Home"
              component={HomeScreen}
            />

            <Stack.Screen
              name="UploadDocuments"
              component={UploadDocumentsScreen}
              options={{
                title: 'Enviar Documentos',
              }}
            />

            <Stack.Screen
              name="StudentList"
              component={StudentListScreen}
              options={{
                title: 'Alunos',
              }}
            />

            <Stack.Screen
              name="StudentDetails"
              component={StudentDetailsScreen}
              options={{
                title: 'Detalhes do Aluno',
              }}
            />

          </>
        ) : (
          <>

            <Stack.Screen
              name="Login"
              component={LoginScreen}
            />

            <Stack.Screen
              name="Cadastro"
              component={RegisterScreen}
            />

          </>
        )}

      </Stack.Navigator>

    </NavigationContainer>
  );
}
