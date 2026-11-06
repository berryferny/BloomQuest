import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Habit { id: string; name: string; completed: boolean; }
interface MoodEntry { date: string; mood: string; emoji: string; }

export interface Plant {
  id: string;
  type: string;
  emoji: string;
  stage: number;
  maxStage: number;
  isBloomed: boolean;
}

interface HabitsState {
  habits: Habit[];
  coins: number;
  seedInventory: string[];
  garden: (Plant | null)[];
  completedMissions: string[];
  moodHistory: MoodEntry[];
  streak: number;
  lastLoginDate: string | null;
  userName: string;
  lastHabitResetDate: string | null;
}

const initialState: HabitsState = {
  habits: [],
  coins: 100, // Monedas iniciales de regalo
  seedInventory: [],
  garden: [null, null, null, null, null, null], // 6 macetas
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
    addHabit: (state, action) => { state.habits.push(action.payload); },
    toggleHabit: (state, action) => {
      const habit = state.habits.find((h) => h.id === action.payload);
      if (habit) {
        habit.completed = !habit.completed;
        state.coins += habit.completed ? 10 : -10;
      }
    },
    deleteHabit: (state, action) => { state.habits = state.habits.filter((h) => h.id !== action.payload); },
    resetHabitsDaily: (state) => {
      const today = new Date().toDateString();
      if (state.lastHabitResetDate !== today) {
        state.habits.forEach((h) => { h.completed = false; });
        state.lastHabitResetDate = today;
      }
    },
    
    buySeed: (state, action: PayloadAction<{ type: string; price: number }>) => {
      if (state.coins >= action.payload.price) {
        state.coins -= action.payload.price;
        if (!state.seedInventory) state.seedInventory = [];
        state.seedInventory.push(action.payload.type);
      }
    },
    plantSeed: (state, action: PayloadAction<{ index: number; type: string; maxStage: number; emoji: string }>) => {
      if (!state.seedInventory) state.seedInventory = [];
      if (!state.garden || state.garden.length === 0) {
        state.garden = [null, null, null, null, null, null];
      }
      
      const seedIndex = state.seedInventory.indexOf(action.payload.type);
      if (seedIndex !== -1) {
        state.seedInventory.splice(seedIndex, 1);
        state.garden[action.payload.index] = {
          id: Date.now().toString(),
          type: action.payload.type,
          emoji: action.payload.emoji,
          stage: 0,
          maxStage: action.payload.maxStage,
          isBloomed: false,
        };
      }
    },
    waterPlant: (state, action: PayloadAction<number>) => {
      if (!state.garden) state.garden = [null, null, null, null, null, null];
      const plant = state.garden[action.payload];
      if (plant && !plant.isBloomed) {
        plant.stage += 1;
        // Si llega a la etapa máxima, florece y te da 10 monedas de recompensa
        if (plant.stage >= plant.maxStage) {
          plant.isBloomed = true;
          state.coins += 10; 
        }
      }
    },

    completeMission: (state, action) => {
      if (!state.completedMissions) state.completedMissions = [];
      if (!state.completedMissions.includes(action.payload.missionId)) {
        state.completedMissions.push(action.payload.missionId);
        state.coins += action.payload.reward;
      }
    },
    addMood: (state, action) => {
      if (!state.moodHistory) state.moodHistory = [];
      state.moodHistory.unshift({
        date: new Date().toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' }),
        mood: action.payload.mood, emoji: action.payload.emoji
      });
    },
    addCoins: (state, action) => { state.coins += action.payload; },
    checkDailyStreak: (state) => {
      const today = new Date().toDateString();
      if (!state.lastLoginDate) {
        state.streak = 1; state.lastLoginDate = today; state.coins += 10; 
      } else if (state.lastLoginDate !== today) {
        const lastDate = new Date(state.lastLoginDate);
        const diffDays = Math.ceil(Math.abs(new Date(today).getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
        if (diffDays === 1) { state.streak += 1; state.coins += 20; } 
        else { state.streak = 1; state.coins += 10; }
        state.lastLoginDate = today;
      }
    },
    setUserName: (state, action) => { state.userName = action.payload; }
  },
});

export const { 
  addHabit, toggleHabit, deleteHabit, resetHabitsDaily, 
  buySeed, plantSeed, waterPlant,
  completeMission, addMood, addCoins, checkDailyStreak, setUserName 
} = habitsSlice.actions;

export default habitsSlice.reducer;