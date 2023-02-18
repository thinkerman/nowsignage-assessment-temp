import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 20,
  },
  welcomeText: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    fontSize: 15,
    marginBottom: 30,
  },
  wrapper: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    display: 'flex',
    height: '50%',
    width: '100%',
  },
  textInput: {
    padding: 18,
    fontSize: 12,
    marginVertical: 8,
    backgroundColor: '#F5F5F5',
    color: '#1A1D26',
    borderColor: '#10AC84',
    borderRadius: 8,
    height: 50,
    width: '100%',
    textAlignVertical: 'center',
    includeFontPadding: false,
    textAlignVertical: 'top',
  },
  signInButton: {
    borderRadius: 40,
    width: '100%',
    border: '2px solid #0089AF',
    padding: 5,
    backgroundColor: '#0089AF',
    textAlign: 'center',
    fontSize: 15,
  },
  signInButtonTxt: {
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
    paddingVertical: 8,
    fontWeight: 'bold',
  },
  errorMessage: {
    color: '#FF0000',
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 12,
  },
  activityIndicator: {
    height: 33,
  },
});

export default styles;
