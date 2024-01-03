import Layout from "../Components/Layout"
import { useState } from "react"
import {toast} from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from "react-router-dom"


const RegisterPage = () => {

const [Name,setName] = useState("");
const [Email,setEmail] = useState("");
const [Password,setPassword] = useState("");
const [Phone,setPhone] = useState("");
const [Address,setAddress] = useState("");
const [Question, setQuestion] = useState("");

const Navigate = useNavigate();

const handleSubmit = async (e)=>{
    e.preventDefault();
    
    try {
        // eslint-disable-next-line no-undef
        const res = await axios.post(`${import.meta.env.VITE_API}/api/auth/register`,{Name,Email,Password,Phone,Address,Question});
        if(res.data.success){
            toast.success("User Registered successfully!!");
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
    <Layout title="Shopkar | Registration Page" > 
        <div className="register">
    <div className="text-center mb-3 fs-5">Registration Form</div>
     <form className="registration_form" onSubmit={handleSubmit} >
     <div className="mb-3 w-100">
    <input type="Name" name="Name" className="form-control" id="exampleInputName" onChange={(e)=>{
        setName(e.target.value)
    }} value={Name} placeholder="Name" required/>
  </div>
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
  <div className="mb-3 w-100">
    <input type="text" name="Question" className="form-control"  onChange={(e)=>{
        setQuestion(e.target.value)
    }} id="exampleInputPhone" value={Question} placeholder="Favourite Colour as security Question" required/>
  </div>
  <div className="mb-3 w-100">
    <input type="number" name="Phone" className="form-control"  onChange={(e)=>{
        setPhone(e.target.value)
    }} id="exampleInputPhone" value={Phone} placeholder="Phone no." required/>
  </div>
  <div className="mb-3 w-100">
    <input type="address" name="Address" className="form-control"  onChange={(e)=>{
        setAddress(e.target.value)
    }} id="exampleInputAddress" value={Address} placeholder="Address" required/>
  </div>
  <button type="submit" className="btn btn-dark w-100">Register</button>
</form> 
</div>
</Layout>
    </>
  )
}

export default RegisterPage
