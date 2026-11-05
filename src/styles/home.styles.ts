
import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const homeStyles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.marfil,
  },

  content: {
    paddingHorizontal: 26,
    paddingTop: 40,
    paddingBottom: 35,
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
},

  title: {
    fontSize: 38,
    fontWeight: '600',
    color: colors.espresso,
  },

  subtitle: {
    fontSize: 14,
    color: colors.cafe,
    marginTop: 8,
    marginBottom: 30,
  },

  progressCard: {
    backgroundColor: colors.arena,
    padding: 20,
    borderRadius: 18,
    marginBottom: 28,
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.espresso,
  },

  progressText: {
    fontSize: 18,
    color: colors.cafe,
    fontWeight: '600',
    marginTop: 12,
  },

  progressTrack: {
    height: 9,
    backgroundColor: colors.blanco,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 18,
  },

  progressFill: {
    width: '60%',
    height: '100%',
    backgroundColor: colors.salvia,
    borderRadius: 10,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.espresso,
    marginBottom: 18,
  },

  habitCard: {
    backgroundColor: colors.blanco,
    padding: 18,
    borderRadius: 15,
    marginBottom: 12,
  },

  habitText: {
    fontSize: 16,
    color: colors.espresso,
  },

  button: {
    backgroundColor: colors.cafe,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 28,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.blanco,
  },

  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.blanco,
    paddingVertical: 18,
    paddingHorizontal: 8,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 8,
  },

  navActive: {
    fontSize: 12,
    color: colors.cafe,
    fontWeight: '700',
  },

  navItem: {
    fontSize: 12,
    color: colors.espresso,
},

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeTitle: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#342F29',
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EBE5DA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  coinsCard: {
    backgroundColor: '#EBE5DA',
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
  },
  coinsLabel: {
    fontSize: 14,
    color: '#705849',
  },
  coinsValue: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#342F29',
    marginTop: 5,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: '#EBE5DA',
  },
  summaryTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#342F29',
  },
  summaryText: {
    fontSize: 14,
    color: '#705849',
    marginTop: 7,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  seeAll: {
    color: '#705849',
    fontSize: 13,
    fontWeight: 'bold',
  },
  emptyText: {
    color: '#705849',
    marginVertical: 15,
  },
  habitInfo: {
    flex: 1,
    marginLeft: 12,
  },
  habitName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#342F29',
  },
  habitReward: {
    fontSize: 12,
    color: '#705849',
    marginTop: 4,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#705849',
    padding: 15,
    borderRadius: 16,
    marginTop: 10,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 8,
  },


});
