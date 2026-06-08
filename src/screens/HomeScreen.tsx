import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {

  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Usuário autenticado</Text>

      <Button
        title="Ver alunos cadastrados"
        onPress={() => navigation.navigate('StudentList' as never)}
      />
    </View>
  );
}