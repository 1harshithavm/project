import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Set auth token
    const setAuthToken = (token) => {
        if (token) {
            axios.defaults.headers.common['x-auth-token'] = token;
            localStorage.setItem('token', token);
        } else {
            delete axios.defaults.headers.common['x-auth-token'];
            localStorage.removeItem('token');
        }
    };

    // Load user
    const loadUser = async () => {
        try {
            const res = await axios.get('/api/auth/user');
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (err) {
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    // Register user
    const register = async (formData) => {
        try {
            const res = await axios.post('/api/auth/register', formData);
            setAuthToken(res.data.token);
            await loadUser();
            navigate('/');
            return { success: true };
        } catch (err) {
            return { 
                success: false, 
                message: err.response?.data?.message || 'Registration failed' 
            };
        }
    };

    // Login user
    const login = async (formData) => {
        try {
            const res = await axios.post('/api/auth/login', formData);
            setAuthToken(res.data.token);
            await loadUser();
            navigate('/');
            return { success: true };
        } catch (err) {
            return { 
                success: false, 
                message: err.response?.data?.message || 'Login failed' 
            };
        }
    };

    // Logout user
    const logout = () => {
        setAuthToken(null);
        setUser(null);
        setIsAuthenticated(false);
        navigate('/login');
    };

    // Initialize auth state
    useEffect(() => {
        if (token) {
            setAuthToken(token);
            loadUser();
        } else {
            setLoading(false);
        }
    }, [token]);

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated,
                loading,
                register,
                login,
                logout,
                loadUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };