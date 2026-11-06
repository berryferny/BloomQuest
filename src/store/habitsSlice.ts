import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Habit {
  id: string;
  name: string;
  completed: boolean;
}

interface HabitsState {
  habits: Habit[];
  coins: number;
  inventory: string[];
  completedMissions: string[];
}

const initialState: HabitsState = {
  habits: [],
  coins: 0,
  inventory: [],
  completedMissions: [],
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
      if (!state.completedMissions) {
        state.completedMissions = [];
      }
      if (!state.completedMissions.includes(action.payload.missionId)) {
        state.completedMissions.push(action.payload.missionId);
        state.coins += action.payload.reward;
      }
    },
  },
});

export const { addHabit, toggleHabit, buyItem, completeMission } = habitsSlice.actions;
export default habitsSlice.reducer;