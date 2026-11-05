
import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const createHabitStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.marfil,
  },

  content: {
    paddingHorizontal: 28,
    paddingTop: 25,
    paddingBottom: 45,
  },

  backButton: {
    marginBottom: 25,
  },

  title: {
    fontSize: 38,
    fontWeight: '600',
    color: colors.espresso,
  },

  subtitle: {
    fontSize: 14,
    color: colors.cafe,
    lineHeight: 22,
    marginTop: 10,
    marginBottom: 42,
  },

  label: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.espresso,
    marginBottom: 12,
  },

  input: {
    height: 58,
    backgroundColor: colors.blanco,
    borderRadius: 16,
    paddingHorizontal: 18,
    fontSize: 15,
    color: colors.espresso,
    marginBottom: 35,
    borderWidth: 1,
    borderColor: colors.arena,
  },

  optionsContainer: {
    gap: 12,
    marginBottom: 35,
  },

  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 17,
    backgroundColor: colors.blanco,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.arena,
  },

  optionSelected: {
    backgroundColor: colors.arena,
    borderColor: colors.salvia,
  },

  optionText: {
    fontSize: 15,
    color: colors.espresso,
  },

  rewardCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    backgroundColor: colors.arena,
    padding: 20,
    borderRadius: 18,
    marginBottom: 35,
  },

  rewardInfo: {
    flex: 1,
  },

  rewardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.espresso,
  },

  rewardDescription: {
    fontSize: 13,
    color: colors.cafe,
    marginTop: 6,
  },

  saveButton: {
    backgroundColor: colors.cafe,
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
  },

  saveButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.blanco,
  },
});
