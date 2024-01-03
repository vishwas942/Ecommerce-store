import Layout from "../Components/Layout"
import { useState } from "react"
import {toast} from 'react-hot-toast'
import { useAuth } from "../Context/AuthContext"
import axios from 'axios'
import { Link, useNavigate, useLocation } from "react-router-dom"


const LoginPage = () => {

const [Email,setEmail] = useState("");
const [Password,setPassword] = useState("");
const [auth,setauth] = useAuth();

const Location = useLocation();
const Navigate = useNavigate();

const handleSubmit = async (e)=>{
    e.preventDefault();
    
    try {
        // eslint-disable-next-line no-undef
        const res = await axios.post(`${import.meta.env.VITE_API}/api/auth/login`,{Email,Password});
        // const json = await res.json();
        if(res && res.data.success){
          setauth({
            ...auth,
            user:res.data.user,
            token:res.data.token
          })
          localStorage.setItem('auth', JSON.stringify(res.data));
          Navigate(Location.state || "/");
            toast.success("Login successfully!!");
        }else{
            toast.error(res.data.message);
        }
    } catch (error) {
        console.log(error);
        toast.error("Something went wrong!!")
    }
}

  return (
    <>
    <Layout title="Shopkar | Login Page" > 
        <div className="register">
    <div className="text-center mb-3 fs-5">Login Form</div>
     <form className="login_form" onSubmit={handleSubmit} >
     
  <div className="mb-3 w-100">
    <input type="email" name="Email" className="form-control"  onChange={(e)=>{
        setEmail(e.target.value)
    }} id="exampleInputEmail1" value={Email} aria-describedby="emailHelp" required placeholder="Email"/>
  </div>
  <div className="mb-3 w-100">
    <input type="password" name="Password" autoComplete="on" className="form-control"  onChange={(e)=>{
        setPassword(e.target.value)
    }} id="exampleInputPassword1" value={Password} placeholder="Password" required/>
  </div>
  <button type="submit" className="btn btn-dark w-100">Login</button>
  <Link className="m-2" to="/ForgotPassword">Forgot Password?</Link>
</form> 
</div>
</Layout>
    </>
  )
}

export default LoginPage
