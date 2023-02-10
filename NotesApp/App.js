import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NotesContextProvider from './Components/NotesContext';
import Categories from './Screens/Categories';
import CategoryScreen from './Screens/CategoryScreen';

const Stack = createNativeStackNavigator();



export default function App() {
  return (
    <NotesContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Categories" component={Categories} />
          <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NotesContextProvider>
  );
}

