"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import ActivityCard from "@/components/home/ActivityCard";

export default function ActividadPage() {

  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    const storedActivities = JSON.parse(
      localStorage.getItem("activities") || "[]"
    );

    setActivities(storedActivities);
  }, []);

  const handleDeleteActivity = (id: number) => {

    const updatedActivities = activities.filter(
      (activity) => activity.id !== id
    );

    setActivities(updatedActivities);

    localStorage.setItem(
      "activities",
      JSON.stringify(updatedActivities)
    );
  };

  return (
    <main className="mx-auto max-w-md p-4">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Actividad 🏋️
          </h1>

          <p className="mt-1 text-gray-500">
            Actividad física diaria
          </p>
        </div>

        <Link
          href="/actividad/nueva"
          className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white"
        >
          + Agregar
        </Link>

      </div>

      <div className="mt-6 space-y-4">

        {activities.length === 0 ? (

          <div className="rounded-3xl border border-dashed border-gray-200 bg-white p-8 text-center shadow-sm">

            <p className="text-gray-500">
              Todavía no registraron actividades
            </p>

            <p className="mt-2 text-sm text-gray-400">
              Empezá agregando una actividad ✨
            </p>

          </div>

        ) : (

          activities.map((activity) => (
            <ActivityCard
              key={activity.id}
              id={activity.id}
              person={activity.person}
              activity={activity.activity}
              notes={activity.notes}
              onDelete={handleDeleteActivity}
            />
          ))

        )}

      </div>

    </main>
  );
}