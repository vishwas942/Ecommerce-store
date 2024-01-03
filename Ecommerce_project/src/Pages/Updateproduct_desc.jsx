import { useState, useEffect } from "react";
import Layout from "../Components/Layout";
import AdminMenu from "../Components/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;


const Updateproduct_desc = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [categories, setCategories] = useState([]);
    const [Name, setName] = useState("");
    const [Description, setDescription] = useState("");
    const [Price, setPrice] = useState("");
    const [Category, setCategory] = useState("");
    const [Quantity, setQuantity] = useState("");
    const [Shipping, setShipping] = useState("");
    const [Image, setPhoto] = useState("");
    const [id, setId] = useState("");
  
    //get single product
    const getSingleProduct = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API}/api/product/single-product/${params.slug}`
        );
        setName(data.Product.Name);
        setId(data.Product._id);
        setDescription(data.Product.Description);
        setPrice(data.Product.Price);
        setQuantity(data.Product.Quantity);
        setShipping(data.Product.Shipping);
        setCategory(data.Product.Category._id);
      } catch (error) {
        console.log(error);
      }
    };
    
    //get all category
    const getAllCategory = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API}/api/category/get-categories`);
        if (data?.success) {
          setCategories(data?.Category);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something wwent wrong in getting catgeory");
      }
    };
  
    useEffect(() => {
      getSingleProduct();
      getAllCategory();
      //eslint-disable-next-line
    }, []);
  
    //Update product function
    const handleUpdate = async (e) => {
      e.preventDefault();
      try {
        const productData = new FormData();
        productData.append("Name", Name);
        productData.append("Description", Description);
        productData.append("Price", Price);
        productData.append("Quantity", Quantity);
        Image && productData.append("Image", Image);
        productData.append("Category", Category);
        const { data } =  axios.put(
          `${import.meta.env.VITE_API}/api/product/update-product/${id}`,
          productData
        );
        if (data?.success) {
          toast.error(data?.message);
        } else {
          toast.success("Product Updated Successfully");
          navigate("/dashboard/admin/products");
        }

        
      } catch (error) {
        console.log(error);
        toast.error("something went wrong");
      }
    };
  
    //delete a product
    const handleDelete = async () => {
      try {
        let answer = window.prompt("Are You Sure want to delete this product ? ");
        if (!answer) return;
        // eslint-disable-next-line no-unused-vars
        const { data } = await axios.delete(
          `${import.meta.env.VITE_API}/api/product/delete-product/${id}`
        );
        toast.success("Product Deleted Succfully");
        navigate("/dashboard/admin/products");
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    };
    return (
      <Layout title={"Dashboard - Update Product"}>
        <div className="container-fluid m-3 p-3">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <h1>Update Product</h1>
              <div className="m-1 w-75">
                <Select
                  bordered={false}
                  placeholder="Select a category"
                  size="large"
                  showSearch
                  className="form-control mb-3"
                  onChange={(value) => {
                    setCategory(value);
                  }}
                  value={Category}
                >
                  {categories?.map((c) => (
                    <Option key={c._id} value={c._id}>
                      {c.cName}
                    </Option>
                  ))}
                </Select>
                <div className="mb-3">
                  <label className="btn btn-outline-secondary col-md-12">
                    {Image ? Image.Name : "Upload Photo"}
                    <input
                      type="file"
                      name="Image"
                      accept="image/*"
                      onChange={(e) => setPhoto(e.target.files[0])}
                      hidden
                    />
                  </label>
                </div>
                <div className="mb-3">
                  {Image ? (
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(Image)}
                        alt="product_photo"
                        height={"200px"}
                        className="img img-responsive"
                      />
                    </div>
                  ) : (
                    <div className="text-center">
                      <img
                        src={`${import.meta.env.VITE_API}/api/product/product-Image/${id}`}
                        alt="product_photo"
                        height={"200px"}
                        className="img img-responsive"
                      />
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={Name}
                    placeholder="write a name"
                    className="form-control"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    type="text"
                    value={Description}
                    placeholder="write a description"
                    className="form-control"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
  
                <div className="mb-3">
                  <input
                    type="number"
                    value={Price}
                    placeholder="write a Price"
                    className="form-control"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    value={Quantity}
                    placeholder="write a quantity"
                    className="form-control"
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <Select
                    bordered={false}
                    placeholder="Select Shipping "
                    size="large"
                    showSearch
                    className="form-control mb-3"
                    onChange={(value) => {
                      setShipping(value);
                    }}
                    value={Shipping ? "yes" : "No"}
                  >
                    <Option value="0">No</Option>
                    <Option value="1">Yes</Option>
                  </Select>
                </div>
                <div className="mb-3">
                  <button className="btn btn-primary" onClick={handleUpdate}>
                    UPDATE PRODUCT
                  </button>
                </div>
                <div className="mb-3">
                  <button className="btn btn-danger" onClick={handleDelete}>
                    DELETE PRODUCT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  };

export default Updateproduct_desc


