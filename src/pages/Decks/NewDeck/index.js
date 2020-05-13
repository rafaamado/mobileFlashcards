import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import DeckDao from '../../../dao/DeckDao';

export default class NewDeck extends React.Component {

    state = {
        name: '',
        description: '' 
    }

    handleCreate = async () => {
        const {name, description} = this.state;

        if(!name) return;

        new DeckDao().createDeck({name, description});

        this.props.navigation.navigate('MyDecks', {onGoBack : () => this.loadDecks()});
    }
    
    render(){
        return (
            <View>

                <TextInput
                    placeholder="Deck Name"
                    onChangeText={text => this.setState({name : text})}
                />
                <TextInput
                    placeholder="Description"
                    onChangeText={text => this.setState({description : text})}
                />
                <TouchableOpacity onPress={this.handleCreate}>
                    <Text>Create</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                    <Text>Cancel</Text>
                </TouchableOpacity>
                    
            </View>
        );
    }
}