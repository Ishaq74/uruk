import React from 'react';

const badgeVariants = (variant: 'primary' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning' = 'primary') => {
    const variants: { [key: string]: string } = {
        primary: "bg-sky-100 text-sky-800 border-transparent",
        secondary: "bg-slate-100 text-slate-900 border-transparent",
        destructive: "bg-rose-100 text-rose-800 border-transparent",
        success: "bg-emerald-100 text-emerald-800 border-transparent",
        warning: "bg-amber-100 text-amber-800 border-transparent",
        outline: "text-slate-900 border-slate-200",
    };
    return `inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variants[variant]}`;
}

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'primary' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning';
}

const Badge: React.FC<BadgeProps> = ({ className, variant, ...props }) => {
    return (
        <div className={`${badgeVariants(variant)} ${className}`} {...props} />
    );
};

export default Badge;
