const TOKEN_KEY = "@Marea-Token";

const clearLocalStorage = () => {
    localStorage.removeItem(TOKEN_KEY)
}

export const isAuthenticated = () => {
    let token = localStorage.getItem(TOKEN_KEY)

    if (token)
        return true


    clearLocalStorage()
    return false;
}

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const logout = () => clearLocalStorage()
export const login = (token) => localStorage.setItem(TOKEN_KEY, token);