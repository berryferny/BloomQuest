import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfileFromDb } from '../lib/habitsDb';
import { supabase } from '../lib/supabase';
import { setProfile } from '../store/habitsSlice';

export default function SyncWatcher() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const isFirstRun = useRef(true);

  const { 
    coins, garden, seedInventory, streak, lastLoginDate, 
    completedMissions, moodHistory 
  } = useSelector((state: any) => state.habits);

  // 1. Cargar datos
  useEffect(() => {
    const loadProfile = async () => {
      const dbProfile = await fetchProfileFromDb();
      if (dbProfile) {
        dispatch(setProfile(dbProfile));
      }
      setIsLoaded(true); 
    };
    loadProfile();
  }, [dispatch]);

  // 2. Guardar datos
  useEffect(() => {
    if (!isLoaded) return; // No guardar hasta que cargue

    if (isFirstRun.current) {
      isFirstRun.current = false;
      return; // Evita guardar justo al inicio
    }

    const save = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from('profiles').update({
          coins, garden, inventory: seedInventory, streak, 
          last_login_date: lastLoginDate, completed_missions: completedMissions, mood_history: moodHistory
        }).eq('id', user.id);
      }
    };
    save();
  }, [isLoaded, coins, garden, seedInventory, streak, lastLoginDate, completedMissions, moodHistory]);

  return null;
}