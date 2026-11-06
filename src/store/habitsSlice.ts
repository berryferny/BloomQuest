import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Habit {
  id: string;
  name: string;
  completed: boolean;
}

interface MoodEntry {
  date: string;
  mood: string;
  emoji: string;
}

interface HabitsState {
  habits: Habit[];
  coins: number;
  inventory: string[];
  completedMissions: string[];
  moodHistory: MoodEntry[]; // <-- NUEVO
}

const initialState: HabitsState = {
  habits: [],
  coins: 0,
  inventory: [],
  completedMissions: [],
  moodHistory: [], // <-- NUEVO
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
        if (habit.completed) state.coins += 10;
        else state.coins -= 10;
      }
    },
    buyItem: (state, action: PayloadAction<{ item: string; price: number }>) => {
      if (state.coins >= action.payload.price) {
        state.coins -= action.payload.price;
        state.inventory.push(action.payload.item);
      }
    },
    completeMission: (state, action: PayloadAction<{ missionId: string; reward: number }>) => {
      if (!state.completedMissions) state.completedMissions = [];
      if (!state.completedMissions.includes(action.payload.missionId)) {
        state.completedMissions.push(action.payload.missionId);
        state.coins += action.payload.reward;
      }
    },
    // NUEVA ACCIÓN
    addMood: (state, action: PayloadAction<{ mood: string; emoji: string }>) => {
      if (!state.moodHistory) state.moodHistory = []; // Prevención por si viene de estado viejo
      
      const newEntry = {
        date: new Date().toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' }),
        mood: action.payload.mood,
        emoji: action.payload.emoji
      };
      
      // Lo ponemos al principio para que lo más reciente salga primero
      state.moodHistory.unshift(newEntry);
    },
  },
});

export const { addHabit, toggleHabit, buyItem, completeMission, addMood } = habitsSlice.actions;
export default habitsSlice.reducer;