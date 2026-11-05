
import { StyleSheet } from 'react-native';

export const bottomNavStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    borderTopWidth: 1,
    borderTopColor: '#EBE5DA',
  },

  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    gap: 5,
  },

  label: {
    fontSize: 11,
    color: '#342F29',
  },

  activeLabel: {
    color: '#705849',
    fontWeight: '700',
  },
});
