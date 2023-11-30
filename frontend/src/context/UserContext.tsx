// useAppUser.js

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppUserContextProps {
    role: string | null;
    updateUser: (newUser: any) => void;
}

const AppUserContext = createContext<AppUserContextProps | undefined>(undefined);

interface AppUserProviderProps {
    children: ReactNode;
}

export const AppUserProvider: React.FC<AppUserProviderProps> = ({ children }) => {
    const [role, setRole] = useState<string | null>(null);

    const updateUser = (newUser: any) => {
        setRole(newUser?.role || null);
    };

    return <AppUserContext.Provider value={{ role, updateUser }}>{children}</AppUserContext.Provider>;
};

export const useAppUser = () => {
    const context = useContext(AppUserContext);

    if (!context) {
        throw new Error('useAppUser must be used within an AppUserProvider');
    }

    return context;
};
