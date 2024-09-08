import {Image, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';

// Local Imports
import images from '../assets/images';
import {styles} from '../themes';
import {StackNav} from '../navigation/NavigationKeys';
import {getAsyncStorageData} from '../utils/helpers';
import {USER_NAME} from '../api/url';

export default function SplashScreen({navigation}) {
  useEffect(() => {
    asyncProcess();
  }, []);

  const asyncProcess = async () => {
    const userName = await getAsyncStorageData(USER_NAME);
    if (!!userName) {
      navigation.replace(StackNav.HomeScreen);
    } else {
      navigation.replace(StackNav.Welcome);
    }
  };

  return (
    <Image source={images.splashScreen} style={localStyles.rootContainer} />
  );
}

const localStyles = StyleSheet.create({
  rootContainer: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    ...styles.center,
  },
});
