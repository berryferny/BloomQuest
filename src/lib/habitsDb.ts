import { supabase } from './supabase';

export const fetchHabitsFromDb = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('habits')
    .select('*')
    .eq('user_id', user.id);

  if (error) {
    console.error('Error al traer hábitos:', error);
    return [];
  }
  return data;
};

export const addHabitToDb = async (habit: { id: string, name: string, completed: boolean, days: string[], time: string }) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const { error } = await supabase.from('habits').insert({
    id: habit.id,
    user_id: user.id,
    name: habit.name,
    completed: habit.completed,
    days: habit.days, 
    time: habit.time   
  });

  if (error) console.error("Error al guardar en DB:", error.message);
};

// NUEVA FUNCIÓN: Actualizar hábito
export const updateHabitInDb = async (habitId: string, name: string, days: string[], time: string) => {
  const { error } = await supabase
    .from('habits')
    .update({ name, days, time })
    .eq('id', habitId);

  if (error) console.error("Error al actualizar en DB:", error.message);
};

export const toggleHabitInDb = async (habitId: string, completed: boolean) => {
  await supabase.from('habits').update({ completed }).eq('id', habitId);
};

export const deleteHabitFromDb = async (habitId: string) => {
  await supabase.from('habits').delete().eq('id', habitId);
};