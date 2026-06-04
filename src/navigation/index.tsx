import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import { useAuth } from '../context/AuthContext';

const Stack = createNativeStackNavigator();

export default function Routes() {

  const { user, loading } = useAuth();

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