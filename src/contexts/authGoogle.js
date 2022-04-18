import { useState, createContext, useEffect } from "react";
import { Redirect } from "react-router-dom";

export const AuthGoogleContext = createContext("");

const AuthGoogleProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadStorageData = () => {
            const storageUser = sessionStorage.getItem("@AuthFirebase:user");
            const storageToken = sessionStorage.getItem("@AuthFirebase:token");
            if (storageToken && storageUser) {
                setUser(storageUser);
            }
        };
        loadStorageData();
    });

    const signInGoogle = (user, token) => {
        sessionStorage.setItem("@AuthFirebase:token", token);
        sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user));
        setUser(user)

    }

    const signOut = () => {
        sessionStorage.clear();
        setUser(null);
        return <Redirect to="/" />;
    }

    return (
        <AuthGoogleContext.Provider
            value={{
                signed: !!user,
                user,
                signInGoogle,
                signOut,
            }}
        >
            {children}
        </AuthGoogleContext.Provider>
    );
};

export default AuthGoogleProvider
