import * as React from "react";
import { useExerciseStore } from "../../stores/exerciseStore";

export function ExerciseScreen({ route }) {
  const { exercise } = route.params;
  const { addPracticeTime, updateStreak } = useExerciseStore();
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState(exercise.duration);

  React.useEffect(() => {
    let timer;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      addPracticeTime(Math.floor(exercise.duration / 60));
      updateStreak();
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  return (
    <stackLayout className="h-full bg-blue-50 p-4">
      <label className="text-2xl font-bold text-center text-blue-900 mb-4">
        {exercise.title}
      </label>

      <gridLayout className="bg-white p-6 rounded-lg shadow-md mb-4">
        <stackLayout>
          <label className="text-lg text-center text-blue-800">
            Time Remaining: {timeLeft}s
          </label>
          <label className="text-sm text-gray-600 mt-2">
            {exercise.description}
          </label>
        </stackLayout>
      </gridLayout>

      <button
        className={`p-4 rounded-lg shadow-md ${
          isPlaying ? 'bg-red-500' : 'bg-green-500'
        } text-white`}
        onTap={() => setIsPlaying(!isPlaying)}
      >
        {isPlaying ? 'Pause Exercise' : 'Start Exercise'}
      </button>
    </stackLayout>
  );
}