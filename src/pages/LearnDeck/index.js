import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

import CardDao from '../../dao/CardDao';
import LearnProgress from '../../constants/LearnProgress';
import styles from './styles';
import AnswerBtn from '../../components/AnswerButton';

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

    saveCardProgress = async (days, isWrong=false) => {
        const {cards, idxCurCard}  = this.state;
        let card = cards[idxCurCard];

        isWrong ? card.countReviews = 1 : card.countReviews++;

        let nextReview = new Date();
        nextReview.setDate(nextReview.getDate() + (days * card.countReviews));

        card.lastReview = new Date().toISOString();
        card.nextReview = nextReview.toISOString();

        await new CardDao().updateCard(card);

        let update = [...cards];
        update[idxCurCard] = card;
        this.setState({cards: update})
    }

    handleWrong = async () => {
        await this.saveCardProgress(LearnProgress.WRONG, true);
        this.nextCard(false);
    }

    handleHard = async () => {
        await this.saveCardProgress(LearnProgress.HARD);
        this.nextCard();
    }
    handleGood = async() =>{
        await this.saveCardProgress(LearnProgress.GOOD);
        this.nextCard();
    }
    handleEasy = async () => {
        await this.saveCardProgress(LearnProgress.EASY);
        this.nextCard();
    }

    render(){
        const {cards, idxCurCard}  = this.state;
        const card = cards[idxCurCard];

        return (
            <View style={styles.container}>
                {cards.length > 0 ? this.renderCard(card) : this.renderFininished()}
            </View>
        );
    }

    renderCard(card){
        return (
            <>
                <View style={styles.frontContainer}>
                    {card.frontImage ? (<Image style={styles.images} source={{uri:card.frontImage}}/>) : null }
                    {this.displayCardText(card.front)}
                </View>
                <View style={styles.backContainer}>         
                    {this.state.showAnswer ? (
                        <>
                            {card.backImage ? (<Image style={styles.images} source={{uri:card.backImage}}/>) : null }
                            {this.displayCardText(card.back)}
                        </>
                    ) 
                        : null
                    }
                </View>
                <View style={styles.answerContainer}>
                    {this.state.showAnswer ?  
                        <View style={styles.answerButtons}>
                            <AnswerBtn text="Wrong" btnType="wrong" onPress={this.handleWrong}/>
                            <AnswerBtn text="Hard" btnType="hard" onPress={this.handleHard}/>
                            <AnswerBtn text="Good" btnType="good" onPress={this.handleGood}/>                            
                            <AnswerBtn text="Easy" btnType="easy" onPress={this.handleEasy}/>                            
                        </View>
                    :
                        <TouchableOpacity onPress={this.handleShowAnwser} style={styles.showAnswerBtn}>
                            <Text style={styles.showAnswerText}>Show Answer</Text>
                        </TouchableOpacity>
                    }
                </View>
            </>
        );
    }

    displayCardText(text){
        return text.split("\n").map((item, index) => {
            const style = index === 0 ? styles.mainText : null;
            return (<Text key={index} style={style}>{item}</Text>);
        });
    }

    renderFininished(){
        return (
        <>
            <Text style={{fontSize: 18, marginBottom: 10}}>No cards to be studied in this deck.</Text>  
            <Text style={{fontSize: 18}}> Come back another day.</Text> 
        </> 
        );
    }

}

