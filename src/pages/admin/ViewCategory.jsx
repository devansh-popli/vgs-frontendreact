import React, { useEffect, useState } from "react";
import { CategoryView } from "../../components/admin/CategoryView";
import {
  addCategoryImage,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../../services/CategoryService";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Button, Container, Form, Modal, Spinner } from "react-bootstrap";
import { BASE_URL } from "../../services/HelperService";
import InfiniteScroll from "react-infinite-scroll-component";

export const ViewCategory = () => {
  const [categories, setCategories] = useState({
    content: [],
  });
  const [selectedCategory, setselectedCategory] = useState(null);
  const [image, setImage] = useState({
    file: null,
    placeholder: "",
  });
  useEffect(() => {
    setImage({
      ...image,
      placeholder: `${BASE_URL}/categories/image/${selectedCategory?.categoryId}`,
    });
  }, [selectedCategory]);

  const [show, setShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showUpdate, setShowUpdate] = useState(false);
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => setShowUpdate(true);
  const [loading, setLoading] = useState(false);
  const UpdateCategory = () => {
    updateCategory(selectedCategory)
      .then((res) => {
        if (image.file) {
          addCategoryImage(image.file, selectedCategory.categoryId)
            .then((data) => {
              toast.success("category Image updated successfully");
            })
            .catch((error) => {
              toast.error("error occured while uploading image");
            });
        }
        toast.success("category updated successfully");
        categories.content.map((cat) => {
          if (cat.categoryId === selectedCategory.categoryId) {
            cat.title = selectedCategory.title;
            cat.description = selectedCategory.description;
          }
        });
        handleCloseUpdate();
      })
      .catch((error) => {
        toast.error("error occured while updating");
      });
  };
  const handleChange = (event) => {
    setselectedCategory({
      ...selectedCategory,
      [event.target.name]: event.target.value,
    });
  };
  const loadNextPage = () => {
    setCurrentPage(currentPage+1);
  };
  const fileUpdate = (event) => {
    const reader = new FileReader();
    reader.onload = (r) => {
      setImage({
        file: event.target.files[0],
        placeholder: r.target.result,
      });
    };
    reader.readAsDataURL(event.target.files[0]);
  };
  const deleteCategoryFromParent = (categoryId) => {
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
          deleteCategory(categoryId)
            .then((res) => {
              console.log(res);
              setCategories({
                ...categories,
                content: categories.content.filter(
                  (category) => category.categoryId != categoryId
                ),
              });
              swalWithBootstrapButtons.fire(
                "Deleted!",
                "Your file has been deleted.",
                "success"
              );
            })
            .catch((data) => {
              console.log(data);
              toast.error("error occured while deleting category");
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
  useEffect(() => {
    setLoading(true);
    getCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        toast.error("error loading categories");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    if (currentPage > 0) {
      getCategories(currentPage)
        .then((data) => {
          console.log("response from"+currentPage)
          console.log(data);
          setCategories({
            content: [...categories.content, ...data.content],
            lastPage: data.lastPage,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize, 
            totalElements: data.totalElements,
            totalPage: data.totalPages,
          });
        })
        .catch((error) => {
          toast.error("error loading categories");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [currentPage]);

  const modalView = () => {
    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedCategory?.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <img
                style={{ width: "100%", height: "250px", objectFit: "contain" }}
                src={
                  selectedCategory?.coverImage &&
                  selectedCategory?.coverImage.trim() != ""
                    ? `${BASE_URL}/categories/image/${selectedCategory.categoryId}`
                    : `../assets/logo.png`
                }
                alt=""
              />
            </Container>
            <div className="mt-5">{selectedCategory?.description}</div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  const updateModal = () => {
    return (
      <>
        <Modal show={showUpdate} onHide={handleCloseUpdate}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedCategory?.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* {image.placeholder} */}
            <Form>
              <div className="my-3">
                <img
                  style={{
                    width: "100%",
                    height: "250px",
                    objectFit: "contain",
                  }}
                  src={image.placeholder}
                  alt=""
                />
              </div>
              <Form.Group>
                <Form.Label>Update Category Image</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(event) => fileUpdate(event)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Category Title</Form.Label>
                <Form.Control
                  name="title"
                  class="text"
                  value={selectedCategory?.title}
                  onChange={(event) => handleChange(event)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Category Description</Form.Label>
                <Form.Control
                  name="description"
                  as="textarea"
                  value={selectedCategory?.description}
                  onChange={(event) => handleChange(event)}
                  rows={6}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseUpdate}>
              Close
            </Button>
            <Button variant="primary" onClick={UpdateCategory}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };
  const handleViewOfCategory = (category) => {
    setselectedCategory(category);
    handleShow();
  };
  const handleUpdateOfCategory = (category) => {
    console.log("handle show update");
    setselectedCategory(category);
    handleShowUpdate();
  };
  return (
    <div>
      <Container className="text-center p-3" hidden={!loading}>
        <Spinner />
        <h4>Loading...</h4>
      </Container>
      {categories.content.length > 0 ? (
        <>
          <InfiniteScroll
            dataLength={categories.content.length}
            next={loadNextPage}
            hasMore={!categories.lastPage}
            loader={<h2 className="text-center p-3">Loading..</h2>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {categories.content?.map((category) => (
              <CategoryView
                handleViewOfCategory={handleViewOfCategory}
                handleUpdateOfCategory={handleUpdateOfCategory}
                deleteCategoryFromParent={deleteCategoryFromParent}
                category={category}
                key={category.categoryId}
              />
            ))}
          </InfiniteScroll>
        </>
      ) : (
        <h5 className="text-center">No categories in Database</h5>
      )}
      {modalView()}
      {updateModal()}
    </div>
  );
};
