"use client";

import { useEffect, useState } from "react";

import SummaryCard from "@/components/home/SummaryCard";
import MealCard from "@/components/home/MealCard";

export default function HomePage() {

  const [user, setUser] = useState("");

  const [meals, setMeals] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {

    const activeUser =
      localStorage.getItem("activeUser") || "";

    setUser(activeUser);

    const storedMeals = JSON.parse(
      localStorage.getItem("meals") || "[]"
    );

    const storedActivities = JSON.parse(
      localStorage.getItem("activities") || "[]"
    );

    const filteredMeals =
      storedMeals.filter((meal: any) => {

        return (
          meal.person === activeUser ||
          meal.person === "Ambos"
        );
      });

    const filteredActivities =
      storedActivities.filter(
        (activity: any) =>
          activity.person === activeUser
      );

    setMeals(filteredMeals);
    setActivities(filteredActivities);

  }, []);

  const healthyMeals = meals.filter(
    (meal) => meal.status === "saludable"
  ).length;

  const healthyPercentage =
    meals.length === 0
      ? 0
      : Math.round(
          (healthyMeals / meals.length) * 100
        );

  return (
    <main className="mx-auto max-w-md p-4">

      <div>

        <h1 className="text-3xl font-bold">
          Hola {user} 👋
        </h1>

        <p className="mt-1 text-gray-500">
          Resumen de hoy
        </p>

      </div>

      <section className="mt-8 grid grid-cols-2 gap-4">

        <SummaryCard
          title="% saludable"
          value={`${healthyPercentage}%`}
          subtitle="Comidas saludables"
        />

        <SummaryCard
          title="Comidas"
          value={String(meals.length)}
          subtitle="Registradas"
        />

        <SummaryCard
          title="Entrenamientos"
          value={String(activities.length)}
          subtitle="Registrados"
        />

        <SummaryCard
          title="Estado"
          value={
            healthyPercentage >= 70
              ? "😄"
              : healthyPercentage >= 40
              ? "🙂"
              : "💪"
          }
          subtitle="Semana actual"
        />

      </section>

      <section className="mt-10">

        <h2 className="text-2xl font-bold">
          Últimas comidas
        </h2>

        <div className="mt-5 space-y-4">

          {meals.length === 0 && (

            <div className="rounded-3xl border border-gray-200 bg-white p-5 text-gray-500">

              No hay comidas registradas 🍽️

            </div>

          )}

          {meals.slice(0, 3).map((meal) => (

            <MealCard
              key={meal.id}
              mealType={meal.mealType}
              description={meal.description}
              status={meal.status}
              origin={meal.origin}
              together={
                meal.person === "Ambos"
                  ? "Juntos"
                  : "Separados"
              }
            />

          ))}

        </div>

      </section>

    </main>
  );
}