import React from 'react';
import {View, Text, FlatList, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './styles';

import CardDao from '../../dao/CardDao';

export default class Cards extends React.Component {

    state = {
        cards : [],
    }

    componentDidMount(){
        this.props.navigation.addListener('focus', this.loadCards);
    }

    componentWillUnmount() {
        this.props.navigation.removeListener('focus', this.loadCards);
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
        this.props.navigation.navigate('Decks', 
            { screen : 'EditCard',  params : {cardId: card.id} } );
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.searchSection}>
                    <TextInput
                        style={styles.searchBar} 
                        placeholder="Search..."
                        onChangeText={text => this.filterCards(text)}
                        />
                    <Icon name="md-search" color="#bbb" size={30} />
                </View>
                <FlatList 
                    style={styles.list}
                    data={this.state.cards}
                    keyExtractor={card => String(card.id)}
                    renderItem={this.renderCard}
                    />
            </View>
        );
    }

    renderCard = ({item}) => {
        return(
            <TouchableOpacity onPress={() => this.navigateToEditCard(item)} style={styles.listItem}> 
                <Text style={styles.deckCol}>{item.name}</Text>
                <View style={styles.cardCol}>
                    <Text style={styles.frontTxt}>{item.front}</Text>
                    <Text>{item.back}</Text>
                </View>

            </TouchableOpacity>
        )
    }
}