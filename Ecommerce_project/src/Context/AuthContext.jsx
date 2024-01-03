import { useState, useEffect,useContext, createContext } from "react";
import PropTypes from 'prop-types';
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({children})=>{
    const[auth, setauth] = useState({
        user:null,
        token:""
    })

    axios.defaults.headers.common["Authorization"] = auth?.token

    useEffect(()=>{
        const data = localStorage.getItem('auth');
        if(data){
            const parseData = JSON.parse(data);
            setauth({
                ...auth,
                user:parseData.user,
                token:parseData.token,
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return (
        <AuthContext.Provider value={[auth, setauth]} >
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = ()=> useContext(AuthContext)

// eslint-disable-next-line react-refresh/only-export-components
export {useAuth, AuthProvider}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
}  