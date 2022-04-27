import React from 'react';
import {SafeAreaView} from 'react-native';
import {} from 'react-native/Libraries/NewAppScreen';
import QrCodeScanner from '../../components/qrCodeScanner/QrCodeScanner';

const QrCodeScan = () => {
  return (
    <SafeAreaView>
      <QrCodeScanner />
    </SafeAreaView>
  );
};

export default QrCodeScan;
