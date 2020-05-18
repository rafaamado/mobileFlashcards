import React, { useState } from 'react';
import {View , Text, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconIo from 'react-native-vector-icons/Ionicons';

import Card from '../../model/Card';
import CardDao from '../../dao/CardDao';
import styles from './styles';

const NewCard = ({route, navigation}) => {
    const [front, setFront] = useState('');
    const [back, setBack] = useState('');
    const {deckId} = route.params;
    let card = new Card();
    card.deckId = deckId;

    let frontTxtIn = React.createRef();
    let backTxtIn = React.createRef();

    async function handleCreate(){
        if(!front || !back) 
            return ;

        card.front = front;
        card.back = back;

        await new CardDao().createCard(card);

        frontTxtIn.clear();
        backTxtIn.clear();
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Front</Text>
            <TextInput
                    style={styles.input}
                    ref={input => { frontTxtIn = input }}
                    placeholder="Front"
                    onChangeText={text => setFront(text)}
                    
                />
            <Text style={styles.label}>Back</Text>
            <TextInput
                    style={styles.input}
                    ref={input => { backTxtIn = input }}
                    placeholder="Back"
                    onChangeText={text => setBack(text)}
                />
            
            <View style={styles.btnContainer}>            
                <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}> 
                    <Text style={styles.buttonTxt}>Cancel</Text>
                    <Icon name='cancel' size={18} color="#fff"/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleCreate}>
                    <Text style={styles.buttonTxt}>Create</Text>
                    <IconIo name='md-add-circle-outline' size={19} color="#fff"/>
                </TouchableOpacity>  
            </View>
        </View>
    );
}

export default NewCard;