type ActivityCardProps = {
  id?: number;
  person: string;
  activity: string;
  notes?: string;
  onDelete?: (id: number) => void;
};

export default function ActivityCard({
  id,
  person,
  activity,
  notes,
  onDelete,
}: ActivityCardProps) {

  const personStyles = {
    Leandro: "bg-blue-100 text-blue-700",
    Amalia: "bg-purple-100 text-purple-700",
  };

  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">

      <div className="flex items-start justify-between">

        <div>
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              personStyles[
                person as keyof typeof personStyles
              ]
            }`}
          >
            {person}
          </span>

          <h3 className="mt-3 text-xl font-semibold">
            {activity}
          </h3>

          {notes && (
            <p className="mt-2 text-gray-500">
              {notes}
            </p>
          )}
        </div>

        {onDelete && id && (
          <button
            onClick={() => onDelete(id)}
            className="text-sm text-red-500"
          >
            Eliminar
          </button>
        )}

      </div>

    </div>
  );
}