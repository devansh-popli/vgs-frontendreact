import React, { useContext, useEffect, useState } from "react";
import { InputGroup, FormControl, Button, Form, Dropdown } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { CategoryContext } from "../../context/CategoryContext";
import { useNavigate } from "react-router-dom";
import { searchProductsApi } from "../../services/ProductService";

export const SearchField = () => {
  const [searchText, setSearchText] = useState('');
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [categoriesObj, setCategoriesObj] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [query, setQuery] = useState("");
  const categoriesContext = useContext(CategoryContext)
  useEffect(() => {
    setCategoriesObj(categoriesContext?.categories?.content)
    setCategories(categoriesContext?.categories?.content?.map(data => data.title));
  }, [categoriesContext])
  useEffect(() => {
    if (query?.length > 0) {
      searchProductsApi(query).then(data => {
        setProducts(data.content)
      }).catch(error => {
        console.log("no products found")
      })
    }
  }, [query])
  let currentIndex = 0;

  useEffect(() => {
    if (categoriesObj?.length > 0) {
      const intervalId = setInterval(() => {
        setSearchText(categories[currentIndex]);
        currentIndex = (currentIndex + 1) % categories.length;
      }, 2000);

      // Clear the interval when the component unmounts
      return () => clearInterval(intervalId);
    }
  }, [categoriesObj?.length]); //


  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const handleSearch = (cat) => {

    if (query.trim()) {
      if (cat?.productId) {
        navigate(`/products/${cat.productId}`);
      }
      else if (cat?.categoryId) {
        navigate(`/store/category/products/${cat.categoryId}/${cat.title}`);
      }
      setQuery("")
    }
  };
  const handleProductSearch = (prod) => {
    if (query.trim()) {
      navigate(`/products/:productId/${prod.productId}`);
      setQuery("")
    }
  };
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim()) {
      let cats = categoriesObj.filter((cat) =>
        cat?.title.toLowerCase().includes(value.toLowerCase())
      )
      setFilteredCategories([
        ...cats || [],
        ...products || []
      ]);
    } else {
      setFilteredCategories([]);
    }
  };

  return (
    <InputGroup style={{ width: "700px", position: "relative" }}>
      <FaSearch className="text-muted" style={{ position: "absolute", zIndex: "10", top: "10",left:"10" }} />
      <Form.Control
        placeholder={`Search ${searchText}`}
        aria-label={`Search ${searchText}`}
        value={query}
        style={{ paddingLeft: "35px" }}
        onChange={handleInputChange}
      />
      {query?.length > 0 &&
        <Button
          variant="outline-secondary"
          id="button-addon2"
          onClick={() => setQuery("")}
        >
          X
        </Button>
      }
      {query.length>0 && filteredCategories?.length > 0 && (
        <Dropdown.Menu show style={{ position: "absolute", top: "100%", left: 0, width: "100%" }}>
          {filteredCategories.map((category, index) => (
            <Dropdown.Item className="d-flex justify-content-between" key={index} onClick={() => handleSearch(category)}>
              {/* {category+''} */}
              <div>
                {category.title}
              </div>
              <div className="bold text-muted">
                {category.productId ? 'Product' : "Category"}
              </div>
            </Dropdown.Item>
          ))}
          {/* {products?.map((product, index) => (
            <Dropdown.Item key={product.productId} onClick={() => handleProductSearch(product.title)}>
              {product.title}
            </Dropdown.Item>
          ))} */}
        </Dropdown.Menu>
      )}
    </InputGroup>
  );
}
