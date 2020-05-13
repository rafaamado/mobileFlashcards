import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Decks from './pages/Decks';
import Cards from './pages/Cards';

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