import React, { createContext, useContext, useEffect, useState } from 'react';
import supabase from '../services/supabase';

export const AuthProvider = ({ children }) => {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const authContext = createContext({
    user: null,
    session: null,
});

export const useProvideAuth = () => {
    const [userSession, setUserSession] = useState();
    const [user, setUser] = useState();

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUserSession(session);
            setUser(session?.user ?? null);
        });

        const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
            setUserSession(session);
            setUser(session?.user ?? null);
        });

        return () => {
            authListener.subscription;
        };
    }, []);

    return { userSession, user };
};

export const useAuth = () => {
    const context = useContext(authContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a AuthContextProvider.');
    }
    return context;
};
