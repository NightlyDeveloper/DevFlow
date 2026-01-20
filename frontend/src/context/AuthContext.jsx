import React, {useState, useEffect, createContext, useContext } from 'react';
import api from '../lib/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({children})=>{
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);
    const [team, setTeam] = useState(null);

    useEffect(()=>{
        
        const checkUser = async ()=>{
            if(token){
                api.defaults.headers.common['x-auth-token'] = token;
                try{
                    const res = await api.get('/auth/');
                    setUser(res.data.user);
                    setTeam(res.data.team);
                }catch(error){
                    console.log("Auth check failed: ", error);
                    logout();
                }
            }
            setLoading(false);
        }

        checkUser();
    }, [token])

    const login = (newToken) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
    }

    const logout = ()=> {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{user, team, login, logout, loading, isAuthenticated: !!user}} >
            {!loading && children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => useContext(AuthContext);