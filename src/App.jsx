import "./App.css";
import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [productsList, setProductsList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchProducts = async () => {
    const res = await fetch(`https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`);
    const data = await res.json();

    if (data && data.products) {
      setProductsList(data.products);
      setTotalPages(Math.round(data.total / 10));
      console.log(data)
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= totalPages &&
      selectedPage != page
    )
      setPage(selectedPage);
  };

  return (
    <>
      {productsList.length > 0 &&
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
      }
      <div className="paginationContainer">
        <span className={page > 1 ? "" : "page_disabled"} onClick={() => selectPageHandler(page - 1)}>⬅️</span>
        {[...Array(totalPages)].map((__, i) => {
          return (
            <span
              key={i + 1}
              onClick={() => selectPageHandler(i + 1)}
              className={page === i + 1 ? "page_active" : ""}
            >
              {" "}
              {i + 1}
            </span>
          );
        })}
        <span className={page < totalPages ? "" : "page_disabled"}
          onClick={() => selectPageHandler(page + 1)}>➡️</span>
      </div >
    </>
  );
}

export default App;
