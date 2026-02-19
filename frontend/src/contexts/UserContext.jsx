import { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext({
    id: -1,
    setId: () => {},
});

export const useUserContext = () => {
    const [id, setId] = useState(-1);

    return {
        id, setId,
    };
}