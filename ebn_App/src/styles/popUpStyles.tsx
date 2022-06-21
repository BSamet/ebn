import {StyleSheet} from 'react-native';

const popUpStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        width: '75%',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonContainer: {
        display: "flex",
        flexDirection: "row",
    },
    button: {
        borderRadius: 20,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        elevation: 2,
        marginLeft: 7,
        marginRight: 7,
    },
    buttonClose: {
        backgroundColor: '#ff0000',
        marginTop: 10,
    },
    buttonSave: {
        backgroundColor: '#8AC997',
        marginTop: 10,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },

    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        color: 'black'
    },
    modalTitre: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
        color: 'black',
    },
    modalError: {
        fontSize: 13,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#ff0000',
    },
    input: {
        width: 175,
        marginBottom: 15,
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
        color: '#000000'
    },
    pickerSelection: {
        height: 50,
        width: 250,
        justifyContent: "center",
        backgroundColor: '#f1f1f1',
        color: "black"
    }
});

export default popUpStyles;
