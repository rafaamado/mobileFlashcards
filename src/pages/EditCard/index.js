import React, { useState, useEffect } from 'react';
import {View , Text, TextInput, TouchableOpacity, Alert, Platform, ToastAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconIo from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import CardDao from '../../dao/CardDao';
import EditCardOptions from '../../components/EditCardOptions';

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
        if(!card.front || !card.back){
            alert('Card cannot be empty');
            return;
        }   

        await cardDao.updateCard(card);

        if(Platform.OS === "android")
            ToastAndroid.show("Card Updated", ToastAndroid.SHORT);
        else
            alert("Card Updated");
    }

    async function deleteCard(){
        Alert.alert("Delete card","Are you sure? This can't be undone.",
            [{text: "Cancel", onPress: ()=> {}},
            {text: "Delete", onPress: async ()=> {
                await cardDao.delete(cardId);
                navigation.navigate("Cards");
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
                    multiline={true}
                    value={card.front}
                />
            <EditCardOptions onAddLinePress={()=> setCard({...card, front : card.front + "\n"})}/>
            
            <Text style={styles.label}>Back</Text>
            <TextInput
                    style={styles.input}
                    ref={input => { backInput = input }}
                    placeholder="Back"
                    onChangeText={text => setCard({...card, back : text})}
                    multiline={true}
                    value={card.back}
                />
            <EditCardOptions onAddLinePress={()=> setCard({...card, back : card.back + "\n"})}/>
            
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