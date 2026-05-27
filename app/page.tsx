"use client";

import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();

  const handleSelectUser = (
    user: string
  ) => {

    localStorage.setItem(
      "activeUser",
      user
    );

    router.push("/home");
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-6">

      <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-sm border border-gray-100">

        <div className="text-center">

          <h1 className="text-4xl font-bold">
            Wellness 💖
          </h1>

          <p className="mt-3 text-gray-500">
            ¿Quién está usando la app?
          </p>

        </div>

        <div className="mt-10 space-y-4">

          <button
            onClick={() =>
              handleSelectUser("Amalia")
            }
            className="w-full rounded-2xl bg-pink-500 py-4 text-lg font-semibold text-white transition active:scale-95"
          >
            Amalia
          </button>

          <button
            onClick={() =>
              handleSelectUser("Leandro")
            }
            className="w-full rounded-2xl bg-black py-4 text-lg font-semibold text-white transition active:scale-95"
          >
            Leandro
          </button>

        </div>

      </div>

    </main>
  );
}