/* eslint-disable react/prop-types */
import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"


const Spinner = ({path="login"}) => {

    const Navigate = useNavigate();
    const Location = useLocation(); 

    const[count, setcount] = useState(5);

    useEffect(()=>{
        const interval = setInterval(() => {
            setcount((prevValue) => --prevValue) 
        }, 1000);
        count===0  && Navigate(`/${path}`, {
            state: Location.pathname,
        })  
        return ()=>{
            clearInterval(interval)
        }
    },[count, Navigate, Location, path])

  return (
    <>
     <div className="d-flex flex-column justify-content-center align-items-center" 
     style={{"height":"100vh"}}
     >
    <div className="text-center display-6 m-4">Redirecting in {count}</div>
  <div className="spinner-border" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div> 
    </>
  )
}

export default Spinner
