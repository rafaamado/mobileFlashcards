import React, { useState, useEffect } from 'react';
import {View , Text, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconIo from 'react-native-vector-icons/Ionicons';

import styles from './styles';
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
        <View style={styles.container}>
            <Text style={styles.label}>Front</Text>
            <TextInput
                    style={styles.input}
                    ref={input => { frontInput = input }}
                    placeholder="Front"
                    onChangeText={text => setCard({...card, front : text})}
                    defaultValue={card.front}
                />
            <Text style={styles.label}>Back</Text>
            <TextInput
                    style={styles.input}
                    ref={input => { backInput = input }}
                    placeholder="Back"
                    onChangeText={text => setCard({...card, back : text})}
                    defaultValue={card.back}
                />
            
            <View style={styles.btnContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}> 
                    <Text style={styles.buttonTxt}>Cancel</Text>
                    <Icon name='cancel' size={18} color="#fff"/>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleUpdate} style={styles.button}>
                    <Text style={styles.buttonTxt}>Save</Text>
                    <IconIo name='md-checkmark-circle' size={19} color="#fff"/>
                </TouchableOpacity>
            </View>
            
        </View>
    );
}

export default EditCard;