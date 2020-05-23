import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const EditCardOptions = (props) => {
    const {onAddLinePress} = props;

    return (
        <View style={styles.buttons}>
            <Icon style={styles.icons} name="image-search-outline" onPress={()=>{alert('Image')}} size={25}/>
            <Icon name="expand-all-outline" onPress={onAddLinePress} size={25}/>
        </View>
    );
};

const styles = StyleSheet.create({
    buttons:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingRight: 10
    },
    icons:{
        marginHorizontal: 10
    }
});

export default EditCardOptions;