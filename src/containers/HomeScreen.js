import {Image, StyleSheet, View} from 'react-native';
import React from 'react';

// Local Imports
import CSafeAreaView from '../components/common/CSafeAreaView';
import CText from '../components/common/CText';
import images from '../assets/images';
import {deviceWidth, getHeight} from '../common/constants';
import {styles} from '../themes';
import CButton from '../components/common/CButton';
import strings from '../i18n/strings';
import {removeAsyncStorageData} from '../utils/helpers';
import {USER_NAME} from '../api/url';
import {StackNav} from '../navigation/NavigationKeys';

export default function HomeScreen({navigation}) {
  const onPressLogOut = async () => {
    await removeAsyncStorageData(USER_NAME);
    navigation.reset({
      routes: [{name: StackNav.SignIn}],
      index: 0,
    });
  };

  return (
    <CSafeAreaView>
      <Image source={images.logoImg} style={localStyles.appLogoStyle} />
      <View style={localStyles.rootContainer}>
        <CText type={'B26'} align={'center'}>
          {`Welcome ${global.userName}`}
        </CText>
        <CButton title={strings.logOut} onPress={onPressLogOut} />
      </View>
    </CSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  appLogoStyle: {
    width: deviceWidth,
    height: getHeight(150),
    resizeMode: 'contain',
    ...styles.selfCenter,
    ...styles.mv15,
    ...styles.mb50,
  },
  rootContainer: {
    ...styles.ph20,
    ...styles.justifyBetween,
    height: '40%',
  },
});
