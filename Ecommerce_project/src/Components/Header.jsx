import { NavLink, Link } from "react-router-dom"
import { useAuth } from "../Context/AuthContext"
// import userModel from "../../../Backend/Models/userModel";
import toast from "react-hot-toast";
import SearchInput from "./SearchInput";
import useCategory from "../hooks/useCategory";
import { useCart } from "../Context/CartContext";

const Header = () => {

  const [auth, setauth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  const handleLogout =()=>{
      setauth({
        ...auth,
        user:null,
        token:""
      })
      localStorage.removeItem('auth')
      toast.success("Logout successfully!!")
  }

  return (
    <>
     <nav className="navbar navbar-expand-lg navbar-light" style={{"backgroundColor":"silver"}} >
  <div className="container-fluid">
    <Link className="navbar-brand" aria-current="page" to='/'>MyStore</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <SearchInput/>
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="/">HOME</NavLink>
        </li>

         <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" to={`/categories`} id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            CATEGORIES
          </Link>
          <ul className="dropdown-menu" >
            <li>
            <Link className="dropdown-item" to='/categories'>All Categories</Link>
          {categories.map((c)=>(
            <Link className="dropdown-item" key={c._id} to={`/category/${c.slug}`}>{c.cName}</Link>
            ))}
            </li>
           </ul>
          
           
          
        </li>
    { !auth.user ?(<>
      <li className="nav-item">
      <NavLink className="nav-link" aria-current="page" to="/login">LOGIN</NavLink>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link" aria-current="page" to="/register">REGISTER</NavLink>
    </li>
    </>
    ) : (<>

<li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" to="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            {auth?.user?.Name}
          </Link>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li> <NavLink className="nav-link" aria-current="page" to={`/Dashboard/${auth?.user?.Role === 1 ? 'admin' : 'user'}`}>DASHBOARD</NavLink></li>
            <li> <NavLink className="nav-link" onClick={handleLogout} aria-current="page" to="/login">LOGOUT</NavLink></li>
            {/* <li><Link className="dropdown-item" to="/">Something else here</Link></li> */}
          </ul>
        </li>

    </>)  }


        
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="/cart">CART ({cart?.length}) </NavLink>
        </li>
        
      </ul>
      {/* <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form> */}
    </div>
  </div>
</nav>   
    </>
  )
}

export default Header
