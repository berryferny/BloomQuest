import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfileFromDb } from '../lib/habitsDb';
import { supabase } from '../lib/supabase';
import { setProfile } from '../store/habitsSlice';

export default function SyncWatcher() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  
  // EXTRAEMOS TODO MENOS moodHistory
  const { 
    coins, garden, seedInventory, streak, lastLoginDate, completedMissions 
  } = useSelector((state: any) => state.habits);

  // 1. Cargar los datos de Supabase al abrir la app
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

  // 2. Guardar Monedas, Jardín y Misiones
  useEffect(() => {
    if (isLoaded && coins !== undefined) {
      const syncOtherData = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          await supabase.from('profiles').update({
            coins, 
            garden, 
            inventory: seedInventory, 
            streak, 
            last_login_date: lastLoginDate, 
            completed_missions: completedMissions
          }).eq('id', user.id);
        }
      };
      syncOtherData();
    }
  }, [isLoaded, coins, garden, seedInventory, streak, lastLoginDate, completedMissions]);

  return null;
}