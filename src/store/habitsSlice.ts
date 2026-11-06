import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Habit {
  id: string;
  name: string;
  completed: boolean;
}

interface HabitsState {
  habits: Habit[];
  coins: number;
}

const initialState: HabitsState = {
  habits: [],
  coins: 0, // Empezamos con 0 monedas
};

const habitsSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
    addHabit: (state, action: PayloadAction<{ id: string; name: string; completed: boolean }>) => {
      state.habits.push(action.payload);
    },
    toggleHabit: (state, action: PayloadAction<string>) => {
      const habit = state.habits.find((h) => h.id === action.payload);
      if (habit) {
        habit.completed = !habit.completed;
        if (habit.completed) {
          state.coins += 10; // +10 monedas al completar
        } else {
          state.coins -= 10; // -10 monedas al desmarcar
        }
      }
    },
  },
});

export const { addHabit, toggleHabit } = habitsSlice.actions;
export default habitsSlice.reducer;