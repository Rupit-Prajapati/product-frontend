import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductById();
  }, []);

  const getProductById = async () => {
    var response = await fetch(`http://localhost:5000/products/${params.id}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    response = await response.json();
    setName(response.name);
    setPrice(response.price);
    setCategory(response.category);
    setCompany(response.company);
  };
  const updateProduct = async () => {
    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }
    const data = { name, price, category, company };
    var response = await fetch(`http://localhost:5000/products/${params.id}`, {
      method: "put",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    response = await response.json();
    navigate("/");
  };
  return (
    <div className="product">
      <input
        type="text"
        className="inputBox"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter product name"
      />
      {error && !name && (
        <span className="invalid-input">Enter valid name</span>
      )}
      <input
        type="text"
        className="inputBox"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Enter product price"
      />
      {error && !price && (
        <span className="invalid-input">Enter valid price</span>
      )}
      <input
        type="text"
        className="inputBox"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Enter product category"
      />
      {error && !category && (
        <span className="invalid-input">Enter valid category</span>
      )}
      <input
        type="text"
        className="inputBox"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        placeholder="Enter product company"
      />
      {error && !company && (
        <span className="invalid-input">Enter valid company</span>
      )}
      <button onClick={updateProduct} className="appButton">
        Update Product
      </button>
    </div>
  );
};

export default UpdateProduct;
