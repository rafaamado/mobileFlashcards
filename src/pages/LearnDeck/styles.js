import {StyleSheet} from 'react-native';
import Theme from '../../constants/Theme';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: '1%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    mainText:{
        fontSize: 22,
        fontWeight: 'bold'
    },
    frontContainer:{
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    backContainer:{
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    answerContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    answerButtons: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    showAnswerBtn:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Theme.secondary,
        height: '10%',
        width: '100%',
        paddingVertical: '7%',
        paddingHorizontal: '6%',
        borderRadius: 5,
    },
    showAnswerText: {
        color: 'white',
        fontSize: 18,
    },
    images:{ 
        height: 100,
        width: 100,
    },
});