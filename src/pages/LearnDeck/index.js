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

    nextCard= (remove = true) => {
        const {cards, idxCurCard} = this.state;
        if (remove) 
            cards.splice(idxCurCard, 1);

        this.setState({showAnswer: false, cards});
        
        this.selectRamdomCard();
    }

    handleWrong = async () => {
        this.nextCard(false);
    }
    handleHard = async () => {
        this.nextCard();
    }
    handleGood = async() =>{

        this.nextCard();
    }
    handleEasy = async () => {
        this.nextCard();
    }

    render(){
        const {cards, idxCurCard}  = this.state;
        const card = cards[idxCurCard];

        return (
            <View>
                {cards.length > 0 ? this.renderCard(card) : this.renderFininished()}
            </View>
        );
    }

    renderCard(card){
        return (
            <View>
                <Text>{card.front}</Text>

                <View style={{display: this.state.showAnswer ? 'flex' : 'none'}}>
                    <Text>{card.back}</Text>
                    <Button title="Wrong" onPress={this.handleWrong} />
                    <Button title="Hard" onPress={this.handleHard} />
                    <Button title="Good" onPress={this.handleGood} />
                    <Button title="Easy" onPress={this.handleEasy} />
                </View>

                <TouchableOpacity  style={{display: this.state.showAnswer ? 'none' : 'flex'}}
                    onPress={this.handleShowAnwser}>
                        <Text>Show Answer</Text>
                </TouchableOpacity>              

            </View>
        );
    }

    renderFininished(){
        return (
            <Text>No cards to be studied in this deck</Text>  
        );
    }

}

