import React from 'react';
import {Easing} from 'react-native';
import {NavigationContainer, RouteProp} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import HomeScreen from './src/screens/Home';
import ShareScreen from './src/screens/Share';
import DetailScreen from './src/screens/Detail';

import {PokemonStatus} from './src/screens/Home';
const transitionSpec = {
  open: {
    animation: 'timing',
    config: {
      easing: Easing.bounce,
      duration: 400,
    },
  },
  close: {
    animation: 'timing',
    config: {
      duration: 200,
    },
  },
};
type MainStackParamList = {
  Home: undefined;
  Share: undefined;
};

type RootStackParamList = {
  Detail: {title: string; image: any; data: PokemonStatus[]};
  Main: MainStackParamList;
};

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Main'
>;

export type DetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Detail'
>;

export type DetailScreenNavigationRouteProp = RouteProp<
  RootStackParamList,
  'Detail'
>;

const RootStack = createStackNavigator<RootStackParamList>();
const MainStack = createStackNavigator<MainStackParamList>();

function Main() {
  return (
    <MainStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#B4A608',
        },
      }}>
      <MainStack.Screen
        name="Home"
        options={{title: ''}}
        component={HomeScreen}
      />
      <MainStack.Screen
        name="Share"
        component={ShareScreen}
        options={{transitionSpec: transitionSpec}}
      />
    </MainStack.Navigator>
  );
}
const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="Main"
        mode="modal"
        headerMode="none">
        <RootStack.Screen name="Main" component={Main} />
        <RootStack.Screen name="Detail" component={DetailScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
