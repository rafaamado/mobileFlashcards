import React, { useState } from 'react';
import {View , Text, TextInput, TouchableOpacity} from 'react-native';

import CardDao from '../../dao/CardDao';

const EditCard = ({route, navigation}) => {
    let {card} = route.params;
    //card={ front : card.front, back : card.back};

    const [front, setFront] = useState(card.front);
    const [back, setBack] = useState(card.back);

    let frontInput = React.createRef();
    let backInput = React.createRef();

    async function handleUpdate(){
        card.front = front;
        card.back = back;
        (await CardDao.build()).updateCard(card);
    }

    return (
        <View>
            <Text>Front</Text>
            <TextInput
                    ref={input => { frontInput = input }}
                    placeholder="Front"
                    onChangeText={text => setFront(text)}
                    defaultValue={front}
                />
            <Text>Back</Text>
            <TextInput
                    ref={input => { backInput = input }}
                    placeholder="Back"
                    onChangeText={text => setBack(text)}
                    defaultValue={back}
                />
            
            <TouchableOpacity onPress={handleUpdate}>
                <Text>Create</Text>
            </TouchableOpacity>

            
            <TouchableOpacity onPress={() => navigation.goBack()}> 
                <Text>Cancel</Text>
            </TouchableOpacity>
            
        </View>
    );
}

export default EditCard;