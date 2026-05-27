type MealCardProps = {
  id?: number;
  mealType: string;
  description: string;
  status: string;
  origin: string;
  together?: string;
  onDelete?: (id: number) => void;
};

export default function MealCard({
  id,
  mealType,
  description,
  status,
  origin,
  together,
  onDelete,
}: MealCardProps) {

  const statusColor =
    status === "saludable"
      ? "bg-green-100 text-green-700"
      : status === "parcial"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">

      <div className="flex items-start justify-between gap-3">

        <div>

          <p className="text-sm text-gray-500">
            {mealType}
          </p>

          <h3 className="mt-1 text-lg font-semibold">
            {description}
          </h3>

        </div>

        <div className="flex flex-col items-end gap-2">

          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${statusColor}`}
          >
            {status}
          </span>

          {together && (

            <span className="rounded-full bg-pink-100 px-3 py-1 text-xs font-medium text-pink-600">
              {together}
            </span>

          )}

        </div>

      </div>

      <div className="mt-5 flex items-center justify-between">

        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
          {origin}
        </span>

        {onDelete && id && (

          <button
            onClick={() =>
              onDelete(id)
            }
            className="text-sm font-medium text-red-500"
          >
            Eliminar
          </button>

        )}

      </div>

    </div>
  );
}