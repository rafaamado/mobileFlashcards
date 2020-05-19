import React from 'react';
import {View, Text, FlatList, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconsIo from 'react-native-vector-icons/Ionicons';

import DeckDao from '../../dao/DeckDao';
import styles from './styles';
import Theme from '../../constants/Theme';

export default class MyDecks extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            decks: []
        };
    }

    componentDidMount(){     
        this.props.navigation.setOptions({
            headerLeft: props => <IconsIo name="ios-menu" style={{marginLeft: 10}} 
                                            size={30} color="#fff" 
                                            onPress={() => this.props.navigation.openDrawer()}/>
        });

        this.props.navigation.addListener('focus', this.loadDecks);
    }

    componentWillUnmount() {
        this.props.navigation.removeListener('focus', this.loadDecks);
    }

    loadDecks = async () => {
        const decks = await new DeckDao().getAllDecks();   
        this.setState({decks});
    }

    deleteDeck = async (deck) => {
        Alert.alert( 
            `Delete Deck ${deck.name}`, 
            'Are you sure ? All the cards in this deck will be deleted.',
            [
              { text: 'Cancel', onPress: () => {}},
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
            <View style={styles.container}>               
                <FlatList
                    data={this.state.decks}
                    keyExtractor={deck => String(deck.id)}
                    renderItem={this.renderDeck} />

                <Icon style={styles.newDeckBtn}
                    name="plus-circle" 
                    size={70} 
                    color={Theme.primary}
                    onPress={() => this.props.navigation.navigate('NewDeck')}/>
            </View>
        );
    }

    renderDeck = ({item}) => (

        <TouchableOpacity style={styles.deckItem}
            onPress={() => this.props.navigation.navigate('LearnDeck', {deckId: item.id})}>
            <View>
                <Text style={styles.deckName}>{item.name}</Text>
                <Text style={styles.deckDesc}>Total cards: 100</Text>
            </View>

            <View style={styles.deckActions}>
                <TouchableOpacity 
                    onPress={()=> this.props.navigation.navigate('NewCard', {deckId : item.id})}>
                    <IconsIo name="ios-add" size={50} color="#0a0"/>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> this.deleteDeck(item)}>
                    <IconsIo name="ios-trash" size={40} color="#b00"/>
                </TouchableOpacity>
            </View>
        </TouchableOpacity> 
        
        )
}