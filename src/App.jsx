import "./App.css";
import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [productsList, setProductsList] = useState([]);

  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();

    if (data && data.products) {
      setProductsList(data.products);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      {productsList.length > 0 && (
        <div className="products">
          {productsList.map((prod) => {
            return (
              <div className="product" key={prod.id}>
                <img src={prod.thumbnail} alt={prod.title} />
                <span>{prod.title}</span>
              </div>
            );
          })}
        </div>
      )}
      <div className="paginationContainer">
        <span>⬅️</span>
        <span>1</span>
        <span>➡️</span>
      </div>
    </>
  );
}

export default App;
