import React from 'react';

const buttonVariants = (variant: 'primary' | 'secondary' | 'ghost' | 'destructive' | 'link' = 'primary', size: 'default' | 'sm' | 'lg' | 'icon' = 'default') => {
    const base = "inline-flex items-center justify-center rounded-full text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    const variants: { [key: string]: string } = {
        primary: "bg-sky-500 text-white hover:bg-sky-600 shadow-sm",
        secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
        destructive: "bg-rose-500 text-white hover:bg-rose-600",
        ghost: "hover:bg-slate-100 hover:text-slate-900",
        link: "text-sky-600 underline-offset-4 hover:underline",
    };

    const sizes: { [key: string]: string } = {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
    };

    return `${base} ${variants[variant]} ${sizes[size]}`;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'destructive' | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, ...props }, ref) => {
        return (
            <button
                className={`${buttonVariants(variant, size)} ${className}`}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = 'Button';

export default Button;
