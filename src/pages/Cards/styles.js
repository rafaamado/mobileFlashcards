import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        padding: 10,
        paddingTop: 20,
    },
    searchSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginBottom: '5%',
        backgroundColor: '#ddd',
        borderRadius: 10
    },
    searchBar: {
        width: '80%',
        textAlign: 'center',
        fontSize: 18,
    },
    list: {
        width: '100%',
    },
    listItem: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        padding: 2,
        borderBottomWidth: 0.3,
    },
    deckCol:{
        flex: 1,
        fontSize: 16
    },
    cardCol:{
        flex: 3,
    },
    frontTxt: {
        fontWeight: 'bold',
    }
});