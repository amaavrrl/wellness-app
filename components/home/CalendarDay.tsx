type CalendarDayProps = {
  day: number;
  status: "good" | "medium" | "bad" | "empty";
  isSelected?: boolean;
  onClick?: () => void;
};

export default function CalendarDay({
  day,
  status,
  isSelected,
  onClick,
}: CalendarDayProps) {

  const classes = {
    good:
      "bg-green-200 text-green-900",
    medium:
      "bg-yellow-200 text-yellow-900",
    bad:
      "bg-red-200 text-red-900",
    empty:
      "bg-gray-100 text-gray-400",
  };

  return (
    <button
      onClick={onClick}
      className={`
        flex aspect-square items-center justify-center
        rounded-2xl text-sm font-semibold
        transition active:scale-95
        ${classes[status]}
        ${
          isSelected
            ? "ring-2 ring-black ring-offset-2"
            : ""
        }
      `}
    >
      {day}
    </button>
  );
}