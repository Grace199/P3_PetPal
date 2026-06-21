import React, { useState } from 'react';
import FieldError from '../FieldError';

/**
 * Styled <select> matching the AuthField look (same border/focus, inline error).
 * The placeholder option doubles as the label; text is greyed until the user
 * picks a value. Works with the same name/onChange the signup forms already use.
 */
const AuthSelect = ({ label, error, className = "", children, onChange, ...props }) => {
    const [hasValue, setHasValue] = useState(false);

    const handleChange = (e) => {
        setHasValue(e.target.value !== "");
        if (onChange) onChange(e);
    };

    return (
        <div className={className}>
            <div className="relative">
                <select
                    {...props}
                    defaultValue=""
                    onChange={handleChange}
                    className={`peer w-full h-14 appearance-none rounded-xl border border-light-gray bg-white px-4 pr-10 text-base
                               focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition
                               ${hasValue ? "text-text" : "text-text/50"}`}
                >
                    <option value="" disabled>{label}</option>
                    {children}
                </select>
                <i className="uil uil-angle-down pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text/50 text-lg"></i>
            </div>
            <FieldError fielderror={error} />
        </div>
    );
};

export default AuthSelect;
