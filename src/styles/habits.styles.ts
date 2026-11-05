
import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const habitStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.marfil,
  },

  content: {
    paddingHorizontal: 26,
    paddingTop: 38,
    paddingBottom: 45,
  },

  title: {
    fontSize: 38,
    color: colors.espresso,
    fontWeight: '600',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 14,
    color: colors.cafe,
    marginBottom: 35,
  },

  summaryCard: {
    backgroundColor: colors.arena,
    padding: 20,
    borderRadius: 18,
    marginBottom: 28,
  },

  summaryTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.espresso,
  },

  summaryText: {
    fontSize: 14,
    color: colors.cafe,
    marginTop: 12,
  },

  progressTrack: {
    height: 9,
    borderRadius: 12,
    backgroundColor: colors.blanco,
    marginTop: 16,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: colors.salvia,
    borderRadius: 12,
  },

  habitCard: {
    backgroundColor: colors.blanco,
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },

  habitInfo: {
    flex: 1,
  },

  habitName: {
    fontSize: 16,
    color: colors.espresso,
    fontWeight: '600',
  },

  completedText: {
    textDecorationLine: 'line-through',
    color: colors.salvia,
  },

  habitReward: {
    fontSize: 12,
    color: colors.cafe,
    marginTop: 6,
  },

  addButton: {
    backgroundColor: colors.cafe,
    borderRadius: 16,
    paddingVertical: 17,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 30,
  },

  addButtonText: {
    color: colors.blanco,
    fontSize: 16,
    fontWeight: '700',
  },
    
  coinsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.arena,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 22,
    gap: 10,
  },

  coinsText: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.cafe,
  },



});
