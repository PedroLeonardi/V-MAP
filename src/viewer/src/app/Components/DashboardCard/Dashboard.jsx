'use client';

export default function DashboardCard({
    icon,
    title,
    value,
    description,
    onClick,
    color = "text-blue-500",
    action = false
}) {
    const cardClasses = `
    flex flex-col items-center justify-center
    bg-slate-800 text-blue
    w-full sm:w-64 p-5
    h-full
    shadow-xl rounded-2xl
    transition-all duration-300 ease-in-out
    ${action ? 'hover:bg-slate-700 hover:scale-[1.03] cursor-pointer' : ''}
    border-l-4 ${color.replace('text-', 'border-')}
  `;

    return (
        <div className={cardClasses} onClick={onClick}>
            <div className={`mb-3 p-3 rounded-full bg-slate-700 ${action ? color : 'text-gray-400'}`}>
                {icon}
            </div>
            <h2 className="text-lg font-semibold mb-1 text-center">{title}</h2>
            {value !== undefined && (
                <span className={`text-3xl font-bold ${color}`}>{value}</span>
            )}
            {description && (
                <p className="text-xs text-gray-400 mt-1 text-center">{description}</p>
            )}
        </div>
    );
}
