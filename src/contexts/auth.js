import { onAuthStateChanged } from "firebase/auth";
import { useState, createContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { auth } from "../services/firebaseConfig";

export const AuthContext = createContext("");

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadStorageData = () => {
            const storageUser = sessionStorage.getItem("@AuthFirebase:user");
            const storageToken = sessionStorage.getItem("@AuthFirebase:token");
            if (storageToken && storageUser) {
                setUser(JSON.parse(storageUser));
            }
        };

        const checkUserIdentity = () => {
            onAuthStateChanged(auth, (user) => {
                if (user) {

                    // ...
                } else {
                    // User is signed out
                    // ...
                }
            })
        }
        checkUserIdentity()
        loadStorageData();
    }, []);



    const signIn = (user, token) => {
        sessionStorage.setItem("@AuthFirebase:token", token);
        sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user));
        setUser(user)

    }

    const signOut = () => {
        auth.signOut()
        .then(rsp => { 
            sessionStorage.clear();
            setUser(null);
            return <Redirect to="/login" /> 
        })
        .catch(e => { 
            return false;
        });
    }

    return (
        <AuthContext.Provider
            value={{
                signed: !!user,
                user,
                signIn,
                signOut
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider
