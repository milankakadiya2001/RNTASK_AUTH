import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

// Local Imports
import CSafeAreaView from '../components/common/CSafeAreaView';
import images from '../assets/images';
import {colors, styles} from '../themes';
import {deviceWidth, getHeight} from '../common/constants';
import CText from '../components/common/CText';
import strings from '../i18n/strings';
import CButton from '../components/common/CButton';
import {StackNav} from '../navigation/NavigationKeys';

export default function Welcome({navigation}) {
  const onPressLetStart = () => navigation.replace(StackNav.SignUp);
  const onPressLetSignIn = () => navigation.replace(StackNav.SignIn);

  return (
    <CSafeAreaView>
      <ImageBackground source={images.wlcImg} style={localStyles.rootContainer}>
        <View style={localStyles.mainContainer}>
          <Image source={images.logoImg} style={localStyles.logoImgStyle} />
          <CText
            type={'S18'}
            align={'center'}
            style={styles.mv25}
            color={colors.gray1}>
            {strings.welcomeDesc}
          </CText>
        </View>
        <CButton
          title={strings.letStart}
          containerStyle={localStyles.btnStyle}
          onPress={onPressLetStart}
        />
        <View style={localStyles.accountStyle}>
          <CText type={'R14'} color={colors.gray1}>
            {strings.alreadyHaveAccount}
          </CText>
          <TouchableOpacity onPress={onPressLetSignIn}>
            <CText type={'S14'} style={localStyles.signInStyle}>
              {strings.signIn}
            </CText>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </CSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  rootContainer: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    ...styles.flexCenter,
  },
  logoImgStyle: {
    width: deviceWidth,
    height: getHeight(240),
    resizeMode: 'contain',
    ...styles.selfCenter,
  },
  btnStyle: {
    width: '90%',
    ...styles.mt30,
  },
  mainContainer: {
    ...styles.ph20,
  },
  accountStyle: {
    ...styles.rowCenter,
    ...styles.mv15,
  },
  signInStyle: {
    textDecorationLine: 'underline',
  },
});
