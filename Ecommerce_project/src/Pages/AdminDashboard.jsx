
import AdminMenu from "../Components/AdminMenu"
import Layout from "../Components/Layout"
import { useAuth } from "../Context/AuthContext"


const AdminDashboard = () => {

    const [auth] = useAuth()

  return (
    <>
    <Layout>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3"><AdminMenu /></div>
                <div className="col-md-9">
                    <div className="card w-75 p-3">
                        <h6 className="display-6" >{auth?.user?.Name}</h6>
                    </div>
                </div>
            </div>
        </div>
        </Layout>
    </>
  )
}

export default AdminDashboard
