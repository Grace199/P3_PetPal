import React from 'react';
import FieldError from '../FieldError';

/**
 * Labeled input with a true floating label (animates on focus / when filled)
 * and inline error display. Uses the `peer` + placeholder trick so it works
 * for both controlled and uncontrolled inputs.
 */
const AuthField = ({ label, error, className = "", ...props }) => {
    return (
        <div className={className}>
            <div className="relative">
                <input
                    {...props}
                    placeholder=" "
                    className="peer w-full h-14 rounded-xl border border-light-gray bg-white px-4 pt-5 text-base text-text
                               focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
                />
                <label
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 origin-left text-text/50 text-base transition-transform duration-150 ease-out
                               peer-focus:-translate-y-[1.45rem] peer-focus:scale-[0.7] peer-focus:text-primary
                               peer-[:not(:placeholder-shown)]:-translate-y-[1.45rem] peer-[:not(:placeholder-shown)]:scale-[0.7]"
                >
                    {label}
                </label>
            </div>
            <FieldError fielderror={error} />
        </div>
    );
};

export default AuthField;
