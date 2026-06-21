import React from 'react';

/** Full-width primary button used across the auth pages. */
const AuthButton = ({ children, ...props }) => {
    return (
        <button
            {...props}
            className="w-full rounded-xl bg-primary text-white font-semibold text-base sm:text-lg py-3.5
                       hover:bg-accent-200 active:scale-[0.99] duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {children}
        </button>
    );
};

export default AuthButton;
