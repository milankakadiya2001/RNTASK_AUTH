//Library Imports
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

//Local Imports
import {getHeight} from '../../common/constants';
import {colors, styles} from '../../themes';
import CText from './CText';

export default function CButton({
  title,
  type = 'B16',
  color = colors.buttonColor1,
  onPress,
  containerStyle,
  style,
  icon = null,
  frontIcon = null,
  children,
  bgColor = null,
  ...props
}) {
  return (
    <TouchableOpacity
      style={[
        localStyle.btnContainer,
        styles.rowCenter,
        containerStyle,
        bgColor
          ? {backgroundColor: bgColor}
          : {backgroundColor: colors.primary},
      ]}
      onPress={onPress}
      {...props}>
      {/* If Icon Added In Button Front Side */}
      {frontIcon}
      <CText type={type} style={style} color={color}>
        {title}
      </CText>
      {icon}
      {children}
    </TouchableOpacity>
  );
}

const localStyle = StyleSheet.create({
  btnContainer: {
    width: '100%',
    height: getHeight(52),
    borderRadius: getHeight(32),
  },
});
