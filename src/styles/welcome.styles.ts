
import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const welcomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.marfil,
  },

  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 100,
  },

  logoContainer: {
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: colors.arena,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 52,
  },

  logo: {
    width: 175,
    height: 175,
    resizeMode: 'contain',
  },

  title: {
    fontSize: 40,
    color: colors.espresso,
    textAlign: 'center',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    color: colors.cafe,
    textAlign: 'center',
  },

  description: {
    fontSize: 15,
    color: colors.espresso,
    textAlign: 'center',
    lineHeight: 23,
    marginTop: 48,
  },

  footer: {
    paddingHorizontal: 32,
    paddingBottom: 60,
  },

  button: {
    backgroundColor: colors.cafe,
    borderRadius: 16,
    paddingVertical: 17,
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.blanco,
  },

  footerText: {
    textAlign: 'center',
    color: colors.cafe,
    fontSize: 13,
    marginTop: 12,
  },
});
