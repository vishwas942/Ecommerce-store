import Layout from "../Components/Layout"
import UserMenu from "../Components/UserMenu"
import { useAuth } from "../Context/AuthContext"


const Dashboard = () => {

  const [auth] = useAuth();

  return (
    <>
   
    <Layout>
        <div className="container-fluid mt-3">
            <div className="row">
                <div className="col-md-3"><UserMenu/></div>
                <div className="col-md-9">
                    <div className="card w-75 p-3">
                        <h3>Name : {auth?.user?.Name}</h3>
                        <h3>Email : {auth?.user?.Email}</h3>
                    </div>
                </div>
            </div>
        </div>
        </Layout>
    </>
    
  )
}

export default Dashboard
