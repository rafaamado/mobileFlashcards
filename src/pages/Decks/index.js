import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Theme from '../../constants/Theme';
import MyDecks from './MyDecks';
import NewDeck from './NewDeck';
import NewCard from '../NewCard';
import EditCard from '../EditCard';
import LearnDeck from '../LearnDeck';

const AppStack = createStackNavigator();

const headerOptions = ({ navigation, route }) => ({
    headerStyle: {backgroundColor: Theme.primary}, 
    headerTintColor: '#fff'
});

export default function Decks (){
    return (
        <AppStack.Navigator screenOptions={headerOptions}>
            <AppStack.Screen name="MyDecks" component={MyDecks} options={{title: "My Decks"}}/>
            <AppStack.Screen name="NewDeck" component={NewDeck} options={{title: "New Deck"}}/>
            <AppStack.Screen name="NewCard" component={NewCard} options={{title: "New Card"}}/>
            <AppStack.Screen name="EditCard" component={EditCard} options={{title: "Edit Card"}}/>
            <AppStack.Screen name="LearnDeck" component={LearnDeck} options={{title: "Learn Deck"}}/>
        </AppStack.Navigator>
    )
}