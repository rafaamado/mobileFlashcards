import React from 'react';
import {View, Text, Button, FlatList, TouchableOpacity, Alert} from 'react-native';
import DeckDao from '../../../dao/DeckDao';

export default class MyDecks extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            decks: []
        };
    }

    componentDidMount(){        
        this.loadDecks();
    }

    loadDecks = async () => {
        const decks = await new DeckDao().getAllDecks();   
        this.setState({decks});
    }

    deleteDeck = async (deck) => {
        Alert.alert( 
            'Delete Deck', 
            'Are you sure you want to delete this deck ? All the cards in this deck will be deleted.',
            [
              { text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
              { 
                  text: 'OK', 
                  onPress: async () => {                
                    await new DeckDao().deleteDeck(deck.id);
                    this.loadDecks(); 
                    } 
              }
            ],
            { cancelable: true }
          );

    }
    
    render(){
        return (
            <View>               
                <FlatList
                    data={this.state.decks}
                    keyExtractor={deck => String(deck.id)}
                    renderItem={this.renderDeck} />
                <Button
                    title="New Deck"
                    onPress={() => this.props.navigation.navigate('NewDeck')}/>
            </View>
        );
    }

    renderDeck = ({item}) => (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('LearnDeck', {deckId: item.id})}>
                <Text>{item.name} - {item.description}</Text>
                <Button 
                    title="New Card"
                    onPress={()=> this.props.navigation.navigate('NewCard', {deckId : item.id})}
                    />
                <Button 
                    title="Delete"
                    onPress={()=> this.deleteDeck(item)}
                    />
            </TouchableOpacity> 
        )
}