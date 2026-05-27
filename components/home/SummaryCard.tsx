type SummaryCardProps = {
  title: string;
  value: string;
  subtitle: string;
};

export default function SummaryCard({
  title,
  value,
  subtitle,
}: SummaryCardProps) {
  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm border border-gray-100">
      <p className="text-sm font-medium text-gray-500">
        {title}
      </p>

      <h2 className="mt-3 text-4xl font-bold tracking-tight">
        {value}
      </h2>

      <p className="mt-2 text-sm text-gray-400">
        {subtitle}
      </p>
    </div>
  );
}