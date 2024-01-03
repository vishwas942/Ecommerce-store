import { Link } from "react-router-dom"
import Layout from "../Components/Layout"

const Pagenotfound = () => {
  return (
    <>
     <Layout>
        <div className="d-flex flex-column justify-content-center align-items-center m-3">
     <h1>404: Page not found</h1>   
     <Link to="/" className="btn btn-dark" >Go back</Link>
     </div>
    </Layout> 
    </>
  )
}

export default Pagenotfound
