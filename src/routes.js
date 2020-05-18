import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import Theme from './constants/Theme';
import MyDecks from './pages/MyDecks';
import NewDeck from './pages/NewDeck';
import NewCard from './pages/NewCard';
import EditCard from './pages/EditCard';
import LearnDeck from './pages/LearnDeck';

import Cards from './pages/Cards';

const AppStack = createStackNavigator();

const headerOptions = ({ navigation, route }) => ({
    headerStyle: {backgroundColor: Theme.primary}, 
    headerTintColor: '#fff'
});

const Decks = function Decks (){
    return (
        <AppStack.Navigator screenOptions={headerOptions}>
            <AppStack.Screen name="MyDecks" component={MyDecks} options={{title: "My Decks"}}/>
            <AppStack.Screen name="NewDeck" component={NewDeck} options={{title: "New Deck"}}/>
            <AppStack.Screen name="NewCard" component={NewCard} options={{title: "New Card"}}/>
            <AppStack.Screen name="EditCard" component={EditCard} options={{title: "Edit Card"}}/>
            <AppStack.Screen name="LearnDeck" component={LearnDeck} options={{title: "Learn Deck"}}/>
        </AppStack.Navigator>
    )
};

const Drawer = createDrawerNavigator();

export default function Routes(){
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Decks">
                <Drawer.Screen name="Decks" component={Decks} />
                <Drawer.Screen name="Cards" component={Cards} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}