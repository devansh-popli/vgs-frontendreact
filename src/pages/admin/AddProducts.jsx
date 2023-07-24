import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import { toast } from "react-toastify";
import {
  addProductImage,
  createProductInCategory,
  createProductWithoutCategory,
} from "../../services/ProductService";
import { Editor } from "@tinymce/tinymce-react";
import { getCategories } from "../../services/CategoryService";

export const AddProducts = () => {
  const editorRef = useRef(null);

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
  const [product, setProduct] = useState({
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
  const [selectedCategoryId, setSelectedCategoryId] = useState("none");
  const handleField = (event) => {
    setProduct({ ...product, [event.target.name]: event.target.value });
  };
  const handleFileChange = (event) => {
    const localFile = event.target.files[0];
    if (
      localFile.type === "image/png" ||
      localFile.type === "image/jpeg" ||
      localFile.type === "image/jpg"
    ) {
      const reader = new FileReader();
      reader.onload = (r) => {
        setProduct({
          ...product,
          placeholder: r.target.result,
          image: localFile,
        });
      };
      reader.readAsDataURL(localFile);
    } else {
      toast.error("Invalid File Format only jpeg/jpg/png allowed");
      setProduct({ ...product, image: null, placeholder: null });
    }
  };
  const clearForm = () => {
    editorRef.current.setContent("");
    setProduct({
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
  const createProduct = (event) => {
    event.preventDefault();
    if (product.title === undefined || product.title.trim() === "") {
      toast.error("title is required");
      return;
    }
    if (
      product.description === undefined ||
      product.description.trim() === ""
    ) {
      toast.error("descrition is required");
      return;
    }
    if (product.price === undefined || parseInt(product.price) < 0) {
      toast.error("Invalid Price");
      return;
    }
    if (parseInt(product.price) < parseInt(product.discountedPrice)) {
      toast.error("Invalid Discounted Price");
      return;
    }
    if (selectedCategoryId !== "none") {
      createProductInCategory(product, selectedCategoryId)
        .then((data) => {
          toast.success("Product is created");
          if (!product.image) {
            clearForm();
            return;
          }
          addProductImage(product.image, data.productId)
            .then((res) => {
              toast.success("Product image uploaded successfully");
              setProduct({
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
            })
            .catch((error) => {
              toast.success("Error occured while uploading Product image");
            });
        })
        .catch((errr) => {
          toast.error("error occured while adding product");
        });
    } else {
      createProductWithoutCategory(product)
        .then((data) => {
          toast.success("Product is created");
          if (!product.image) {
            clearForm();
            return;
          }
          addProductImage(product.image, data.productId)
            .then((res) => {
              toast.success("Product image uploaded successfully");
              setProduct({
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
              editorRef.current.setContent("");
            })
            .catch((error) => {
              toast.success("Error occured while uploading Product image");
            });
        })
        .catch((errr) => {
          toast.error("error occured while adding product");
        });
    }
  };

  const formView = () => {
    return (
      <Card className="shadow border-0 mt-4">
       {/* {(product.price < product.discountedPrice)+''} */}
        {/* {JSON.stringify(product)} */}
        <Card.Body>
          <h3>Add Product Here</h3>
          <Form onSubmit={createProduct}>
            <Form.Group className="mb-3">
              <Form.Label>Product Title</Form.Label>
              <Form.Control
                value={product.title}
                onChange={(event) => handleField(event)}
                type="text"
                name="title"
                placeholder="Enter here"
              />
            </Form.Group>
            {/* <Form.Group className="mb-3">
              <Form.Label>Product Description</Form.Label>
              <Form.Control
                value={product.description}
                onChange={(event) => handleField(event)}
                as="textarea"
                rows={6}
                name="description"
                placeholder="Enter here"
              />
            </Form.Group> */}
            <Editor
              onEditorChange={(event) => {
                setProduct({
                  ...product,
                  description: editorRef.current.getContent(),
                });
              }}
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
                    value={product.price}
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
                    value={product.discountedPrice}
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
                value={product.quantity}
                onChange={(event) => handleField(event)}
                type="number"
                name="quantity"
                placeholder="Enter here"
              />
            </Form.Group>
            <Row className="mb-3 px-3">
              <Col>
                <Form.Check
                  checked={product.live}
                  onChange={(event) => {
                    setProduct({ ...product, live: !product.live });
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
                    setProduct({ ...product, stock: !product.stock });
                  }}
                  checked={product.stock}
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
                  src={product.placeholder}
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
                    setProduct({
                      ...product,
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
                onChange={(event) => {
                  setSelectedCategoryId(event.target.value);
                }}
              >
                <option value="none">None</option>
                {categories &&
                  categories.map((category) => {
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
            </Form.Group>
            <Container className="text-center">
              <Button size="sm" variant="success" type={"submit"}>
                Add Product
              </Button>
              <Button
                onClick={clearForm}
                className="ms-1"
                size="sm"
                variant="danger"
              >
                Clear Data
              </Button>
            </Container>
          </Form>
        </Card.Body>
      </Card>
    );
  };
  return <>{formView()}</>;
};
