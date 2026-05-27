"use client";

import { useEffect, useState } from "react";

import SummaryCard from "@/components/home/SummaryCard";
import CalendarDay from "@/components/home/CalendarDay";

export default function ProgresoPage() {

  const [healthyMeals, setHealthyMeals] = useState(0);
  const [totalMeals, setTotalMeals] = useState(0);
  const [activities, setActivities] = useState(0);

  const [streak, setStreak] = useState(0);

  const [calendarDays, setCalendarDays] = useState<any[]>([]);

  const [selectedDay, setSelectedDay] =
    useState<number | null>(null);

  const [activeUser, setActiveUser] =
    useState("");

  const today = new Date();

  const [currentMonth, setCurrentMonth] =
    useState(today.getMonth() + 1);

  const [currentYear, setCurrentYear] =
    useState(today.getFullYear());

  const [meals, setMeals] =
    useState<any[]>([]);

  const [storedActivities, setStoredActivities] =
    useState<any[]>([]);

  useEffect(() => {

    const user =
      localStorage.getItem("activeUser") || "";

    setActiveUser(user);

    const allMeals = JSON.parse(
      localStorage.getItem("meals") || "[]"
    );

    const filteredMeals = allMeals.filter(
      (meal: any) =>
        meal.person === user ||
        meal.person === "Ambos"
    );

    setMeals(filteredMeals);

    const allActivities = JSON.parse(
      localStorage.getItem("activities") || "[]"
    );

    const filteredActivities =
      allActivities.filter(
        (activity: any) =>
          activity.person === user
      );

    setStoredActivities(filteredActivities);

    setTotalMeals(filteredMeals.length);

    const healthyCount = filteredMeals.filter(
      (meal: any) =>
        meal.status === "saludable"
    ).length;

    setHealthyMeals(healthyCount);

    setActivities(filteredActivities.length);

    generateCalendar(
      filteredMeals,
      currentMonth,
      currentYear
    );

  }, []);

  useEffect(() => {

    generateCalendar(
      meals,
      currentMonth,
      currentYear
    );

  }, [currentMonth, currentYear]);

  const calculateStreak = (
  calendar: any[]
) => {

  const validDays = calendar.filter(
    (day) =>
      day.status !== "empty"
  );

  let currentStreak = 0;

  for (
    let i = validDays.length - 1;
    i >= 0;
    i--
  ) {

    if (
      validDays[i].status ===
      "good"
    ) {
      currentStreak++;
    } else {
      break;
    }

  }

  setStreak(currentStreak);
};

  const generateCalendar = (
    meals: any[],
    month: number,
    year: number
  ) => {

    const days = [];

    const totalDays = new Date(
      year,
      month,
      0
    ).getDate();

    for (
      let day = 1;
      day <= totalDays;
      day++
    ) {

      const formattedMonth =
        String(month).padStart(2, "0");

      const formattedDay =
        String(day).padStart(2, "0");

      const currentDate =
        `${year}-${formattedMonth}-${formattedDay}`;

      const mealsOfDay = meals.filter(
        (meal: any) =>
          meal.date === currentDate
      );

      if (
        mealsOfDay.length === 0
      ) {

        days.push({
          day,
          status: "empty",
        });

        continue;
      }

      let totalPoints = 0;

      mealsOfDay.forEach(
        (meal: any) => {

          if (
            meal.status ===
            "saludable"
          ) {
            totalPoints += 2;
          }

          if (
            meal.status ===
            "parcial"
          ) {
            totalPoints += 1;
          }

        }
      );

      const maxPoints =
        mealsOfDay.length * 2;

      const percentage =
        (totalPoints / maxPoints) * 100;

      let status:
        | "good"
        | "medium"
        | "bad"
        | "empty" = "bad";

      if (percentage >= 70) {
        status = "good";
      } else if (percentage >= 40) {
        status = "medium";
      }

      days.push({
        day,
        status,
      });

    }

    setCalendarDays(days);

    calculateStreak(days);
  };

  const healthyPercentage =
    totalMeals === 0
      ? 0
      : Math.round(
          (healthyMeals / totalMeals) * 100
        );

  const selectedDate =
    selectedDay !== null
      ? `${currentYear}-${String(
          currentMonth
        ).padStart(2, "0")}-${String(
          selectedDay
        ).padStart(2, "0")}`
      : null;

  const mealsOfSelectedDay =
    meals.filter(
      (meal) =>
        meal.date === selectedDate
    );

  const activitiesOfSelectedDay =
    storedActivities.filter(
      (activity) =>
        activity.date === selectedDate
    );

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  return (
    <main className="mx-auto max-w-md p-4">

      <div>

        <h1 className="text-3xl font-bold">
          Progreso 📈
        </h1>

        <p className="mt-1 text-gray-500">
          {activeUser}
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
          value={String(totalMeals)}
          subtitle="Registradas"
        />

        <SummaryCard
          title="🔥 Streak"
          value={String(streak)}
          subtitle="Días seguidos"
        />

        <SummaryCard
          title="Entrenamientos"
          value={String(activities)}
          subtitle="Registrados"
        />

      </section>

      <section className="mt-10">

        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">

          <h2 className="text-xl font-semibold">
            Estado general
          </h2>

          <p className="mt-4 leading-relaxed text-gray-600">

            {healthyPercentage >= 70
              ? "Muy buena semana 😄"
              : healthyPercentage >= 40
              ? "Semana balanceada 🙂"
              : "Hay margen para mejorar 💪"}

          </p>

        </div>

      </section>

      <section className="mt-10">

        <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <button
              onClick={() => {

                if (currentMonth === 1) {

                  setCurrentMonth(12);

                  setCurrentYear(
                    currentYear - 1
                  );

                } else {

                  setCurrentMonth(
                    currentMonth - 1
                  );

                }

              }}
              className="rounded-full bg-gray-100 px-3 py-2 text-sm"
            >
              ←
            </button>

            <div className="text-center">

              <h2 className="text-xl font-semibold">
                Calendario
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {
                  monthNames[
                    currentMonth - 1
                  ]
                }{" "}
                {currentYear}
              </p>

            </div>

            <button
              onClick={() => {

                if (currentMonth === 12) {

                  setCurrentMonth(1);

                  setCurrentYear(
                    currentYear + 1
                  );

                } else {

                  setCurrentMonth(
                    currentMonth + 1
                  );

                }

              }}
              className="rounded-full bg-gray-100 px-3 py-2 text-sm"
            >
              →
            </button>

          </div>

          <div className="mt-6">

            <div className="mb-3 grid grid-cols-7 text-center text-xs font-medium text-gray-400">

              <p>L</p>
              <p>M</p>
              <p>M</p>
              <p>J</p>
              <p>V</p>
              <p>S</p>
              <p>D</p>

            </div>

            <div className="grid grid-cols-7 gap-2">

  {Array.from({
    length:
      new Date(
        currentYear,
        currentMonth - 1,
        1
      ).getDay() === 0
        ? 6
        : new Date(
            currentYear,
            currentMonth - 1,
            1
          ).getDay() - 1,
  }).map((_, index) => (

    <div
      key={`empty-${index}`}
    />

  ))}

  {calendarDays.map(
    (dayItem) => (

      <CalendarDay
        key={dayItem.day}
        day={dayItem.day}
        status={dayItem.status}
        isSelected={
          selectedDay ===
          dayItem.day
        }
        onClick={() =>
          setSelectedDay(
            dayItem.day
          )
        }
      />

    )
  )}

</div>

            <div className="mt-6 flex flex-wrap gap-3 text-xs text-gray-500">

              <div className="flex items-center gap-2">

                <div className="h-3 w-3 rounded-full bg-green-200" />

                Saludable

              </div>

              <div className="flex items-center gap-2">

                <div className="h-3 w-3 rounded-full bg-yellow-200" />

                Balanceado

              </div>

              <div className="flex items-center gap-2">

                <div className="h-3 w-3 rounded-full bg-red-200" />

                Flojo

              </div>

            </div>

          </div>

        </div>

      </section>

      {selectedDay && (

        <section className="mt-10">

          <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">

            <h2 className="text-xl font-semibold">

              {selectedDay} de{" "}

              {
                monthNames[
                  currentMonth - 1
                ]
              }

            </h2>

            <div className="mt-6 space-y-4">

              {mealsOfSelectedDay.length ===
                0 &&
                activitiesOfSelectedDay.length ===
                  0 && (

                  <p className="text-gray-500">
                    No hay registros
                  </p>

                )}

              {mealsOfSelectedDay.map(
                (meal) => (

                  <div
                    key={meal.id}
                    className="rounded-2xl bg-gray-50 p-4"
                  >

                    <p className="text-sm text-gray-500">
                      🍽️{" "}
                      {meal.mealType}
                    </p>

                    <p className="mt-1 font-medium">
                      {
                        meal.description
                      }
                    </p>

                  </div>

                )
              )}

              {activitiesOfSelectedDay.map(
                (activity) => (

                  <div
                    key={activity.id}
                    className="rounded-2xl bg-gray-50 p-4"
                  >

                    <p className="text-sm text-gray-500">
                      🏋️{" "}
                      {activity.person}
                    </p>

                    <p className="mt-1 font-medium">
                      {
                        activity.activity
                      }
                    </p>

                  </div>

                )
              )}

            </div>

          </div>

        </section>

      )}

    </main>
  );
}