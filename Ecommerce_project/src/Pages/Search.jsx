import Layout from "../Components/Layout";
import { useSearch } from "../Context/SearchContext";
const Search = () => {
  // eslint-disable-next-line no-unused-vars
  const [values, setValues] = useSearch();
  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Resuts</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
              // eslint-disable-next-line react/jsx-key
              <div className="card m-2" style={{ "width": "18rem" }}>
                <img
                  src={`${import.meta.env.VITE_API}/api/product/product-Image/${p._id}`}
                  className="card-img-top"
                  alt={p.Name}
                  style={{"maxHeight":"300px", "maxWidth":"300px"}}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.Name}</h5>
                  <p className="card-text">
                    {p.Description.substring(0, 30)}...
                  </p>
                  <p className="card-text"> ${p.Price}</p>
                  <button className="btn btn-primary ms-1">More Details</button>
                  <button className="btn btn-secondary ms-1">ADD TO CART</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
