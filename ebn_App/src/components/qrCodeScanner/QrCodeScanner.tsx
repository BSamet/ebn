/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import React, {useState} from 'react';
import {
    Button,
    Modal,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import QRCodeScanner from 'react-native-qrcode-scanner';
import PopUp from '../popUp';

const QrCodeScanner = (props: any) => {

    let QRScanner: any
    const [scan, setScan] = useState(false);
    const [result, setResult] = useState();
    const [affichage, setaffichage] = useState(false);
    let datas = {
        res: result,
        clientId: props.data
    }
    let titleButton = props.titleButton;
    const onSuccess = (e: any) => {
        setResult(e.data);
        setScan(false);
        setaffichage(true);
    };

    const startScan = () => {
        setScan(true);
        setResult;
        setaffichage(true);
    };

    return (
        <>
            <StatusBar barStyle="dark-content"/>
            <SafeAreaView>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}>
                    <View style={styles.body}>
                        {result && (
                            <View style={styles.sectionContainer}>
                                <Text>{result}</Text>
                                <PopUp data={datas}/>
                            </View>
                        )}
                        {!scan && (
                            <Button
                                title={titleButton}
                                color="#8AC997"
                                onPress={startScan}
                            />
                        )}
                        {scan && (
                            <Modal>
                            <QRCodeScanner
                                reactivate={true}
                                showMarker={true}
                                ref={node => {
                                    QRScanner = node;
                                }}
                                onRead={onSuccess}
                                topContent={
                                    <Text style={styles.centerText}>Scannez votre QRCode!</Text>
                                }
                                bottomContent={
                                    <TouchableOpacity
                                        style={styles.buttonTouchable}
                                        onPress={() => setScan(false)}>
                                        <Text style={styles.buttonText}>Annuler Scan</Text>
                                    </TouchableOpacity>
                                }
                            />
                            </Modal>
                        )}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};
const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    body: {
        backgroundColor: Colors.white,
    },
    sectionContainer: {
        backgroundColor: '#8AC997',
        width: '65%',
        marginVertical: 10,
        alignItems: 'center',
        borderRadius: 5,
        borderColor: 'transparent',
        borderWidth: 1,
        padding: 9,
        marginLeft: 5,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark,
    },
    highlight: {
        fontWeight: '700',
    },
    footer: {
        color: Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777',
    },
    textBold: {
        fontWeight: '500',
        color: '#000',
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)',
    },
    buttonTouchable: {
        padding: 16,
    },
});

export default QrCodeScanner;
