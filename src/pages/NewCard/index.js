import React, { useState } from 'react';
import {View , Text, TextInput, TouchableOpacity} from 'react-native';
import Card from '../../model/Card';

import CardDao from '../../dao/CardDao';

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
        <View>
            <Text>Front</Text>
            <TextInput
                    ref={input => { frontTxtIn = input }}
                    placeholder="Front"
                    onChangeText={text => setFront(text)}
                    
                />
            <Text>Back</Text>
            <TextInput
                    ref={input => { backTxtIn = input }}
                    placeholder="Back"
                    onChangeText={text => setBack(text)}
                />
            
            <TouchableOpacity onPress={handleCreate}>
                <Text>Create</Text>
            </TouchableOpacity>

            
            <TouchableOpacity onPress={() => navigation.goBack()}> 
                <Text>Cancel</Text>
            </TouchableOpacity>
            
        </View>
    );
}

export default NewCard;