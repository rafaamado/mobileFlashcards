import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    newDeckBtn: {
        position: 'absolute',
        bottom: '5%',
        right: '5%',
        shadowOffset:{  width: 50,  height: 50,  },
        shadowColor: 'black',
        shadowOpacity: 1.0,
        elevation: 5,
    },
    deckItem: {
        flex: 1,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
        marginBottom: 5,
        borderWidth: 0,
        borderRadius: 5,
        elevation: 1,
    },
    deckName: {
        fontWeight: 'bold',
        fontSize: 18
    },
    deckDesc:{
        color: '#888'
    },
    deckActions:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '30%',
    }
});