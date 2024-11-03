import * as React from "react";
import { useExerciseStore } from "../../stores/exerciseStore";

export function HomeScreen({ navigation }) {
  const { exercises, streak, totalMinutesPracticed } = useExerciseStore();

  const motivationalQuotes = [
    "Take care of your eyes, they never get a day off.",
    "Your vision is your future, protect it.",
    "Good eyesight is a gift, nurture it daily."
  ];

  const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  return (
    <scrollView className="bg-blue-50">
      <stackLayout className="p-4 space-y-4">
        <label className="text-2xl font-bold text-center text-blue-900">
          Welcome to Eye Care Pro
        </label>

        <gridLayout className="bg-white p-4 rounded-lg shadow-md" rows="auto, auto" columns="*, *">
          <label row="0" col="0" className="text-lg font-bold text-blue-700">
            Streak: {streak} days
          </label>
          <label row="0" col="1" className="text-lg font-bold text-blue-700">
            Total: {totalMinutesPracticed} mins
          </label>
          <label row="1" col="0" colSpan="2" className="text-sm text-gray-600 mt-2">
            {randomQuote}
          </label>
        </gridLayout>

        <label className="text-xl font-bold text-blue-900 mt-4">
          Today's Exercises
        </label>

        {exercises.map((exercise) => (
          <gridLayout
            key={exercise.id}
            className="bg-white p-4 rounded-lg shadow-md"
            onTap={() => navigation.navigate("Exercise", { exercise })}
          >
            <stackLayout>
              <label className="text-lg font-bold text-blue-800">
                {exercise.title}
              </label>
              <label className="text-sm text-gray-600">
                Duration: {exercise.duration} seconds
              </label>
              <label className="text-sm text-gray-600">
                {exercise.description}
              </label>
            </stackLayout>
          </gridLayout>
        ))}
      </stackLayout>
    </scrollView>
  );
}