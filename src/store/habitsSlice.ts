
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Habit = {
  id: string;
  nombre: string;
  frecuencia: string;
  completado: boolean;
};

type HabitsState = {
  habitos: Habit[];
  monedas: number;
};

const initialState: HabitsState = {
  monedas: 0,

  habitos: [
    {
      id: '1',
      nombre: 'Hidratarme',
      frecuencia: 'Todos los días',
      completado: false,
    },
    {
      id: '2',
      nombre: 'Estudiar',
      frecuencia: 'Todos los días',
      completado: false,
    },
    {
      id: '3',
      nombre: 'Mover mi cuerpo',
      frecuencia: 'Todos los días',
      completado: false,
    },
    {
      id: '4',
      nombre: 'Descansar mejor',
      frecuencia: 'Todos los días',
      completado: false,
    },
  ],
};

const habitsSlice = createSlice({
  name: 'habits',
  initialState,

  reducers: {
    agregarHabito: (state, action: PayloadAction<Habit>) => {
      state.habitos.push(action.payload);
    },

    cambiarEstadoHabito: (
      state,
      action: PayloadAction<string>
    ) => {
      const habito = state.habitos.find(
        (h) => h.id === action.payload
      );

      if (!habito) return;

      if (habito.completado) {
        habito.completado = false;
        state.monedas = Math.max(0, state.monedas - 10);
      } else {
        habito.completado = true;
        state.monedas += 10;
      }
    },
  },
});

export const {
  agregarHabito,
  cambiarEstadoHabito,
} = habitsSlice.actions;

export default habitsSlice.reducer;
