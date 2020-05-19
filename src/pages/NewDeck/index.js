import React from 'react';
import {View, TouchableOpacity, TextInput, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconIo from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import DeckDao from '../../dao/DeckDao';

export default class NewDeck extends React.Component {

    state = {
        name: '',
        description: '' 
    }

    handleCreate = async () => {
        const {name, description} = this.state;

        if(!name) return;

        await new DeckDao().createDeck({name, description});

        this.props.navigation.goBack();
    }
    
    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.label}>Deck name:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="My deck"
                    onChangeText={text => this.setState({name : text})}
                />
                <Text style={styles.label}>Deck description:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="English Classes"
                    onChangeText={text => this.setState({description : text})}
                />

                <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.button}
                        onPress={() => this.props.navigation.goBack()}
                            >
                        <Text style={styles.buttonTxt}>Cancel</Text>
                        <Icon name='cancel' size={18} color="#fff"/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={this.handleCreate}>
                        <Text style={styles.buttonTxt}>Create</Text>
                        <IconIo name='md-add-circle-outline' size={19} color="#fff"/>
                    </TouchableOpacity>
                </View>
                    
            </View>
        );
    }
}