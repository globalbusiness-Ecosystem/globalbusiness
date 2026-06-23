'use client';

export function StatsBar() {
  const stats = [
    { label: 'Properties', value: '45,230' },
    { label: 'Countries', value: '195' },
    { label: 'Investors', value: '128,540' },
    { label: 'Volume', value: '$2.4B' },
  ];

  return (
    <div className="w-full bg-black border-t border-b border-yellow-600">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 py-8">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <span className="text-yellow-500 font-semibold text-sm mb-2">
              {stat.label}
            </span>
            <span className="text-white font-bold text-2xl md:text-3xl">
              {stat.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
