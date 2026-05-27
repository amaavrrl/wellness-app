"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import MealCard from "@/components/home/MealCard";

export default function ComidasPage() {

  const [meals, setMeals] = useState<any[]>([]);

  useEffect(() => {
    const storedMeals = JSON.parse(
      localStorage.getItem("meals") || "[]"
    );

    setMeals(storedMeals);
  }, []);

  const handleDeleteMeal = (id: number) => {

    const updatedMeals = meals.filter(
      (meal) => meal.id !== id
    );

    setMeals(updatedMeals);

    localStorage.setItem(
      "meals",
      JSON.stringify(updatedMeals)
    );
  };

  return (
    <main className="mx-auto max-w-md p-4">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Comidas 🍽️
          </h1>

          <p className="mt-1 text-gray-500">
            Miércoles 29 de mayo
          </p>
        </div>

        <Link
          href="/comidas/nueva"
          className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white"
        >
          + Agregar
        </Link>
      </div>

      <div className="mt-6 space-y-4">

        {meals.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-8 text-center">
            <p className="text-gray-500">
              No hay comidas registradas 🍽️
            </p>

            <p className="mt-2 text-sm text-gray-400">
              Agregá tu primera comida
            </p>
          </div>
        ) : (
          meals.map((meal) => (
            <MealCard
              key={meal.id}
              id={meal.id}
              mealType={meal.mealType}
              description={meal.description}
              status={meal.status}
              origin={meal.origin}
              together={
  meal.person === "Ambos"
    ? "Juntos"
    : ""
}
              onDelete={handleDeleteMeal}
            />
          ))
        )}

      </div>

    </main>
  );
}