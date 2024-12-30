import { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext();

const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
};

const initialState = {
    user: null,
    isAuthenticated: false,
    error: "",
}

function reducer(state, action) {
    switch (action.type) {
        case 'login':
            return { ...state, user: action.payload, isAuthenticated: true, error: null };
        case 'logout':
            return { ...state, user: null, isAuthenticated: false, error: null };
        case 'error':
            return { ...state, error: action.payload, isAuthenticated: false };
        default:
            throw new Error(`Action type ${action.type} is not supported.`);
    }
}

function AuthProvider({ children }) {
    const [{ user, isAuthenticated, error }, dispatch] = useReducer(reducer, initialState);

    function login(email, password) {
        if (email === FAKE_USER.email && password === FAKE_USER.password) {
            dispatch({ type: 'login', payload: FAKE_USER });
        } else {
            dispatch({ type: 'error', payload: 'Invalid email or password' });
        }
    }

    function logout() {
        dispatch({ type: 'logout' });
    }

    function resetError() {
        dispatch({ type: 'error', payload: "" });
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, error, login, logout, resetError }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('AuthContext must be used within an AuthProvider');
    }
    return context;
}

export { AuthProvider, useAuth };