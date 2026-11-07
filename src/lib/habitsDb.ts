import { supabase } from './supabase';

export const fetchHabitsFromDb = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];
  const { data, error } = await supabase.from('habits').select('*').eq('user_id', user.id);
  if (error) return [];
  return data;
};

export const addHabitToDb = async (habit: { id: string, name: string, completed: boolean, days: string[], time: string }) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;
  await supabase.from('habits').insert({ id: habit.id, user_id: user.id, name: habit.name, completed: habit.completed, days: habit.days, time: habit.time });
};

export const updateHabitInDb = async (habitId: string, name: string, days: string[], time: string) => {
  await supabase.from('habits').update({ name, days, time }).eq('id', habitId);
};

export const toggleHabitInDb = async (habitId: string, completed: boolean) => {
  await supabase.from('habits').update({ completed }).eq('id', habitId);
};

export const deleteHabitFromDb = async (habitId: string) => {
  await supabase.from('habits').delete().eq('id', habitId);
};

export const fetchProfileFromDb = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single();
  if (error && error.code === 'PGRST116') {
    const { data: newProfile } = await supabase.from('profiles').insert({ id: user.id }).select().single();
    return newProfile;
  }
  return data;
};

// ACTUALIZADO: Ahora recibe y guarda el historial de emociones y las misiones
export const syncProfileToDb = async (
  coins: number, 
  garden: any, 
  inventory: string[], 
  streak: number, 
  lastLoginDate: string | null,
  moodHistory: any[],
  completedMissions: string[]
) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from('profiles').update({
    coins,
    garden,
    inventory,
    streak,
    last_login_date: lastLoginDate,
    mood_history: moodHistory,
    completed_missions: completedMissions,
    updated_at: new Date().toISOString()
  }).eq('id', user.id);
};