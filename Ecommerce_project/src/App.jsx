import './App.css'
import {Routes, Route} from 'react-router-dom'
import HomePage from './Pages/HomePage'
import AboutPage from './Pages/AboutPage'
import ContactPage from './Pages/ContactPage'
import PolicyPage from './Pages/PolicyPage'
import Pagenotfound from './Pages/Pagenotfound'
import RegisterPage from './Pages/RegisterPage'
import LoginPage from './Pages/LoginPage'
import {Toaster} from 'react-hot-toast'
import Dashboard from './Pages/Dashboard'
import PrivateRoute from './Route/PrivateRoute'
import ForgotPassword from './Pages/ForgotPassword'
import AdminRoute from './Route/AdminRoute'
import AdminDashboard from './Pages/AdminDashboard'
import CreateCategory from './Components/CreateCategory'
import CreateProduct from './Components/CreateProduct'
import UserProfile from './Components/UserProfile'
import UserOrders from './Components/UserOrders'
import Productcomp from './Components/Productcomp'
import Updateproduct_desc from './Pages/Updateproduct_desc'
import Search from './Pages/Search'
import ProductDetails from './Pages/ProductDetails'
import Categories from './Pages/Categories'
import CategoryProduct from './Pages/CategoryProduct'
import CartPage from './Pages/CartPage'
import AdminOrders from './Components/AdminOrders'
// import dotenv from 'dotenv'

function App() {

  // dotenv.config();

  return (
    <>
    <Toaster/>
  <Routes>
    <Route exact path='/' element={<HomePage/>}/>
    <Route exact path='/product/:slug' element={<ProductDetails/>}/>
    <Route exact path='/categories' element={<Categories/>}/>
    <Route exact path='/cart' element={<CartPage/>}/>
    <Route exact path='/category/:slug' element={<CategoryProduct/>}/>
    <Route exact path='/search' element={<Search/>}/>
    <Route exact path='/ForgotPassword' element={<ForgotPassword/>}/>
    <Route exact path='/about' element={<AboutPage/>}/>
    <Route path = '/Dashboard' element={<PrivateRoute/>}>
    <Route path='user' element={<Dashboard/>}/>
    <Route path='user/profile' element={<UserProfile/>}/>
    <Route path='user/orders' element={<UserOrders/>}/>
    </Route>
    {/* "/dashboard/admin/products" */}
    <Route path = '/Dashboard' element={<AdminRoute/>}>
    <Route path='admin' element={<AdminDashboard/>}/>
    <Route path='admin/create-category' element={<CreateCategory/>}/>
    <Route path='admin/products' element={<Productcomp/>}/>
    <Route path='admin/create-product' element={<CreateProduct/>}/>
    <Route path='admin/update-products/:slug' element={<Updateproduct_desc/>}/>
    <Route path='admin/users' element={<CreateProduct/>}/>
    <Route path='admin/orders' element={<AdminOrders/>}/>
    </Route>
    <Route exact path='/contact' element={<ContactPage/>}/>
    <Route exact path='/policy' element={<PolicyPage/>}/>
    <Route exact path='/*' element={<Pagenotfound/>}/>
    <Route exact path='/register' element={<RegisterPage/>}/>
    <Route exact path='/login' element={<LoginPage/>}/>
  </Routes>

    </>
  )
}


export default App
