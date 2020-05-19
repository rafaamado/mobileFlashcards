import React, { useState, useEffect } from 'react';
import {View , Text, TextInput, TouchableOpacity, Alert} from 'react-native';
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

    async function deleteCard(){
        Alert.alert("Delete card","Are you sure? This can't be undone.",
            [{text: "Cancel", onPress: ()=> {}},
            {text: "Delete", onPress: async ()=> {
                await cardDao.delete(cardId);
                navigation.navigate('Cards');
            }}
            ],
            {cancelable: true}
        );     
    }

    return (
        <View style={styles.container}>
            <View style={styles.deleteSection}>
                <TouchableOpacity onPress={deleteCard}>
                    <Icon name="delete" size={30} color="#c00"/>
                </TouchableOpacity>
            </View>
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