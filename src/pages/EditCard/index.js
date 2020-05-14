import React, { useState, useEffect } from 'react';
import {View , Text, TextInput, TouchableOpacity} from 'react-native';

import CardDao from '../../dao/CardDao';

const EditCard = ({route, navigation}) => {
    let {cardId} = route.params;
    const cardDao = new CardDao();

    const [card, setCard] = useState({});

    useEffect(() => {
        async function loadCard(){
            const response = await cardDao.getCard(cardId);
            setCard(response);
        }
        loadCard();
    }, [] );

    let frontInput = React.createRef();
    let backInput = React.createRef();

    async function handleUpdate(){
        await cardDao.updateCard(card);
        alert('Card Updated');
    }

    return (
        <View>
            <Text>Front</Text>
            <TextInput
                    ref={input => { frontInput = input }}
                    placeholder="Front"
                    onChangeText={text => setCard({...card, front : text})}
                    defaultValue={card.front}
                />
            <Text>Back</Text>
            <TextInput
                    ref={input => { backInput = input }}
                    placeholder="Back"
                    onChangeText={text => setCard({...card, back : text})}
                    defaultValue={card.back}
                />
            
            <TouchableOpacity onPress={handleUpdate}>
                <Text>Update</Text>
            </TouchableOpacity>

            
            <TouchableOpacity onPress={() => navigation.goBack()}> 
                <Text>Cancel</Text>
            </TouchableOpacity>
            
        </View>
    );
}

export default EditCard;