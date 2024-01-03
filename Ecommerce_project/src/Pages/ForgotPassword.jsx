import Layout from "../Components/Layout"
import { useState } from "react"
import {toast} from 'react-hot-toast'
// import { useAuth } from "../Context/AuthContext"
import axios from 'axios'
import {  useNavigate } from "react-router-dom"


const ForgotPassword = () => {

const [Email,setEmail] = useState("");
const [Question,setQuestion] = useState("");
const [newPassword,setnewPassword] = useState("");


const Navigate = useNavigate();

const handleSubmit = async (e)=>{
    e.preventDefault();
    
    try {
        // eslint-disable-next-line no-undef
        const res = await axios.post(`${import.meta.env.VITE_API}/api/auth/forgotPassword`,{Email,Question,newPassword});
        if(res.data.success){
            toast.success("Password Changed successfully!!");
            Navigate("/login");
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
    <Layout title="Shopkar | Forgot Password" > 
        <div className="register">
    <div className="text-center mb-3 fs-5">Forgot Password</div>
     <form className="login_form" onSubmit={handleSubmit} >
     
  <div className="mb-3 w-100">
    <input type="email" name="Email" className="form-control"  onChange={(e)=>{
        setEmail(e.target.value)
    }} id="exampleInputEmail1" value={Email} aria-describedby="emailHelp" required placeholder="Email"/>
  </div>
  <div className="mb-3 w-100">
    <input type="text" name="Question" className="form-control"  onChange={(e)=>{
        setQuestion(e.target.value)
    }} id="exampleInputEmail1" value={Question} aria-describedby="emailHelp" required placeholder="Your Favourite color?"/>
  </div>
  <div className="mb-3 w-100">
    <input type="password" name="newPassword" autoComplete="on" className="form-control"  onChange={(e)=>{
        setnewPassword(e.target.value)
    }} id="exampleInputPassword1" value={newPassword} placeholder="New Password" required/>
  </div>
  <button type="submit" className="btn btn-dark w-100">Reset Password</button>
</form> 
</div>
</Layout>
    </>
  )
}

export default ForgotPassword
