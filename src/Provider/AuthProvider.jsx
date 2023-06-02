import { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import app from '../Firebase/firebase.config';
import axios from 'axios';
export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
    const auth = getAuth(app)
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider();

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const LoginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const signInWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }
    const logOut = () => {
        return signOut(auth)
    }
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setUser(user)
            if (user) {
                axios.post('http://localhost:5000/jwt', { email: user.email })
                    .then(data => {
                        console.log(data.data.token);
                        localStorage.setItem('access-token', data.data.token)
                    })

                setLoading(false)
            } else {
                localStorage.removeItem('access-token')
                setLoading(false)
            }
            console.log(user);
        })
        return () => unsubscribe();
    }, [])

    const authInfo = {
        user,
        createUser,
        signInWithGoogle,
        updateUserProfile,
        LoginUser,
        logOut,
        loading
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;