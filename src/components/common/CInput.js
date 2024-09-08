import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';

// Local Imports
import {getHeight, moderateScale} from '../../common/constants';
import {colors, styles} from '../../themes';
import typography from '../../themes/typography';
import CText from './CText';

export default CInput = props => {
  let {
    _value,
    inputContainerStyle,
    inputBoxStyle,
    toGetTextFieldValue,
    placeHolder,
    keyBoardType,
    _onFocus,
    _onBlur,
    _errorText,
    _autoFocus,
    _isSecure,
    _maxLength,
    _editable = true,
    autoCapitalize,
    multiline,
    errorStyle,
    fieldRef,
    insideLeftIcon,
    rightAccessory,
    labelStyle,
    label,
  } = props;

  // Change Text Input Value
  const onChangeText = val => {
    toGetTextFieldValue(val);
  };

  return (
    <View style={styles.mv10}>
      {label && (
        <View style={[localStyle.labelContainer, labelStyle]}>
          <CText style={localStyle.labelText} color={colors.black} type={'M14'}>
            {label}
          </CText>
        </View>
      )}
      <View
        style={[
          localStyle.inputContainer,
          {
            borderColor: _errorText ? colors.lightRed : colors.gray1,
            height: multiline ? getHeight(100) : getHeight(50),
          },
          inputContainerStyle,
        ]}>
        {insideLeftIcon ? (
          <View style={styles.pl10}>{insideLeftIcon()}</View>
        ) : null}
        <TextInput
          ref={fieldRef}
          secureTextEntry={_isSecure}
          value={_value}
          maxLength={_maxLength}
          defaultValue={_value}
          autoFocus={_autoFocus}
          autoCorrect={false}
          autoCapitalize={autoCapitalize}
          placeholderTextColor={colors.gray1}
          onChangeText={onChangeText}
          keyboardType={keyBoardType}
          multiline={multiline}
          editable={_editable}
          onFocus={_onFocus}
          onBlur={_onBlur}
          placeholder={placeHolder}
          style={[
            localStyle.inputBox,
            {height: multiline ? getHeight(90) : getHeight(50)},
            inputBoxStyle,
            _editable == false && {color: colors.placeHolderColor},
          ]}
          {...props}
        />
        {/* Right Icon And Content Inside TextInput */}
        <View style={[styles.mr15]}>
          {rightAccessory ? rightAccessory() : null}
        </View>
      </View>
      {/* Error Text Message Of Input */}
      {!!_errorText?.length ? (
        <CText
          type={'r12'}
          style={{
            ...localStyle.errorText,
            ...errorStyle,
          }}>
          {_errorText}
        </CText>
      ) : null}
    </View>
  );
};

const localStyle = StyleSheet.create({
  inputBox: {
    ...typography.fontSizes.f14,
    ...typography.fontWeights.Italic,
    ...styles.ph10,
    ...styles.flex,
    color: colors.textColor,
  },
  inputContainer: {
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(10),
    ...styles.rowSpaceBetween,
    ...styles.mt5,
    width: '100%',
  },
  errorText: {
    textAlign: 'left',
    ...styles.mt5,
    ...styles.ml10,
    color: colors.lightRed,
  },
  labelContainer: {
    ...styles.rowSpaceBetween,
    ...styles.mb5,
  },
  labelText: {
    textAlign: 'left',
    opacity: 0.9,
  },
});
