"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NuevaActividadPage() {

  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [person, setPerson] = useState("Leandro");
  const [activity, setActivity] = useState("Gimnasio");
  const [notes, setNotes] = useState("");

  const router = useRouter();

  const leandroActivities = [
    "Gimnasio",
    "Beach voley - entrenamiento",
    "Beach voley - jugar/partido",
    "Beach voley - competencia",
    "Descanso",
    "Otro",
  ];

  const amaliaActivities = [
    "Pilates de matt",
    "Calistenia/funcional",
    "Descanso",
    "Otro",
  ];

  const activities =
    person === "Leandro"
      ? leandroActivities
      : amaliaActivities;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newActivity = {
      id: Date.now(),
      date,
      person,
      activity,
      notes,
    };

    const existingActivities = JSON.parse(
      localStorage.getItem("activities") || "[]"
    );

    localStorage.setItem(
      "activities",
      JSON.stringify([
        ...existingActivities,
        newActivity,
      ])
    );

    router.push("/actividad");
  };

  return (
    <main className="mx-auto max-w-md p-4">

      <div>
        <h1 className="text-3xl font-bold">
          Nueva actividad 🏋️
        </h1>

        <p className="mt-1 text-gray-500">
          Registrar entrenamiento
        </p>
      </div>

      <div className="mt-8 rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Fecha
            </label>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4 outline-none transition focus:border-pink-300"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Persona
            </label>

            <select
              value={person}
              onChange={(e) => {
                setPerson(e.target.value);

                if (e.target.value === "Leandro") {
                  setActivity("Gimnasio");
                } else {
                  setActivity("Pilates de matt");
                }
              }}
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4 outline-none transition focus:border-pink-300"
            >
              <option>Leandro</option>
              <option>Amalia</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Actividad
            </label>

            <select
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4 outline-none transition focus:border-pink-300"
            >
              {activities.map((activityOption) => (
                <option
                  key={activityOption}
                >
                  {activityOption}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Notas
            </label>

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Opcional"
              className="min-h-[140px] w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4 outline-none transition focus:border-pink-300"
            />
          </div>

          <button className="w-full rounded-2xl bg-black py-4 text-lg font-semibold text-white transition active:scale-[0.98]">
            Guardar actividad
          </button>

        </form>

      </div>

    </main>
  );
}