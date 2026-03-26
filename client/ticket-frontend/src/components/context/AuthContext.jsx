import { useEffect } from 'react';
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8000/users/me', { credentials: 'include' })
        .then(res => res.ok ? res.json(): null)
        .then(data => {
            if(data){
                setUser(data);
    }
        setLoading(false);
    })
        .catch(() => setLoading(false));
        }, []);

        

    if (loading) return null;

    return (
        <AuthContext.Provider value = {{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    return useContext(AuthContext);
}