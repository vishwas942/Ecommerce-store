// import React from 'react'
import AdminMenu from "./AdminMenu"
import Layout from "./Layout"
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;


const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [Name, setName] = useState("");
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState("");
  const [Category, setCategory] = useState("");
  const [Quantity, setQuantity] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [Shipping, setShipping] = useState("");
  const [Image, setPhoto] = useState("");


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
    getAllCategory();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("Name", Name);
      productData.append("Description", Description);
      productData.append("Price", Price);
      productData.append("Quantity", Quantity);
      productData.append("Image", Image);
      productData.append("Category", Category);
      const { data } = axios.post(
        `${import.meta.env.VITE_API}/api/product/create-product`,
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };


  return (
    <>
    <Layout title={"Dashboard - Create Product"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">

Create Product
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
              >

                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.cName}
                  </Option>
                ))}
                
              </Select>


              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {Image ? Image.name : "Upload Photo"}
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
                {Image && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(Image)}
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
                >
                   <Option value="0">No</Option>
                   <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreate}>
                  CREATE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
</>
  )
}

export default CreateProduct
