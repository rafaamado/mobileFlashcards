import React from 'react';
import {View, Text, Button, TouchableOpacity} from 'react-native';

import CardDao from '../../dao/CardDao';
import LearnProgress from '../../constants/LearnProgress';

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

        const idxCurCard = this.generateRamdomNum(cards.length);
        this.setState({cards, idxCurCard});
    }

    generateRamdomNum = (max) => {
        return Math.floor(Math.random() * max);
    }

    handleShowAnwser = () => {
        this.setState({showAnswer : true});
    }

    nextCard= (remove = true) => {
        const {cards, idxCurCard} = this.state;
        let updateCards = [...cards];
        let idx = idxCurCard;

        if (remove)
            updateCards.splice(idxCurCard, 1);

        idx = this.generateRamdomNum(updateCards.length);
        this.setState({showAnswer: false, cards: updateCards, idxCurCard : idx});
    }

    updateCurrentCardProgress = async (days, isWrong=false) => {
        const {cards, idxCurCard}  = this.state;
        let card = cards[idxCurCard];

        let nextReview = new Date();
        nextReview.setDate(nextReview.getDate() + days);

        isWrong ? card.reviewCount = 0 : card.reviewCount++;
        card.lastReview = new Date().toISOString();
        card.nextReview = nextReview.toISOString();

        await new CardDao().updateCard(card);

        let update = [...cards];
        update[idxCurCard] = card;
        this.setState({cards: update})
    }

    handleWrong = async () => {
        await this.updateCurrentCardProgress(LearnProgress.WRONG, true);
        this.nextCard(false);
    }

    handleHard = async () => {
        await this.updateCurrentCardProgress(LearnProgress.HARD);
        this.nextCard();
    }
    handleGood = async() =>{
        await this.updateCurrentCardProgress(LearnProgress.GOOD);
        this.nextCard();
    }
    handleEasy = async () => {
        await this.updateCurrentCardProgress(LearnProgress.EASY);
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

