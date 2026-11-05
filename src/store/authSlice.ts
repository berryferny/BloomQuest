
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Definimos cómo será la información del inicio de sesión
interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
}

// Estado inicial
const initialState: AuthState = {
  token: null,
  loading: false,
  error: null,
};

// Simulación de una petición al servidor
const peticionFake = (email: string, password: string) => {
  return {
    token: '1234567890qwertyuiolkjhgfds',
  };
};

// Acción para iniciar sesión
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const { token } = peticionFake(email, password);

      return { token };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Error al iniciar sesión'
      );
    }
  }
);

// Creamos nuestro slice de autenticación
const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    logout: (state) => {
      state.token = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || 'Error desconocido';
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
