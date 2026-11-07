import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfileFromDb } from '../lib/habitsDb';
import { setProfile } from '../store/habitsSlice';

export default function SyncWatcher() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const { coins } = useSelector((state: any) => state.habits);

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

  // Ya no hay useEffect que guarde nada aquí.

  return null;
}