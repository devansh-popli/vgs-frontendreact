import React, { useEffect, useState } from "react";
import { getAllProductsOfCategories } from "../../services/ProductService";
import { toast } from "react-toastify";
import InfiniteScroll from "react-infinite-scroll-component";
import { Breadcrumb, Col, Container, Row } from "react-bootstrap";
import SingleProductView from "../../components/users/SingleProductView";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { UserCategoryView } from "../../components/users/UserCategoryView";

export const CategoryStorePage = () => {
  const [products, setProducts] = useState(null);
  const { categoryId, categoryTitle } = useParams();
  const [currentPageNumber, setCurrentPageNumber] = useState(null);
  const navigate=useNavigate()
  const loadProductsOfCategories = (pageNumber, pageSize, sortBy, sortDir) => {
    getAllProductsOfCategories(
      categoryId,
      pageNumber,
      pageSize,
      sortBy,
      sortDir
    )
      .then((data) => {
        if (currentPageNumber > 0) {
          setProducts({
            content: [...products.content, ...data.content],
            lastPage: data.lastPage,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPage: data.totalPages,
          });
        } else {
          setProducts({ ...data });
        }
      })
      .catch((error) => {
        toast.error("error while loading products of category");
      });
  };
  useEffect(() => {
    if (currentPageNumber > 0)
      loadProductsOfCategories(currentPageNumber, 9, "addedDate", "desc");
  }, [currentPageNumber]);
  const loadNextPage = () => {
    setCurrentPageNumber(currentPageNumber + 1);
  };
  useEffect(() => {
    loadProductsOfCategories(0, 9, "addedDate", "desc");
  }, [categoryId]);
  const productsView = () => {
    return products && products.content.length > 0 ? (
      <>
        <InfiniteScroll
          dataLength={products.content.length}
          next={loadNextPage}
          loader={<h3 className="text-center my-5">Loading...</h3>}
          hasMore={!products.lastPage}
        >
          <Container fluid>
            <Row>
              {products.content.map((product) => {
                return (
                  <Col
                    className="d-flex justify-content-center "
                    key={product.productId}
                    md={4}
                    lg={3}
                    sm={6}
                  >
                    <SingleProductView product={product} />
                  </Col>
                );
              })}
            </Row>
          </Container>
        </InfiniteScroll>
      </>
    ) : (
      <h3 className="mt-5 text-center text-secondary fw-bold text-capitalize">
        No Products for this Category
      </h3>
    );
  };
  return (
    <Container fluid className="px-2 pt-5">
      <Row>
        <Container className="d-flex justify-content-start">
          <Breadcrumb className="mx-5">
            <Breadcrumb.Item onClick={()=>navigate("/store")}>
              Store
            </Breadcrumb.Item>
            <Breadcrumb.Item>{categoryTitle}</Breadcrumb.Item>
          </Breadcrumb>
        </Container>
        <Col md={2} className="sideproductview">
          <UserCategoryView imagepath={"../../../../assets/logo.png"} />
        </Col>
        <Col md={10}>{productsView()}</Col>
      </Row>
    </Container>
  );
};
