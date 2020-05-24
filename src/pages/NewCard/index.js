import React, { useState } from 'react';
import {View , Text, TextInput, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconIo from 'react-native-vector-icons/Ionicons';

import Card from '../../model/Card';
import CardDao from '../../dao/CardDao';
import styles from './styles';
import EditCardOptions from '../../components/EditCardOptions';

const NewCard = ({route, navigation}) => {
    const [front, setFront] = useState('');
    const [back, setBack] = useState('');
    const [frontImg, setFrontImg] = useState(null);
    const [backImg, setBackImg] = useState(null);
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
        card.frontImage = frontImg;
        card.backImage = backImg; 

        await new CardDao().createCard(card);

        frontTxtIn.clear();
        backTxtIn.clear();
        setFrontImg(null);
        setBackImg(null);
    }

    return (
        <View style={styles.container}>       
            <Text style={styles.label}>Front</Text>
            {frontImg != null ? (<Image style={styles.images} source={{uri:frontImg}}/>) : null }
            <TextInput
                style={styles.input}
                ref={input => { frontTxtIn = input }}
                placeholder="Front"
                onChangeText={text => setFront(text)}
                multiline={true}
                value={front}            
                    />
            <EditCardOptions 
                onAddLinePress={()=> setFront(front + "\n")} 
                onImageSelection={(image)=> setFrontImg(image.webformatURL)}/>
            
            <Text style={styles.label}>Back</Text>
            {backImg != null ? (<Image style={styles.images} source={{uri:backImg}}/>) : null }
            <TextInput
                style={styles.input}
                ref={input => { backTxtIn = input }}
                placeholder="Back"
                onChangeText={text => setBack(text)}
                multiline={true}
                value={back}
                    />
            <EditCardOptions 
                onAddLinePress={()=> setBack(back + "\n")} 
                onImageSelection={(image)=> setBackImg(image.webformatURL)}/>
            
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