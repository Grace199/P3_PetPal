import { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext({
    id: -1,
    setId: () => { },
});

function readUserId() {
    const raw = localStorage.getItem("userID");
    const n = raw ? Number(raw) : -1;
    return Number.isFinite(n) ? n : -1;
}

export const useUserContext = () => {
    // Lazy init: runs once on first render
    const [id, setId] = useState(() => readUserId());

    return { id, setId };
};