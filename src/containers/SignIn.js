import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Local Imports
import CSafeAreaView from '../components/common/CSafeAreaView';
import images from '../assets/images';
import {deviceWidth, getHeight, moderateScale} from '../common/constants';
import {colors, styles} from '../themes';
import CText from '../components/common/CText';
import strings from '../i18n/strings';
import KeyBoardAvoidWrapper from '../components/common/KeyBoardAvoidWrapper';
import CInput from '../components/common/CInput';
import CButton from '../components/common/CButton';
import {StackNav} from '../navigation/NavigationKeys';
import {setAsyncStorageData, showPopupWithOk} from '../utils/helpers';
import {LOGIN_URL, USER_NAME} from '../api/url';
import CLoader from '../components/common/CLoader';

export default function SignIn({navigation}) {
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onChangePhoneNumber = val => setPhoneNumber(val.trim());
  const onChangedPassword = val => setPassword(val.trim());

  const onPressPasswordEyeIcon = () => setIsPasswordVisible(!isPasswordVisible);

  const onPressLetSignUp = () => navigation.navigate(StackNav.SignUp);
  const onPressSignIn = () => {
    if (!phoneNumber || !password) {
      showPopupWithOk(strings.error, strings.allFieldsAreRequired);
    } else {
      setIsLoading(true);
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      const raw = JSON.stringify({
        phone: phoneNumber,
        password: password,
      });
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
      };
      fetch(LOGIN_URL, requestOptions)
        .then(response => response.json())
        .then(async result => {
          if (result.status) {
            await setAsyncStorageData(USER_NAME, result?.data?.name);
            global.userName = result?.data?.name;
            navigation.navigate(StackNav.HomeScreen);
          } else {
            showPopupWithOk(strings.error, result?.message);
          }
        })
        .catch(() => showPopupWithOk(strings.error, strings.somethingWentWrong))
        .finally(() => setIsLoading(false));
    }
  };

  const EmailIcon = () => {
    return (
      <Ionicons
        name="call-outline"
        size={moderateScale(20)}
        color={colors.gray1}
      />
    );
  };

  const PasswordIcon = () => (
    <Ionicons
      name="lock-closed-outline"
      size={moderateScale(20)}
      color={colors.gray1}
    />
  );

  const RightPasswordEyeIcon = () => (
    <TouchableOpacity onPress={onPressPasswordEyeIcon}>
      <Ionicons
        name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
        size={moderateScale(20)}
        color={colors.gray1}
      />
    </TouchableOpacity>
  );

  return (
    <CSafeAreaView>
      <ImageBackground
        source={images.signInImg}
        style={localStyles.rootContainer}>
        <KeyBoardAvoidWrapper contentContainerStyle={styles.ph20}>
          <Image source={images.logoImg} style={localStyles.appLogoStyle} />
          <CText type={'B26'}>{strings.signIn}</CText>
          <CText type={'M14'} style={styles.mv5} color={colors.gray1}>
            {strings.signInDesc}
          </CText>
          <CInput
            label={strings.phoneNumber}
            placeHolder={'9876543211'}
            keyBoardType={'number-pad'}
            _value={phoneNumber}
            autoCapitalize={'none'}
            insideLeftIcon={() => <EmailIcon />}
            toGetTextFieldValue={onChangePhoneNumber}
          />
          <CInput
            label={strings.password}
            placeHolder={'password'}
            keyBoardType={'default'}
            _value={password}
            _isSecure={!isPasswordVisible}
            autoCapitalize={'none'}
            insideLeftIcon={() => <PasswordIcon />}
            toGetTextFieldValue={onChangedPassword}
            rightAccessory={() => <RightPasswordEyeIcon />}
          />
          <TouchableOpacity style={localStyles.forgotPasswordStyle}>
            <CText type={'M14'} style={localStyles.fpStyle}>
              {strings.forgotPassword}
            </CText>
          </TouchableOpacity>
          <CButton
            title={strings.signIn}
            containerStyle={styles.mv20}
            onPress={onPressSignIn}
          />
          <View style={localStyles.orContainer}>
            <View style={localStyles.dividerStyle} />
            <CText type={'M14'} color={colors.gray1}>
              {strings.or}
            </CText>
            <View style={localStyles.dividerStyle} />
          </View>
          <View style={localStyles.socialContainer}>
            <TouchableOpacity style={localStyles.socialIconContainer}>
              <Ionicons
                name="logo-google"
                size={moderateScale(18)}
                color={colors.black}
              />
            </TouchableOpacity>
            <TouchableOpacity style={localStyles.socialIconContainer}>
              <Ionicons
                name="logo-apple"
                size={moderateScale(18)}
                color={colors.black}
              />
            </TouchableOpacity>
          </View>
          <View style={localStyles.accountStyle}>
            <CText type={'R14'} color={colors.gray1}>
              {strings.donHaveAccount}
            </CText>
            <TouchableOpacity onPress={onPressLetSignUp}>
              <CText type={'S14'} style={localStyles.fpStyle}>
                {strings.signUp}
              </CText>
            </TouchableOpacity>
          </View>
          <CText
            type={'M14'}
            align={'center'}
            style={styles.mb10}
            color={colors.gray1}>
            {strings.authDesc}
          </CText>
        </KeyBoardAvoidWrapper>
      </ImageBackground>
      {isLoading && <CLoader />}
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
  },
  rootContainer: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  forgotPasswordStyle: {
    ...styles.selfEnd,
  },
  fpStyle: {
    textDecorationLine: 'underline',
  },
  accountStyle: {
    ...styles.rowCenter,
    ...styles.mv15,
  },
  orContainer: {
    ...styles.rowCenter,
    gap: moderateScale(10),
  },
  dividerStyle: {
    width: '35%',
    height: moderateScale(1),
    backgroundColor: colors.primary,
  },
  socialContainer: {
    ...styles.rowCenter,
    ...styles.mv15,
    gap: moderateScale(20),
  },
  socialIconContainer: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    ...styles.center,
    borderWidth: moderateScale(1),
    borderColor: colors.primary,
  },
});
