"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NuevaComidaPage() {

  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [mealType, setMealType] = useState("Desayuno");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Saludable");
  const [origin, setOrigin] = useState("Casero");

  const [together, setTogether] =
    useState(false);

  const router = useRouter();

  const activeUser =
    localStorage.getItem("activeUser");

  const handleSubmit = (e: React.FormEvent) => {

    e.preventDefault();

    const newMeal = {
      id: Date.now(),
      date,
      mealType,
      description,
      status: status.toLowerCase(),
      origin,
      person: together
        ? "Ambos"
        : activeUser,
    };

    const existingMeals = JSON.parse(
      localStorage.getItem("meals") || "[]"
    );

    localStorage.setItem(
      "meals",
      JSON.stringify([
        ...existingMeals,
        newMeal,
      ])
    );

    router.push("/comidas");
  };

  return (
    <main className="mx-auto max-w-md p-4">

      <div>

        <h1 className="text-3xl font-bold">
          Nueva comida 🍽️
        </h1>

        <p className="mt-1 text-gray-500">
          Registrar comida
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
              onChange={(e) =>
                setDate(e.target.value)
              }
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4 outline-none transition focus:border-pink-300"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700">
              Tipo de comida
            </label>

            <select
              value={mealType}
              onChange={(e) =>
                setMealType(e.target.value)
              }
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4 outline-none transition focus:border-pink-300"
            >
              <option>Desayuno</option>
              <option>Almuerzo</option>
              <option>Merienda</option>
              <option>Cena</option>
            </select>

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700">
              Descripción
            </label>

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              placeholder="¿Qué comieron?"
              className="min-h-[140px] w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4 outline-none transition focus:border-pink-300"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700">
              Estado
            </label>

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4 outline-none transition focus:border-pink-300"
            >
              <option>Saludable</option>
              <option>Parcial</option>
              <option>No saludable</option>
            </select>

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700">
              Origen
            </label>

            <select
              value={origin}
              onChange={(e) =>
                setOrigin(e.target.value)
              }
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4 outline-none transition focus:border-pink-300"
            >
              <option>Casero</option>
              <option>Delivery</option>
              <option>Restaurant</option>
              <option>Comprado</option>
            </select>

          </div>

          <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-gray-50 p-4">

            <div>

              <p className="font-medium">
                ¿Comieron juntos?
              </p>

              <p className="text-sm text-gray-500">
                Esto aparecerá en ambos calendarios
              </p>

            </div>

            <button
              type="button"
              onClick={() =>
                setTogether(!together)
              }
              className={`h-7 w-12 rounded-full transition ${
                together
                  ? "bg-pink-500"
                  : "bg-gray-300"
              }`}
            >

              <div
                className={`h-5 w-5 rounded-full bg-white transition ${
                  together
                    ? "translate-x-6"
                    : "translate-x-1"
                }`}
              />

            </button>

          </div>

          <button className="w-full rounded-2xl bg-black py-4 text-lg font-semibold text-white transition active:scale-[0.98]">
            Guardar comida
          </button>

        </form>

      </div>

    </main>
  );
}