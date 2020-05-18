import { StyleSheet } from 'react-native';
import Theme from '../../constants/Theme';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 20 
    },
    label: {
        fontSize: 16,
    },
    input: {
        borderBottomWidth: 1.5,
        borderBottomColor: '#96b9e0',
        marginBottom: '15%'
    },
    btnContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Theme.secondary,
        height: '15%',
        paddingVertical: '7%',
        paddingHorizontal: '6%',
        borderRadius: 5,
        maxWidth: '40%'
    },
    buttonTxt: {
        color: '#fff',
        fontSize: 18,
    },
});