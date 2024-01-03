import Layout from "./Layout"
import { useState, useEffect } from "react"
import axios from "axios"
import toast from 'react-hot-toast'
import AdminMenu from "./AdminMenu"
import { useNavigate } from "react-router-dom"


const Productcomp = () => {

    
    const [product, setProducts] =  useState([]);

    const getallProducts = async () =>{
            try {
                const {data}  = await axios.get(`${import.meta.env.VITE_API}/api/product/get-products`);
                setProducts(data.Products);
            } catch (error) {
                console.log(error);
                toast.error("Something went wrong");
            }
    }

    useEffect(()=>{
        getallProducts();
    },[]);

    const Navigate = useNavigate();
 


  return (
    <>
     <Layout title={"Dashboard - Create Product"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">

 Product List



<div className="row m-0">
            {/* {product.map((p) => (
              <Link style={{"color":"black" , "textDecoration":"none"}}
                key={p._id}
                to={`/dashboard/admin/products/${p.slug}`}
                className="product-link"
              >
                <div className="card m-2" style={{ "width":"18rem" }}>
                  <img
                    src={`${import.meta.env.VITE_API}/api/product/product-Image/${p._id}`}
                    className="card-img-top"
                    alt={p.Name}
                  />
                  <div className="card-body">
                    <h5 className="card-title ">{p.Name}</h5>
                    <p className="card-text">{p.Description}</p>
                  </div>
                </div>
              </Link>
            ))} */}
          



        {product.map((p) => (
          <div  key={p._id} >
        <div className='d-flex flex-column align-items-center m-0' >
      <div className="card mt-3 w-75"  style={{"cursor":"pointer"}} onClick= {()=> {
            Navigate(`/dashboard/admin/update-products/${p.slug}`)
    }}>
  <div className="row g-0">
    <div className="col-md-4">
      <img src={`${import.meta.env.VITE_API}/api/product/product-Image/${p._id}`} className="img-fluid rounded-start" alt={p.Name}/>
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <h5 className="card-title">{p.Name}</h5>
        <p className="card-text">{p.Description}</p>
        <p className="card-text">$ {p.Price}</p>
      </div>
    </div>
  </div>
</div>
</div>
    </div>
    ))}
</div>

</div>

            </div>
           </div>
    </Layout>
    </>
  )}


  

export default Productcomp
