import React, { useEffect, useState } from "react";
import { getCategories } from "../../services/CategoryService";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { SearchField } from "./SearchField";

const BelowNavbar = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories(0, 1000)
      .then((data) => {
        // console.log(data,"cat")
        setCategories(data.content);
      })
      .catch((error) => {
        toast.error("error while getting categories");
      });
  }, []);
  return (
    <>
      <div className=" displayHiddenOnMobile justify-content-center py-2 mb-1 border shadow-sm bg-white">
        {" "}
        <Nav.Link className="nlink" as={NavLink} to={"/store"}>
          Store
        </Nav.Link>
        {categories.map((category) => {
          return (
            <>
              <Nav.Link
                className="ms-4 nlink "
                key={category.categoryId}
                as={NavLink}
                to={`/store/category/products/${category.categoryId}/${category.title}`}
              >
                {category.title}
              </Nav.Link>
            </>
          );
        })}
      </div>
      <div className=" displayVisibleOnMobile px-2 justify-content-center py-2 mb-1 border-0 shadow bg-white">
        <SearchField  />
      </div>
    </>
  );
};

export default BelowNavbar;
