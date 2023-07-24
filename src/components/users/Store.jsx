import React, { useEffect, useState } from "react";
import { Breadcrumb, Col, Container, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { getCategories } from "../../services/CategoryService";
import { getCategoryImageUrl } from "../../services/HelperService";
import { getAllProducts, getLiveProducts } from "../../services/ProductService";
import { toast } from "react-toastify";
import SingleProductView from "./SingleProductView";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { UserCategoryView } from "./UserCategoryView";

const Store = () => {
  const [categories, setCategories] = useState(null);
  const [products, setProducts] = useState(null);
  const [currentPageNumber, setCurrentPageNumber] = useState(0);
  useEffect(() => {
    loadProducts(0, 9, "addedDate", "desc");
  }, []);

  useEffect(() => {
    if (currentPageNumber > 0)
      loadProducts(currentPageNumber, 9, "addedDate", "desc");
  }, [currentPageNumber]);
  const loadNextPage = () => {
    setCurrentPageNumber(currentPageNumber + 1);
  };
  const loadProducts = (pageNumber, pageSize, sortBy, sortDir) => {
    getLiveProducts(pageNumber, pageSize, sortBy, sortDir)
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
        toast.error("error while loading products");
      });
  };

  const productsView = () => {
    return (
      products && (
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
      )
    );
  };
  return (
    <Container fluid className="px-2 pt-5">
      <Row>
          <Container fluid className="d-flex justify-content-start">
            <Breadcrumb className="mx-5">
              <Breadcrumb.Item as={Link} to="/store">
                Store
              </Breadcrumb.Item>
              <Breadcrumb.Item>All Products</Breadcrumb.Item>
            </Breadcrumb>
          </Container>
        <Col md={2} className="sideproductview">
          <UserCategoryView imagepath={"../../assets/logo.png"} />
        </Col>
        <Col md={10}>{productsView()}</Col>
      </Row>
    </Container>
  );
};

export default Store;
