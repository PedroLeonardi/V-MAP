'use client';
import React from 'react';

// card genérico para mostrar dados no painel (ícone + título + descrição + valor)
export default function DashboardCard({
    icon,
    title,
    value,
    description,
    onClick,
    color = "text-sky-500",
    action = false // se for clicável
}) {
    // pega a cor base e a tonalidade (ex: text-sky-500 → sky e 500)
    let corPrincipal = 'sky';
    let tomCor = '500';

    if (color.startsWith('text-')) {
        const partes = color.split('-');
        if (partes.length >= 2) corPrincipal = partes[1];
        if (partes.length >= 3) tomCor = partes[2];
    }

    // classes base do card (aparência geral)
    const estiloCard = `
  relative group
  flex flex-col items-center justify-start
  bg-gradient-to-br from-slate-700 via-slate-800 to-${corPrincipal}-${tomCor}/20
  w-full sm:w-60 md:w-64
  min-h-[200px] sm:min-h-[220px]
  p-4 pt-14 sm:pt-16
  rounded-xl 
  border border-slate-700 border-l-4 border-l-sky-500
  shadow-[0_4px_10px_rgba(0,0,0,0.2),_0_1px_3px_rgba(0,0,0,0.1)] shadow-sky-500/30
  transition-all duration-300 ease-out
  text-center
`;





    // efeitos se for clicável
    const estiloClickavel = action ? `
    cursor-pointer
    hover:transform hover:-translate-y-1.5
    hover:shadow-xl hover:shadow-${corPrincipal}-${tomCor}/30
    focus:outline-none focus:ring-2 focus:ring-${corPrincipal}-${tomCor} focus:ring-offset-2 focus:ring-offset-slate-800
  ` : '';

    // estilo do círculo onde vai o ícone
    const estiloIconeContainer = `
    absolute -top-6 sm:-top-7 left-1/2 -translate-x-1/2
    flex items-center justify-center
    w-16 h-16 sm:w-[70px] sm:h-[70px]
    rounded-full
    bg-slate-700
    border-2 border-slate-600
    shadow-lg
    transition-all duration-300 ease-out
    group-hover:bg-${corPrincipal}-${tomCor}
    group-hover:border-${corPrincipal}-${parseInt(tomCor) < 600 ? (parseInt(tomCor) + 100).toString() : tomCor}
  `;

    // estilo do ícone em si
    const estiloIcone = `
    transition-colors duration-300
    ${action || value !== undefined ? `group-hover:text-white ${color}` : `text-slate-300 group-hover:${color}`}
  `;

    return (
        <div
            className={`${estiloCard} ${estiloClickavel}`}
            onClick={action ? onClick : undefined}
            role={action ? "button" : undefined}
            tabIndex={action ? 0 : undefined}
            onKeyDown={action && onClick ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick();
                }
            } : undefined}
        >
            {/* icone redondinho no topo do card */}
            {icon && (
                <div className={estiloIconeContainer}>
                    {React.cloneElement(icon, {
                        className: `${icon.props.className || ''} ${estiloIcone}`.trim(),
                        size: icon.props.size || 30
                    })}
                </div>
            )}

            {/* título, descrição e valor */}
            <div className="flex flex-col items-center w-full h-full">
                <h3 className="text-md sm:text-lg font-extrabold text-slate-100 mb-1 leading-tight mt-1">{title}</h3>

                {description && (
                    <p className="text-xs font-bold text-slate-400 mb-2 px-1 leading-snug flex-grow">
                        {description}
                    </p>
                )}

                {value !== undefined && (
                    <span className={`text-2xl sm:text-3xl font-bold ${color} mt-auto`}>
                        {value}
                    </span>
                )}
            </div>
        </div>
    );
}
