import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    var response = await fetch(`https://product-backend-wxg4.onrender.com/products`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    response = await response.json();
    setProducts(response);
  };
  const deleteProduct = async (id) => {
    console.log(id);
    var response = await fetch(`https://product-backend-wxg4.onrender.com/products/${id}`, {
      method: "delete",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    response = await response.json();
    console.log(response);
    if (response.acknowledged === true) {
      fetchData();
    }
  };
  const searchHandle = async (e) => {
    var key = e.target.value;
    if (key) {
      var response = await fetch(`https://product-backend-wxg4.onrender.com/search/${key}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      response = await response.json();
      if (response) {
        setProducts(response);
      }
    } else {
      fetchData();
    }
  };
  return (
    <div className="product-list">
      <h3>Product List</h3>
      <input
        type="text"
        className="search-product-box"
        placeholder="Search Product "
        onChange={searchHandle}
      />
      <ul>
        <li>S. No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Company</li>
        <li>Actions</li>
      </ul>
      {products.length > 0 ? (
        products.map((product, index) => (
          <ul key={index}>
            <li>{index + 1}</li>
            <li>{product.name}</li>
            <li>{product.price}</li>
            <li>{product.category}</li>
            <li>{product.company}</li>
            <li>
              <button onClick={() => deleteProduct(product._id)}>Delete</button>
              <Link to={`/update/${product._id}`}>Update</Link>
            </li>
          </ul>
        ))
      ) : (
        <h1>No Result Found</h1>
      )}
    </div>
  );
};

export default ProductList;
