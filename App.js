import navigation from './navigation';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group screenOptions={{headerShown: false}}>
          {navigation.map(({id, name, component}) => (
            <Stack.Screen key={id} name={name} component={component} />
          ))}
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
