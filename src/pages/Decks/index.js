import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MyDecks from './MyDecks';
import NewDeck from './NewDeck';
import NewCard from '../NewCard';
import EditCard from '../EditCard';
import LearnDeck from '../LearnDeck';

const AppStack = createStackNavigator();

export default function Decks (){
    return (
        <AppStack.Navigator>
            <AppStack.Screen name="MyDecks" component={MyDecks}/>
            <AppStack.Screen name="NewDeck" component={NewDeck}/>
            <AppStack.Screen name="NewCard" component={NewCard}/>
            <AppStack.Screen name="EditCard" component={EditCard}/>
            <AppStack.Screen name="LearnDeck" component={LearnDeck}/>
        </AppStack.Navigator>
    )
}