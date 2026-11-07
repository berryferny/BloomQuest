import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from '../store/habitsSlice';

export default function AchievementWatcher() {
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state.habits);
  
  const notifiedAchievements = useRef<string[]>([]);

  useEffect(() => {
    // Ponemos seguros (|| []) por si los datos vienen undefined de la memoria vieja
    const habits = state.habits || [];
    const garden = state.garden || [];
    const completedMissions = state.completedMissions || [];
    const moodHistory = state.moodHistory || [];
    const seedInventory = state.seedInventory || [];
    const coins = state.coins || 0;
    const streak = state.streak || 0;

    const plantsInGarden = garden.filter((p: any) => p !== null).length;
    const bloomedPlants = garden.filter((p: any) => p !== null && p.isBloomed).length;

    const currentBadges = [
      { id: 'b1', title: 'Primer paso', current: habits.length, target: 1 },
      { id: 'b2', title: 'Jardín vivo', current: plantsInGarden, target: 1 },
      { id: 'b3', title: 'Misión cumplida', current: completedMissions.length, target: 1 },
      { id: 'b4', title: 'Autoconocimiento', current: moodHistory.length, target: 1 },
      { id: 'b5', title: 'En racha', current: streak, target: 3 },
      { id: 'b6', title: 'Ahorrador', current: coins, target: 150 },
      { id: 'b7', title: 'Creador de rutinas', current: habits.length, target: 5 },
      { id: 'b8', title: 'Primera floración', current: bloomedPlants, target: 1 },
      { id: 'b9', title: 'Semana perfecta', current: streak, target: 7 },
      { id: 'b10', title: 'Diario emocional', current: moodHistory.length, target: 5 },
      { id: 's1', title: 'Pulgar verde', current: plantsInGarden, target: 6 },
      { id: 's2', title: 'Magnate', current: coins, target: 500 },
      { id: 's3', title: 'El coleccionista', current: seedInventory.length, target: 5 },
    ];

    currentBadges.forEach((badge) => {
      const isUnlocked = badge.current >= badge.target;
      const wasNotified = notifiedAchievements.current.includes(badge.id);

      if (isUnlocked && !wasNotified) {
        dispatch(showToast(`🏆 ¡Logro desbloqueado: ${badge.title}!`));
        notifiedAchievements.current.push(badge.id);
      }
    });
  }, [state, dispatch]);

  return null;
}