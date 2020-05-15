import React from 'react';
import {View, Text, Button, TouchableOpacity} from 'react-native';
import CardDao from '../../dao/CardDao';

export default class LearnDeck extends React.Component {

    state = {
        cards : [],
        idxCurCard: 0,
        showAnswer: false
    }

    componentDidMount(){
        this.loadCards();
    }

    loadCards = async () => {
        const {deckId} = this.props.route.params;
        const cards = await new CardDao().getCardsToStudy(deckId);
        this.setState({cards});

        this.selectRamdomCard();
    }

    selectRamdomCard = () => {
        const randomCard = Math.floor(Math.random() * this.state.cards.length);
        this.setState({idxCurCard: randomCard});
    }

    handleShowAnwser = () => {
        this.setState({showAnswer : true});
    }

    render(){
        const {cards, idxCurCard}  = this.state;
        const card = cards[idxCurCard];

        return (
            <View>
                <Text>Learn Deck</Text>
                {cards.length > 0 ? this.renderCard(card) : null}
            </View>
        );
    }

    renderCard(card){
        return (
            <View>
                <Text>{card.front}</Text>

                <View style={{display: this.state.showAnswer ? 'flex' : 'none'}}>
                    <Text>{card.back}</Text>
                    <Button title="Wrong" onPress={() => {}} />
                    <Button title="Hard" onPress={() => {}} />
                    <Button title="Good" onPress={() => {}} />
                    <Button title="Easy" onPress={() => {}} />
                </View>

                <TouchableOpacity  style={{display: this.state.showAnswer ? 'none' : 'flex'}}
                    onPress={this.handleShowAnwser}>
                        <Text>Show Answer</Text>
                </TouchableOpacity>              

            </View>
        );
    }

}

