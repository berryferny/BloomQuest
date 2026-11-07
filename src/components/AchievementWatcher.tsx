import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from '../store/habitsSlice';

export default function AchievementWatcher() {
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state.habits);
  
  // Usamos useRef para recordar cuáles logros ya avisamos y no spamear
  const notifiedAchievements = useRef<string[]>([]);

  useEffect(() => {
    // Calculamos el estado actual igual que en la pantalla de logros
    const plantsInGarden = state.garden.filter((p: any) => p !== null).length;
    const bloomedPlants = state.garden.filter((p: any) => p !== null && p.isBloomed).length;

    const currentBadges = [
      { id: 'b1', title: 'Primer paso', current: state.habits.length, target: 1 },
      { id: 'b2', title: 'Jardín vivo', current: plantsInGarden, target: 1 },
      { id: 'b3', title: 'Misión cumplida', current: state.completedMissions.length, target: 1 },
      { id: 'b4', title: 'Autoconocimiento', current: state.moodHistory.length, target: 1 },
      { id: 'b5', title: 'En racha', current: state.streak, target: 3 },
      { id: 'b6', title: 'Ahorrador', current: state.coins, target: 150 },
      { id: 'b7', title: 'Creador de rutinas', current: state.habits.length, target: 5 },
      { id: 'b8', title: 'Primera floración', current: bloomedPlants, target: 1 },
      { id: 'b9', title: 'Semana perfecta', current: state.streak, target: 7 },
      { id: 'b10', title: 'Diario emocional', current: state.moodHistory.length, target: 5 },
      { id: 's1', title: 'Pulgar verde', current: plantsInGarden, target: 6 },
      { id: 's2', title: 'Magnate', current: state.coins, target: 500 },
      { id: 's3', title: 'El coleccionista', current: state.seedInventory.length, target: 5 },
    ];

    currentBadges.forEach((badge) => {
      const isUnlocked = badge.current >= badge.target;
      const wasNotified = notifiedAchievements.current.includes(badge.id);

      // Si está desbloqueado y NO lo habíamos notificado, lanzamos el Toast
      if (isUnlocked && !wasNotified) {
        dispatch(showToast(`🏆 ¡Logro desbloqueado: ${badge.title}!`));
        notifiedAchievements.current.push(badge.id);
      }
    });
  }, [state, dispatch]);

  return null; // Este componente no dibuja nada en pantalla, solo vigila
}