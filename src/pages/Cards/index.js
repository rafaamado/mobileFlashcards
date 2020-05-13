import React from 'react';
import {View, Text, FlatList, TextInput, TouchableOpacity} from 'react-native';
import CardDao from '../../dao/CardDao';

export default class Cards extends React.Component {

    state = {
        cards : [],
    }

    componentDidMount(){
        this.loadCards();
    }

    loadCards = async () => {
        const cards = await new CardDao().selectCardsAndDeck();
        this.setState({cards: cards});
    }

    filterCards = async (text) => {
        if(!text)
            await this.loadCards();

        const searchResult = await new CardDao().selectCardsAndDeck(text);
        this.setState({cards: searchResult});
    }

    navigateToEditCard = (card) => {
        this.props.navigation.navigate(
            'Decks', 
            {
                screen : 'EditCard', 
                params : {card: card}
            });
    }

    render() {
        return (
            <View>
                <Text>Cards Screen</Text>
                <TextInput 
                    placeholder="Search"
                    onChangeText={text => this.filterCards(text)}
                    />
                <FlatList 
                    data={this.state.cards}
                    keyExtractor={card => String(card.id)}
                    renderItem={this.renderCard}
                    />
            </View>
        );
    }

    renderCard = ({item}) => {
        return(
            <TouchableOpacity onPress={() => this.navigateToEditCard(item)}> 
                <Text>{item.name + ' / ' + item.front + ' / ' + item.back}</Text>
            </TouchableOpacity>
        )
    }
}