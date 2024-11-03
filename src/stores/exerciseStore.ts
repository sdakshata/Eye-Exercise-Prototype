import { create } from 'zustand';

interface Exercise {
  id: string;
  title: string;
  duration: number;
  videoUrl: string;
  description: string;
}

interface ExerciseState {
  exercises: Exercise[];
  streak: number;
  totalMinutesPracticed: number;
  updateStreak: () => void;
  addPracticeTime: (minutes: number) => void;
}

export const useExerciseStore = create<ExerciseState>((set) => ({
  exercises: [
    {
      id: '1',
      title: 'Eye Rolling',
      duration: 60,
      videoUrl: 'https://example.com/eye-rolling.mp4',
      description: 'Roll your eyes clockwise and counterclockwise to reduce strain'
    },
    {
      id: '2',
      title: 'Focus Shifting',
      duration: 120,
      videoUrl: 'https://example.com/focus-shifting.mp4',
      description: 'Shift focus between near and far objects'
    }
  ],
  streak: 0,
  totalMinutesPracticed: 0,
  updateStreak: () => set((state) => ({ streak: state.streak + 1 })),
  addPracticeTime: (minutes) => set((state) => ({ 
    totalMinutesPracticed: state.totalMinutesPracticed + minutes 
  })),
}));