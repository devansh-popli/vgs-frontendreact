import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Modal,
  Pagination,
  Row,
  Table,
} from "react-bootstrap";
import {
  UpdateCategoryInProduct,
  addProductImage,
  deleteSingleProduct,
  getAllProducts,
  updateProduct,
  searchProductsApi,
} from "../../services/ProductService";
import { toast } from "react-toastify";
import { MdDelete, MdModelTraining } from "react-icons/md";
import { MdRemoveRedEye } from "react-icons/md";
import { BsFillPencilFill } from "react-icons/bs";
import Swal from "sweetalert2";
import { BASE_URL, getProductImageUrl } from "../../services/HelperService";
import { ShowHtml } from "../../components/ShowHtml";
import { Editor } from "@tinymce/tinymce-react";
import { getCategories } from "../../services/CategoryService";

export const ViewProducts = () => {
  const [products, setProducts] = useState(null);
  const [prevProducts, setPrevProducts] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [show, setShow] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const handleProductViewClose = () => setShow(false);
  const handleProductUpdateClose = () => setShowUpdate(false);
  const searchProducts = () => {
    searchProductsApi(searchQuery)
      .then((data) => {
        if (data.content.length <= 0) {
          toast.info("No Result Found");
          return;
        }
        setProducts(data);
      })
      .catch((error) => {
        toast.error("error in searching the products");
      });
  };
  const handleProductUpdate = () => {
    updateProduct(selectedProduct)
      .then((res) => {
        UpdateCategoryInProduct(selectedProduct, selectedCategoryId)
          .then((data) => {
            toast.success("product updated successfully");
            products.content
              .filter(
                (product) => product.productId === selectedProduct.productId
              )
              .map((product) => {
                Object.assign(product, data);
                return product;
              });
            if (selectedProduct.image) {
              addProductImage(selectedProduct.image, selectedProduct.productId)
                .then((data) => {
                  toast.success("Image updated in Product");
                })
                .catch((error3) => {
                  toast.error("error occured while updating image");
                })
                .finally(() => {
                  // handleProductUpdateClose()
                });
            }
          })
          .catch((error2) => {
            toast.error("error occured while updating category");
          })
          .finally(() => {
            handleProductUpdateClose();
          });
      })
      .catch((error) => {
        toast.error("error updating product");
      });
  };
  const handleProductViewShow = (product) => {
    setSelectedProduct(product);
    setSelectedCategoryId(product.categories.map((cat) => cat.categoryId));
    console.log("selected cat ids" + selectedCategoryId);
    setShow(true);
  };
  const editorRef = useRef(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState([]);
  const handleSelectChange = (event) => {
    const selectedValues = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedCategoryId(selectedValues);
  };
  useEffect(() => {
    getCategories(0, 1000)
      .then((data) => {
        setCategories(data.content);
      })
      .catch((error) => {
        toast.error("Error Loading Categories");
      });
  }, []);
  const [categories, setCategories] = useState([]);
  const updateProductModal = (product) => {
    setSelectedProduct(product);
    setSelectedProduct({
      ...product,
      placeholder: `${BASE_URL}/products/image/${product.productId}`,
    });
    setSelectedCategoryId(product.categories.map((cat) => cat.categoryId));
    setShowUpdate(true);
  };
  const clearForm = () => {
    editorRef.current.setContent("");
    setSelectedProduct({
      title: "",
      description: "",
      quantity: 1,
      price: 0,
      discountedPrice: 0,
      live: false,
      stock: true,
      image: undefined,
      placeholder: undefined,
    });
  };
  const handleField = (event) => {
    setSelectedProduct({
      ...selectedProduct,
      [event.target.name]: event.target.value,
    });
  };
  const handleFileChange = (event) => {
    const localFile = event.target.files[0];
    if (
      localFile?.type === "image/png" ||
      localFile?.type === "image/jpeg" ||
      localFile?.type === "image/jpg"
    ) {
      const reader = new FileReader();
      reader.onload = (r) => {
        setSelectedProduct({
          ...selectedProduct,
          placeholder: r.target.result,
          image: localFile,
        });
      };
      reader.readAsDataURL(localFile);
    } else {
      toast.error("Invalid File Format only jpeg/jpg/png allowed");
      setSelectedProduct({
        ...selectedProduct,
        image: null,
        placeholder: null,
      });
    }
  };
  const getProducts = (pageNumber, pageSize) => {
    getAllProducts(pageNumber, pageSize, "addedDate", "desc")
      .then((res) => {
        setProducts(res);
        setPrevProducts(res);
      })
      .catch((error) => {
        toast.error("error occured while fetching products");
      });
  };
  useEffect(() => {
    getProducts(0, 10);
  }, []);
  const formatDate = (time) => {
    return new Date(time).toLocaleString();
  };
  const deleteProduct = (productId) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteSingleProduct(productId)
            .then((res) => {
              setProducts({
                ...products,
                content: products.content.filter(
                  (product) => selectedProduct.productId != productId
                ),
              });
              swalWithBootstrapButtons.fire(
                "Deleted!",
                "Your file has been deleted.",
                "success"
              );
            })
            .catch((error) => {
              toast.error("error occured while deleting product");
            });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your imaginary file is safe :)",
            "error"
          );
        }
      });
  };
  const ViewProductModal = () => {
    return (
      selectedProduct && (
        <>
          <Modal show={show} onHide={handleProductViewClose} size="xl">
            <Modal.Header closeButton>
              <Modal.Title>{selectedProduct.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container className="text-center">
                <img
                  src={
                    selectedProduct.productImage
                      ? getProductImageUrl(selectedProduct.productId)
                      : "../../assets/logo.png"
                  }
                  className="p-2 m-2"
                  height={"300px"}
                  alt="no image present"
                />
              </Container>
              <Table striped bordered responsive>
                <thead>
                  <tr>
                    <th>Info</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Product Id</td>
                    <td className="fw-bold">{selectedProduct.productId}</td>
                  </tr>
                  <tr>
                    <td>Quantity</td>
                    <td className="fw-bold">{selectedProduct.quantity}</td>
                  </tr>
                  <tr>
                    <td>Price</td>
                    <td className="fw-bold">₹{selectedProduct.price}</td>
                  </tr>
                  <tr>
                    <td>Discounted Price</td>
                    <td className="fw-bold">
                      ₹{selectedProduct.discountedPrice}
                    </td>
                  </tr>
                  <tr>
                    <td>Stock</td>
                    <td className="fw-bold">
                      {selectedProduct.stock ? "In Stock" : "Out of Stock"}
                    </td>
                  </tr>
                  <tr>
                    <td>Stock</td>
                    <td className="fw-bold">
                      {selectedProduct.live ? "Is Live" : "Not Live"}
                    </td>
                  </tr>
                  <tr>
                    <td>Categories</td>
                    <td className="fw-bold">
                      {selectedProduct?.categories.map((data, i) => {
                        return (
                          <>
                            <span>{data.title}</span>
                            <span
                              hidden={
                                selectedProduct?.categories.length - 1 == i
                              }
                            >
                              ,
                            </span>
                          </>
                        );
                      })}
                    </td>
                  </tr>
                </tbody>
              </Table>
              <div className="p-3 border">
                <ShowHtml htmlText={selectedProduct.description} />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleProductViewClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleProductViewClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )
    );
  };
  const UpdateProductModal = () => {
    return (
      selectedProduct && (
        <>
          <Modal show={showUpdate} onHide={handleProductUpdateClose} size="xl">
            <Modal.Header closeButton>
              <Modal.Title>{selectedProduct.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Product Title</Form.Label>
                  <Form.Control
                    value={selectedProduct.title}
                    onChange={(event) => handleField(event)}
                    type="text"
                    name="title"
                    placeholder="Enter here"
                  />
                </Form.Group>
                {/* <Form.Group className="mb-3">
              <Form.Label>Product Description</Form.Label>
              <Form.Control
                value={selectedProduct.description}
                onChange={(event) => handleField(event)}
                as="textarea"
                rows={6}
                name="description"
                placeholder="Enter here"
              />
            </Form.Group> */}
                <Editor
                  onEditorChange={(event) => {
                    setSelectedProduct({
                      ...selectedProduct,
                      description: editorRef.current.getContent(),
                    });
                  }}
                  value={selectedProduct.description}
                  apiKey="m7xx611kavpfmxl1jezk35tga7bjl3acnabcf2e2j6ckn83z"
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  init={{
                    height: 500,
                    menubar: true,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "code",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "code",
                      "help",
                      "wordcount",
                    ],
                    toolbar:
                      "undo redo | blocks | " +
                      "bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | help",
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
                />
                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Price</Form.Label>
                      <Form.Control
                        value={selectedProduct.price}
                        onChange={(event) => handleField(event)}
                        type="number"
                        name="price"
                        placeholder="Enter here"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Discounted Price</Form.Label>
                      <Form.Control
                        value={selectedProduct.discountedPrice}
                        onChange={(event) => handleField(event)}
                        type="number"
                        name="discountedPrice"
                        placeholder="Enter here"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>Product Quantity</Form.Label>
                  <Form.Control
                    value={selectedProduct.quantity}
                    onChange={(event) => handleField(event)}
                    type="number"
                    name="quantity"
                    placeholder="Enter here"
                  />
                </Form.Group>
                <Row className="mb-3 px-3">
                  <Col>
                    <Form.Check
                      checked={selectedProduct.live}
                      onChange={(event) => {
                        setSelectedProduct({
                          ...selectedProduct,
                          live: !selectedProduct.live,
                        });
                      }}
                      value={true}
                      type="switch"
                      label={"Live"}
                      name="live"
                    ></Form.Check>
                  </Col>
                  <Col>
                    <Form.Check
                      type="switch"
                      label={"Stock"}
                      name="stock"
                      onChange={(event) => {
                        setSelectedProduct({
                          ...selectedProduct,
                          stock: !selectedProduct.stock,
                        });
                      }}
                      checked={selectedProduct.stock}
                    ></Form.Check>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Container className="text-center py-3 border">
                    <p className="text-muted">Image Preview</p>
                    <img
                      className="img-fluid"
                      style={{
                        objectFit: "contain",
                        maxHeight: "250px",
                        width: "100%",
                      }}
                      src={selectedProduct.placeholder}
                      alt=""
                    />
                  </Container>
                  <Form.Label>Select Product Image</Form.Label>
                  <InputGroup>
                    <Form.Control
                      onChange={(event) => handleFileChange(event)}
                      type="file"
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => {
                        setSelectedProduct({
                          ...selectedProduct,
                          placeholder: undefined,
                          image: null,
                        });
                      }}
                    >
                      Clear
                    </Button>
                  </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Select Category</Form.Label>
                  <Form.Select
                    value={selectedCategoryId}
                    multiple
                    onChange={(event) => handleSelectChange(event)}
                  >
                    <option value="none">None</option>
                    {categories &&
                      categories?.map((category) => {
                        return (
                          <option
                            key={category.categoryId}
                            value={category.categoryId}
                          >
                            {category?.title}
                          </option>
                        );
                      })}
                  </Form.Select>
                  <p className="text-muted">
                    To remove any category just unSelect It otherwise keep it to
                    prevent remove
                  </p>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleProductUpdateClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleProductUpdate}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )
    );
  };
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Card className="shadow border-0">
              <Card.Body>
                <h3>View Products</h3>
                <Form.Group className="my-2">
                  <Form.Label>Search Product</Form.Label>
                  <InputGroup>
                    <Form.Control
                      onChange={(event) => {
                        if (event.target.value.trim() === "") {
                           setSearchQuery('')
                          // console.log(prevProducts)
                          setProducts(prevProducts);
                        } else {
                          // console.log(event.target.value)
                          setSearchQuery(event.target.value);
                        }
                      }}
                      placeholder="search here"
                      type="text"
                    />
                    <Button
                      onClick={searchProducts}
                      variant={"outline-secondary"}
                    >
                      {" "}
                      Search
                    </Button>
                  </InputGroup>
                </Form.Group>
                <Table striped hover bordered className="shadow" size="sm">
                  <thead>
                    <th className="px-3 small">SN</th>
                    <th className="px-3 small">Title</th>
                    <th className="px-3 small">Quantity</th>
                    <th className="px-3 small">Price</th>
                    <th className="px-3 small">Discounted</th>
                    <th className="px-3 small">Live</th>
                    <th className="px-3 small">Stock</th>
                    <th className="px-3 small">Category</th>
                    <th className="px-3 small">Date</th>
                  </thead>
                  <tbody>
                    {products?.content.map((product, i) => {
                      return (
                        <tr key={product?.productId}>
                          <td className="px-3 small">{i + 1}</td>
                          <td className="px-3 small">{product?.title}</td>
                          <td className="px-3 small">{product?.quantity}</td>
                          <td className="px-3 small">₹{product?.price}</td>
                          <td className="px-3 small">
                            ₹{product?.discountedPrice}
                          </td>
                          <td className="px-3 small">
                            {product?.live ? "Live" : "Not Live"}
                          </td>
                          <td className="px-3 small">
                            {product?.stock ? "In Stock" : "Out of Stock"}
                          </td>
                          <td className="px-3 small">
                            {product?.categories?.map((category, i) => {
                              return (
                                <div key={category?.categoryId}>
                                  {" "}
                                  {category?.title}{" "}
                                  <span
                                    hidden={
                                      i === product?.categories.length - 1
                                    }
                                  >
                                    ,
                                  </span>
                                </div>
                              );
                            })}
                          </td>
                          <td className="px-3 small">
                            {formatDate(product?.addedDate)}
                          </td>
                          <td className="small">
                            <Button
                              onClick={() => deleteProduct(product.productId)}
                              size="sm"
                              variant="danger"
                            >
                              <MdDelete />
                            </Button>
                          </td>
                          <td className="small">
                            <Button
                              onClick={() => handleProductViewShow(product)}
                              size="sm"
                              variant="warning"
                            >
                              <MdRemoveRedEye />
                            </Button>
                          </td>
                          <td className="small">
                            <Button
                              size="sm"
                              variant="dark"
                              onClick={() => updateProductModal(product)}
                            >
                              <BsFillPencilFill />
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
                <Container className="mt-4 d-flex justify-content-end">
                  {/* {JSON.stringify(products)} */}
                  <Pagination className="">
                    <Pagination.Prev
                      onClick={(event) => {
                        if (products?.pageNumber - 1 >= 0)
                          getProducts(products?.pageNumber - 1, 10);
                      }}
                    />
                    {[...Array(products?.totalPages)]
                      .map((ob, i) => i)
                      .map((item) => (
                        <Pagination.Item
                          onClick={(event) => {
                            getProducts(item, 10);
                          }}
                          active={item === products?.pageNumber}
                          key={item}
                        >
                          {item + 1}
                        </Pagination.Item>
                      ))}
                    <Pagination.Next
                      onClick={(event) => {
                        if (products?.pageNumber + 1 < products.totalPages) {
                          getProducts(products?.pageNumber + 1, 10);
                        }
                      }}
                    />
                  </Pagination>
                </Container>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      {ViewProductModal()}
      {UpdateProductModal()}
    </>
  );
};
