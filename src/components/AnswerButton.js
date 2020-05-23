import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Theme from '../constants/Theme';

const AnswerButton = (props) => {
    const { text, btnType } = props;
    
    return (
        <TouchableOpacity
            {...props}
            style={[styles.btn, {backgroundColor: Theme[btnType] }, props.style]} 
            >
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    btn: {
        borderRadius: 5,
        width: '22%',
        alignItems: 'center',
        paddingVertical: 10,
    },
    text:{
        color: '#fff',
        fontSize: 18
    }
});

export default AnswerButton;