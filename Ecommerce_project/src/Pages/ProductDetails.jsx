import { useState, useEffect } from "react";
import Layout from "../Components/Layout";
import { useCart } from "../Context/CartContext";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import '../styles/ProductDetailsStyles.css'

const ProductDetails = () => {
  const params = useParams();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);


  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.slug]);


  
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/product/single-product/${params.slug}`
      );
      setProduct(data?.Product);
      getSimilarProduct(data?.Product._id, data?.Product.Category._id);
    } catch (error) {
      console.log(error);
    }
  };



  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="row container product-details">
        <div className="col-md-6 d-flex justify-content-center">
          <img
            src={`${import.meta.env.VITE_API}/api/product/product-Image/${product._id}`}
            className="card-img-top"
            alt={product.Name}
           style={{"height":"300px", "width":"300px"}}
          />
        </div>
        <div className="col-md-6 product-details-info">
          <h1 className="text-center">Product Details</h1>
          <hr />
          <h6>Name : {product.Name}</h6>
          <h6>Description : {product.Description}</h6>
          <h6>
            Price :
            {product?.Price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </h6>
          <h6>Category : {product?.Category?.cName}</h6>
          <button className="btn btn-primary ms-1"      onClick={() => {
                        setCart([...cart, product]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, product])
                        );
                        toast.success("Item Added to cart");
                      }}>ADD TO CART</button>
        </div>
      </div>
      <hr />
      <div className="row container similar-products">
        <h4>Similar Products ➡️</h4>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-2" key={p._id}>
              <img
                src={`${import.meta.env.VITE_API}/api/product/product-Image/${p._id}`}
                className="card-img-top"
                alt={p.Name}
              />
              <div className="card-body">
                <div className="card-name-price">
                  <h5 className="card-title">{p.Name}</h5>
                  <h5 className="card-title card-price">
                    {p.Price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </h5>
                </div>
                <p className="card-text ">
                  {p.Description.substring(0, 60)}...
                </p>
                <div className="card-name-price">
                  <button
                    className="btn btn-info ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  {/* <button
                  className="btn btn-dark ms-1"
                  onClick={() => {
                    setCart([...cart, p]);
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...cart, p])
                    );
                    toast.success("Item Added to cart");
                  }}
                >
                  ADD TO CART
                </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
