import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Segmented control to switch between the adopter and shelter signup pages.
 * `active` is "seeker" or "shelter".
 */
const AccountTypeToggle = ({ active }) => {
    const navigate = useNavigate();

    const base =
        "flex-1 text-center text-sm sm:text-base font-semibold py-2.5 rounded-lg transition duration-200";
    const on = "bg-white text-primary shadow-sm";
    const off = "text-text/60 hover:text-text";

    return (
        <div className="flex gap-1 p-1 bg-background rounded-xl mb-6">
            <button
                type="button"
                onClick={() => active !== "seeker" && navigate("/signup/seeker/")}
                className={`${base} ${active === "seeker" ? on : off}`}
            >
                I'm adopting
            </button>
            <button
                type="button"
                onClick={() => active !== "shelter" && navigate("/signup/shelter/")}
                className={`${base} ${active === "shelter" ? on : off}`}
            >
                I'm a shelter
            </button>
        </div>
    );
};

export default AccountTypeToggle;
