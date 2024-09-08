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
import {REGISTER_URL, USER_NAME} from '../api/url';
import CLoader from '../components/common/CLoader';

export default function SignUp({navigation}) {
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onChangePhoneNumber = val => setPhoneNumber(val.trim());

  const onChangedPassword = val => setPassword(val.trim());

  const onChangedName = val => setName(val.trim());

  const onPressPasswordEyeIcon = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const onPressSignUp = async () => {
    if (!name || !phoneNumber || !password) {
      showPopupWithOk(strings.error, strings.allFieldsAreRequired);
    } else {
      setIsLoading(true);
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      const raw = JSON.stringify({
        name: name,
        phone: phoneNumber,
        password: password,
      });
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
      };
      fetch(REGISTER_URL, requestOptions)
        .then(response => response.json())
        .then(async result => {
          if (result.status) {
            await setAsyncStorageData(USER_NAME, result?.data?.name);
            global.userName = result?.data?.name;
            navigation.navigate(StackNav.HomeScreen);
          } else {
            const errorMessages = Object.values(result.error).flat();
            showPopupWithOk(strings.error, errorMessages[0]);
          }
        })
        .catch(() => showPopupWithOk(strings.error, strings.somethingWentWrong))
        .finally(() => setIsLoading(false));
    }
  };

  const onPressSignIn = () => navigation.navigate(StackNav.SignIn);

  const RenderLeftIcon = ({icon}) => {
    return (
      <Ionicons name={icon} size={moderateScale(20)} color={colors.gray1} />
    );
  };

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
        source={images.signUpImg}
        style={localStyles.rootContainer}>
        <KeyBoardAvoidWrapper contentContainerStyle={styles.ph20}>
          <Image source={images.logoImg} style={localStyles.appLogoStyle} />
          <CText type={'B26'}>{strings.signUp}</CText>
          <CText type={'M14'} style={styles.mv5} color={colors.gray1}>
            {strings.signUpDesc}
          </CText>
          <CInput
            label={strings.name}
            placeHolder={'Enter your name'}
            _value={name}
            autoCapitalize={'none'}
            insideLeftIcon={() => <RenderLeftIcon icon="person-outline" />}
            toGetTextFieldValue={onChangedName}
          />
          <CInput
            label={strings.phoneNumber}
            placeHolder={'xyz@gmail.com'}
            keyBoardType={'number-pad'}
            _value={phoneNumber}
            autoCapitalize={'none'}
            insideLeftIcon={() => <RenderLeftIcon icon="call-outline" />}
            toGetTextFieldValue={onChangePhoneNumber}
          />
          <CInput
            label={strings.password}
            placeHolder={'password'}
            keyBoardType={'default'}
            _value={password}
            _isSecure={!isPasswordVisible}
            autoCapitalize={'none'}
            insideLeftIcon={() => <RenderLeftIcon icon="lock-closed-outline" />}
            toGetTextFieldValue={onChangedPassword}
            rightAccessory={() => <RightPasswordEyeIcon />}
          />
          <CButton
            title={strings.signUp}
            containerStyle={styles.mv20}
            onPress={onPressSignUp}
          />
          <View style={localStyles.accountStyle}>
            <CText type={'R14'} color={colors.gray1}>
              {strings.alreadyHaveAccount}
            </CText>
            <TouchableOpacity onPress={onPressSignIn}>
              <CText type={'S14'} style={localStyles.fpStyle}>
                {strings.signIn}
              </CText>
            </TouchableOpacity>
          </View>
          <CText type={'M14'} align={'center'} color={colors.gray1}>
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
