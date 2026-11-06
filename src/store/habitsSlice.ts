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
  moodHistory: MoodEntry[];
  streak: number;
  lastLoginDate: string | null;
  userName: string;
  lastHabitResetDate: string | null; // <-- NUEVO
}

const initialState: HabitsState = {
  habits: [],
  coins: 0,
  inventory: [],
  completedMissions: [],
  moodHistory: [],
  streak: 0,
  lastLoginDate: null,
  userName: 'Persona Bloom',
  lastHabitResetDate: null,
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
    // NUEVA ACCIÓN: Borrar hábito
    deleteHabit: (state, action: PayloadAction<string>) => {
      state.habits = state.habits.filter((h) => h.id !== action.payload);
    },
    // NUEVA ACCIÓN: Reiniciar hábitos cada día
    resetHabitsDaily: (state) => {
      const today = new Date().toDateString();
      if (state.lastHabitResetDate !== today) {
        state.habits.forEach((habit) => {
          habit.completed = false;
        });
        state.lastHabitResetDate = today;
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
    addMood: (state, action: PayloadAction<{ mood: string; emoji: string }>) => {
      if (!state.moodHistory) state.moodHistory = [];
      const newEntry = {
        date: new Date().toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' }),
        mood: action.payload.mood,
        emoji: action.payload.emoji
      };
      state.moodHistory.unshift(newEntry);
    },
    addCoins: (state, action: PayloadAction<number>) => {
      state.coins += action.payload;
    },
    checkDailyStreak: (state) => {
      const today = new Date().toDateString();
      if (!state.lastLoginDate) {
        state.streak = 1;
        state.lastLoginDate = today;
        state.coins += 10; 
      } else if (state.lastLoginDate !== today) {
        const lastDate = new Date(state.lastLoginDate);
        const currentDate = new Date(today);
        const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          state.streak += 1;
          state.coins += 20; 
        } else {
          state.streak = 1;
          state.coins += 10;
        }
        state.lastLoginDate = today;
      }
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    }
  },
});

export const { 
  addHabit, toggleHabit, deleteHabit, resetHabitsDaily, buyItem, completeMission, 
  addMood, addCoins, checkDailyStreak, setUserName 
} = habitsSlice.actions;

export default habitsSlice.reducer;