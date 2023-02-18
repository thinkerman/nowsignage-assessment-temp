import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  circleTimer: {
    position: 'absolute',
    alignSelf: 'flex-end',
    zIndex: 1,
  },
  imageSize: {
    flex: 1,
    resizeMode: 'cover',
    objectFit: 'contain',
    width: '100%',
    height: '100%',
  },
  loaderMessage: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
