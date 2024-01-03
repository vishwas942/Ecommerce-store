import axios from "axios";
import { useAuth } from "../Context/AuthContext"
import { useState, useEffect } from 'react'
import { Outlet } from "react-router-dom";
import Spinner from "./Spinner";


const PrivateRoute = () => {

    // eslint-disable-next-line no-unused-vars
    const[auth,setauth] = useAuth();
    const[ok, setok] = useState(false)

    useEffect( ()=>{
        const authCheck = async () =>{
            const res =  await axios.get(`${import.meta.env.VITE_API}/api/auth/userDashboard`,
            {headers:{
                Authorization:auth?.token
            }}
        )
        if(res.data.ok){
            setok(true)
        }else{
            setok(false)
        }
        } 
        if(auth?.token){
            authCheck()
        }
    },[auth?.token])

  return ok ? <Outlet/> : <Spinner/>
}

export default PrivateRoute
