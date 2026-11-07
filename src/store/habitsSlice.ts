import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addHabitToDb, deleteHabitFromDb, toggleHabitInDb, updateHabitInDb } from '../lib/habitsDb';
import { supabase } from '../lib/supabase';

export interface Habit { id: string; name: string; completed: boolean; days: string[]; time: string; }
interface MoodEntry { id: string; date: string; mood: string; emoji: string; }
export interface Plant { id: string; type: string; emoji: string; stage: number; maxStage: number; isBloomed: boolean; lastWateredDate?: string; }

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
  toastMessage: string | null;
  toastVisible: boolean;
  avatarUrl: string | null;
}

const initialState: HabitsState = {
  habits: [], coins: 100, seedInventory: [], garden: [null, null, null, null, null, null], completedMissions: [], moodHistory: [], streak: 0, lastLoginDate: null, userName: 'Persona Bloom', lastHabitResetDate: null,
  toastMessage: null, toastVisible: false, avatarUrl: null,
};

// Función maestra para guardar todo en Supabase sin errores de Proxy
const syncAllProfileData = async (state: HabitsState) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    const safeState = JSON.parse(JSON.stringify({
      coins: state.coins,
      garden: state.garden,
      inventory: state.seedInventory,
      completed_missions: state.completedMissions,
      mood_history: state.moodHistory,
      streak: state.streak,
      last_login_date: state.lastLoginDate
    }));
    await supabase.from('profiles').update(safeState).eq('id', user.id);
  }
};

const habitsSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
    logout: (state) => { return initialState; },
    setHabitsFromDb: (state, action) => { state.habits = action.payload; },
    setProfile: (state, action) => {
      if (action.payload) {
        state.coins = action.payload.coins;
        state.seedInventory = action.payload.inventory || [];
        state.garden = action.payload.garden || [null, null, null, null, null, null];
        state.streak = action.payload.streak;
        state.lastLoginDate = action.payload.last_login_date;
        state.moodHistory = action.payload.mood_history || [];
        state.completedMissions = action.payload.completed_missions || [];
        if (action.payload.avatar_url) {
          state.avatarUrl = action.payload.avatar_url;
        }
      }
    },
    setAvatarUrl: (state, action) => { state.avatarUrl = action.payload; },
    showToast: (state, action) => { state.toastMessage = action.payload; state.toastVisible = true; },
    hideToast: (state) => { state.toastVisible = false; state.toastMessage = null; },
    
    addHabit: (state, action: PayloadAction<Habit>) => { 
      state.habits.push(action.payload); 
      addHabitToDb(action.payload); 
    },
    updateHabit: (state, action: PayloadAction<{ id: string, name: string, days: string[], time: string }>) => {
      const habit = state.habits.find((h) => h.id === action.payload.id);
      if (habit) {
        habit.name = action.payload.name; habit.days = action.payload.days; habit.time = action.payload.time;
        updateHabitInDb(action.payload.id, action.payload.name, action.payload.days, action.payload.time);
      }
    },
    toggleHabit: (state, action) => {
      const habit = state.habits.find((h) => h.id === action.payload);
      if (habit) {
        habit.completed = !habit.completed;
        state.coins += habit.completed ? 10 : -10;
        toggleHabitInDb(habit.id, habit.completed); 
        syncAllProfileData(state); // Guardar monedas
      }
    },
    deleteHabit: (state, action) => { state.habits = state.habits.filter((h) => h.id !== action.payload); deleteHabitFromDb(action.payload); },
    resetHabitsDaily: (state) => {
      const today = new Date().toDateString();
      if (state.lastHabitResetDate !== today) { 
        state.habits.forEach((h) => { h.completed = false; }); 
        state.completedMissions = []; 
        state.lastHabitResetDate = today; 
        syncAllProfileData(state); // Guardar el reinicio de misiones
      }
    },
    
    buySeed: (state, action: PayloadAction<{ type: string; price: number }>) => {
      if (state.coins >= action.payload.price) {
        state.coins -= action.payload.price;
        if (!state.seedInventory) state.seedInventory = [];
        state.seedInventory.push(action.payload.type);
        syncAllProfileData(state); // Guardar monedas y semillas
      }
    },
    plantSeed: (state, action) => {
      if (!state.seedInventory) state.seedInventory = [];
      if (!state.garden || state.garden.length === 0) state.garden = [null, null, null, null, null, null];
      const seedIndex = state.seedInventory.indexOf(action.payload.type);
      if (seedIndex !== -1) {
        state.seedInventory.splice(seedIndex, 1);
        state.garden[action.payload.index] = { id: Date.now().toString(), type: action.payload.type, emoji: action.payload.emoji, stage: 0, maxStage: action.payload.maxStage, isBloomed: false, lastWateredDate: undefined };
        syncAllProfileData(state); // Guardar jardín
      }
    },
    waterPlant: (state, action) => {
      if (!state.garden) state.garden = [null, null, null, null, null, null];
      const plant = state.garden[action.payload];
      if (plant && !plant.isBloomed) {
        const today = new Date().toDateString();
        if (plant.lastWateredDate !== today) {
          plant.stage += 1; plant.lastWateredDate = today;
          if (plant.stage >= plant.maxStage) { plant.isBloomed = true; state.coins += 10; }
          syncAllProfileData(state); // Guardar crecimiento y monedas
        }
      }
    },
    completeMission: (state, action) => {
      if (!state.completedMissions) state.completedMissions = [];
      if (!state.completedMissions.includes(action.payload.missionId)) { 
        state.completedMissions.push(action.payload.missionId); 
        state.coins += action.payload.reward; 
        syncAllProfileData(state); // Guardar misión y monedas
      }
    },
    addMood: (state, action) => {
      if (!state.moodHistory) state.moodHistory = [];
      state.moodHistory.unshift({ id: Date.now().toString(), date: new Date().toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' }), mood: action.payload.mood, emoji: action.payload.emoji });
      syncAllProfileData(state); // Guardar emociones
    },
    deleteMood: (state, action: PayloadAction<any>) => {
      if (typeof action.payload === 'string') state.moodHistory = state.moodHistory.filter((m) => m.id !== action.payload);
      else state.moodHistory.splice(action.payload, 1);
      syncAllProfileData(state); // Guardar borrado de emoción
    },
    addCoins: (state, action) => { 
      state.coins += action.payload; 
      syncAllProfileData(state);
    },
    checkDailyStreak: (state) => {
      const today = new Date().toDateString();
      if (!state.lastLoginDate) { 
        state.streak = 1; state.lastLoginDate = today; state.coins += 10; 
        syncAllProfileData(state);
      } 
      else if (state.lastLoginDate !== today) {
        const lastDate = new Date(state.lastLoginDate);
        const diffDays = Math.ceil(Math.abs(new Date(today).getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
        if (diffDays === 1) { state.streak += 1; state.coins += 20; } else { state.streak = 1; state.coins += 10; }
        state.lastLoginDate = today;
        syncAllProfileData(state);
      }
    },
    setUserName: (state, action) => { state.userName = action.payload; }
  },
});

export const { 
  logout, setHabitsFromDb, setProfile, setAvatarUrl, showToast, hideToast, 
  addHabit, updateHabit, toggleHabit, deleteHabit, resetHabitsDaily, 
  buySeed, plantSeed, waterPlant, completeMission, addMood, deleteMood, addCoins, checkDailyStreak, setUserName 
} = habitsSlice.actions;

export default habitsSlice.reducer;