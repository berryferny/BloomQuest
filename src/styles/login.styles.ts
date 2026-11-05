
import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const loginStyles = StyleSheet.create({
  flex: {
    flex: 1,
  },

  container: {
    flex: 1,
    backgroundColor: colors.marfil,
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: 32,
    paddingTop: 48,
    paddingBottom: 50,
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: 85,
  },

  logo: {
    fontSize: 42,
    fontWeight: '600',
    color: colors.cafe,
  },
  
logoImage: {
  width: 310,
  height: 150,
  alignSelf: 'center',
},


  slogan: {
    fontSize: 12,
    color: colors.cafe,
    letterSpacing: 1,
    textAlign: 'center',
    marginTop: 7,
  },

  title: {
    fontSize: 32,
    fontWeight: '500',
    color: colors.espresso,
    marginBottom: 38,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.espresso,
    marginBottom: 13,
  },

  input: {
    height: 54,
    backgroundColor: colors.blanco,
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 15,
    color: colors.espresso,
    marginBottom: 24,
  },

  button: {
    height: 54,
    backgroundColor: colors.cafe,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
  },

  buttonText: {
    color: colors.blanco,
    fontSize: 16,
    fontWeight: '700',
  },

  registerButton: {
    alignItems: 'center',
    marginTop: 32,
  },

  registerText: {
    color: colors.espresso,
    fontSize: 14,
    fontWeight: '600',
  },

  forgotText: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 13,
    color: colors.cafe,
  },
});
