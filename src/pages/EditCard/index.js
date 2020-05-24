import React, { useState, useEffect } from 'react';
import {View , Text, TextInput, TouchableOpacity, 
    Alert, Platform, ToastAndroid, Image} from 'react-native';
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
            console.log(response);
            setCard(response);
        }
        loadCard();
    }, [] );

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
            {card.frontImage ? (<Image style={styles.images} source={{uri:card.frontImage}}/>) : null }
            <TextInput
                    style={styles.input}
                    placeholder="Front"
                    onChangeText={text => setCard({...card, front : text})}
                    multiline={true}
                    value={card.front}
                />
            <EditCardOptions 
                onAddLinePress={()=> setCard({...card, front : card.front + "\n"})}
                onImageSelection={(image)=> setCard({...card, frontImage: image.webformatURL})}/>
            
            <Text style={styles.label}>Back</Text>
            {card.backImage ? (<Image style={styles.images} source={{uri:card.backImage}}/>) : null }
            <TextInput
                    style={styles.input}
                    placeholder="Back"
                    onChangeText={text => setCard({...card, back : text})}
                    multiline={true}
                    value={card.back}
                />
            <EditCardOptions 
                onAddLinePress={()=> setCard({...card, back : card.back + "\n"})}
                onImageSelection={(image)=> setCard({...card, backImage: image.webformatURL})}
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