import * as React from "react";
import { useAuthStore } from "../../stores/authStore";
import { useExerciseStore } from "../../stores/exerciseStore";

export function ProfileScreen() {
  const { user, logout } = useAuthStore();
  const { streak, totalMinutesPracticed } = useExerciseStore();

  return (
    <stackLayout className="h-full bg-blue-50 p-4">
      <stackLayout className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <label className="text-2xl font-bold text-blue-900">
          {user?.name}
        </label>
        <label className="text-gray-600">
          {user?.email}
        </label>

        <gridLayout rows="auto, auto" columns="*, *" className="mt-4">
          <label row="0" col="0" className="text-lg font-bold text-blue-700">
            Current Streak
          </label>
          <label row="0" col="1" className="text-lg text-right">
            {streak} days
          </label>
          
          <label row="1" col="0" className="text-lg font-bold text-blue-700">
            Total Practice
          </label>
          <label row="1" col="1" className="text-lg text-right">
            {totalMinutesPracticed} mins
          </label>
        </gridLayout>
      </stackLayout>

      <button
        className="bg-red-500 text-white p-4 rounded-lg shadow-md mt-4"
        onTap={logout}
      >
        Sign Out
      </button>
    </stackLayout>
  );
}