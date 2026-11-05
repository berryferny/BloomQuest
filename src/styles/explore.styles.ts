
import { StyleSheet } from 'react-native';

export const exploreStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F5EF',
  },
  content: {
    padding: 22,
    paddingBottom: 28,
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#342F29',
  },
  subtitle: {
    fontSize: 14,
    color: '#705849',
    marginTop: 7,
    marginBottom: 24,
    lineHeight: 21,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 13,
    borderWidth: 1,
    borderColor: '#EBE5DA',
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EBE5DA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardInfo: {
    flex: 1,
    marginHorizontal: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#342F29',
  },
  cardText: {
    fontSize: 12,
    color: '#705849',
    marginTop: 5,
    lineHeight: 18,
  },
  comingSoon: {
    backgroundColor: '#EBE5DA',
    padding: 20,
    borderRadius: 18,
    alignItems: 'center',
    marginTop: 12,
  },
  comingSoonTitle: {
    color: '#342F29',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  comingSoonText: {
    color: '#705849',
    textAlign: 'center',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 8,
  },
});

