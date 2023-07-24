import React, { useRef, useState } from "react";
import { Button, Card, Container, Form, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { addCategory, addCategoryImage } from "../../services/CategoryService";

export const AddCategory = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const ref = useRef();
  const [category, setCategory] = useState({
    title: "",
    description: "",
  });
  const handleFileUpload = (event) => {
    if (event.target.files[0]) {
      const localFile = event.target.files[0];
      if (
        localFile.type === "image/png" ||
        localFile.type === "image/jpeg" ||
        localFile.type === "image/jpg"
      ) {
        setImage(event.target.files[0]);
      } else {
        toast.error("Invalid file format only png jpeg jpg allowed");
      }
    }
  };
  const handleFieldChange = (event) => {
    // event.preventDefault()
    setCategory({ ...category, [event.target.name]: event.target.value });
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (category.title == undefined || category.title.trim() == "") {
      toast.error("category title is required");
      return;
    }
    if (
      category.description == undefined ||
      category.description.trim() == ""
    ) {
      toast.error("category description is required");
      return;
    }
    if(!image)
    {
        toast.error("category image is required")
        return
    }
    setLoading(true)
    addCategory(category)
      .then((res) => {
        toast.success("category added");
        console.log(res);
        addCategoryImage(image, res.categoryId)
          .then((data) => {
            toast.success("category image uploaded successfully");
            setCategory({
                title: "",
                description: "",
            })
            setImage(null)
            ref.current.value=""
          })
          .catch((error) => {
            toast.error("error occurred while uploading image!!");
          }).finally(()=>{
            setLoading(false)
          });
      })
      .catch((error) => {
        toast.error("error in adding category !!");
      }).finally(data=>{
        setLoading(false)
      });
  };
const clearFields=()=>{
    setCategory({
        title: "",
        description: "",
    })
    setImage(null)
    ref.current.value=""
  }
  return (
    <>
      <Container fluid>
        {/* {JSON.stringify(category)} */}
        <Card className="shadow border-0 mt-4">
          <Card.Body>
            <h4>Add Category here</h4>
            <Form onSubmit={(event) => handleFormSubmit(event)}>
              <Form.Group>
                <Form.Label>Category Title</Form.Label>
                <Form.Control
                  onChange={(event) => handleFieldChange(event)}
                  name="title"
                  type={"text"}
                  value={category.title}
                  placeholder="Enter here"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Category Description</Form.Label>
                <Form.Control
                  onChange={(event) => handleFieldChange(event)}
                  name="description"
                  as={"textarea"}
                  rows={6}
                  value={category.description}
                  placeholder="Enter here"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Category Cover Image</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(event) => handleFileUpload(event)}
                  ref={ref}
                />
              </Form.Group>
              <Container className="mt-3 text-center">
                <Button
                  type="submit"
                  size="sm"
                  variant="success"
                  className="mx-2"
                  disabled={loading}
                >
                    <Spinner hidden={!loading} size={"sm"}></Spinner>
                  <span hidden={loading}>Add Category</span>
                  <span hidden={!loading}>Wait...</span>
                </Button>
                <Button onClick={clearFields} size="sm" variant="danger">
                  Clear
                </Button>
              </Container>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};
