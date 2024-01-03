import {useState, useEffect} from 'react'
import Layout from '../Components/Layout'
import toast from 'react-hot-toast'
import axios from 'axios'
import Categoryformpage from '../Pages/Categoryformpage'
import AdminMenu from './AdminMenu'
import {Modal} from 'antd'

const CreateCategory = () => {

  const [categories, setCategories] = useState([]);
  const [cName, setName] = useState('');
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const handleSubmit = async() =>{
      try {
        const {data2} = await axios.post(`${import.meta.env.VITE_API}/api/category/create-category`, {cName},);
        if(data2?.success){
          toast.success(`${cName} is created successfully`);
          getAllCategories();
      }else{
        toast.error('something went wrong')
      }
      } catch (error) {
        console.log(error)
        toast.error('Something went wrong in input form');
      }
  }

  const getAllCategories = async() =>{
      try {
        const {data} = await axios.get(`${import.meta.env.VITE_API}/api/category/get-categories`);
        if(data.success){
          setCategories(data.Category);
        }
      } catch (error) {
        console.log(error);
        toast.error('Something went wrong in getting categories')
      }
  }

useEffect(()=>{
      getAllCategories();
},[])


const handleUpdate = async (e) => {
  e.preventDefault();
  try {
    const { data } = await axios.put(
      `${import.meta.env.VITE_API}/api/category/update-category/${selected._id}`,
      { cName: updatedName }
    );
    if (data?.success) {
      toast.success(`${updatedName} is updated`);
      setSelected(null);
      setUpdatedName("");
      setVisible(false);
      getAllCategories();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);
  }
};


const handleDelete = async (pId) => {
  try {
    const { data } = await axios.delete(
      `${import.meta.env.VITE_API}/api/category/delete-category/${pId}`
    );
    if (data.success) {
      toast.success(`category is deleted`);

      getAllCategories();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error("Somtihing went wrong");
  }
};



  return (
    <>
    <Layout title = 'Dashboard - Create Category' >

      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">

              <AdminMenu/>

          </div>
          <div className="col-md-9">

Manage Category
<div className="p-3 w-50">
<Categoryformpage handleSubmit={handleSubmit} value={cName} setValue={setName} /></div>
<div>
<table className="table">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
      {categories.map(c =>(
        <>
    <tr>
        <td key={c._id} >{c.cName}</td>
        <td><button className='btn btn-primary' onClick={() => {
                              setVisible(true);
                              setUpdatedName(c.name);
                              setSelected(c);
                            }}>Edit</button>
                            <button
                            className="btn btn-danger ms-2"
                            onClick={() => {
                              handleDelete(c._id);
                            }}
                          >
                            Delete
                          </button>
                            </td>
    </tr>
        </>
      ))}
   
  </tbody>
</table>
</div>
<Modal
              onCancel={() => setVisible(false)}
              footer={null}
              visible={visible}
            >
              <Categoryformpage
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
</div>

        </div>

      </div>

    </Layout>
      
    </>
  )
}

export default CreateCategory
