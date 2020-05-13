import React from 'react';
import {View, Text, Button, FlatList, TouchableOpacity} from 'react-native';
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
        await new DeckDao().deleteDeck(deck.id);
        this.loadDecks(); 
    }
    
    render(){
        return (
            <View>               
                <FlatList
                    data={this.state.decks}
                    keyExtractor={deck => String(deck.id)}
                    renderItem={this.renderDeck} />
                <Button
                    title="Go to Details"
                    onPress={() => this.props.navigation.navigate('NewDeck')}/>
            </View>
        );
    }

    renderDeck = ({item}) => (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('NewCard', {deckId : item.id})}>
                <Text>{item.name} - {item.description}</Text>
                <Button 
                    title="Delete"
                    onPress={()=> this.deleteDeck(item)}
                    />
            </TouchableOpacity> 
        )
}