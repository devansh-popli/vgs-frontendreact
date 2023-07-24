import React, { useContext, useEffect, useState } from "react";
import { UserProfileView } from "../../components/users/UserProfileView";
import { UserContext } from "../../context/UserContext";
import {
  getUserById,
  updateUser,
  updateUserProfileImage,
} from "../../services/UserService";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  Card,
  Container,
  Form,
  InputGroup,
  Spinner,
  Table,
} from "react-bootstrap";
import { toast } from "react-toastify";
function Profile() {
  const userContext = useContext(UserContext);
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [show, setShow] = useState(false);
  const [image, setImage] = useState({
    placeholder: "../../assets/Profile-Icon.png",
    file: null,
  });
  const [loading, setLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShowModal = () => setShow(true);

  useEffect(() => {
    // const userId = userContext?.userData?.userId;
    if (userId) {
      getUserById(userId)
        .then((data) => {
          console.log(data);
          setUser(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);
  const updateField = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleProfileImageChange = (event) => {
    const localFile = event.target.files[0];
    if (
      localFile.type === "image/png" ||
      localFile.type === "image/jpeg" ||
      localFile.type === "image/jpg"
    ) {
      const reader = new FileReader();
      reader.onload = (r) => {
        setImage({
          placeholder: r.target.result,
          file: localFile,
        });
      };
      reader.readAsDataURL(localFile);
    } else {
      toast.error("Invalid File type!!");
      image.file = null;
    }
  };
  const handleSave = () => {
    if (user.name === undefined || user.name.trim() === "") {
      toast.error("user name required");
      return;
    }
    if (user.about === undefined || user.about.trim() === "") {
      toast.error("about user is required");
      return;
    }

    setLoading(true);
    updateUser(user)
      .then((data) => {
        toast.success("user details updated !!");
        if (image.file == null) {
          setLoading(false);
          return;
        }

        updateUserProfileImage(image.file, user.userId)
          .then((res) => {
            console.log(res);
            toast.success(data.message);
          })
          .catch((error) => {
            console.log(error);
            toast.error("Image not uploaded !!");
          })
          .finally(() => {
            setLoading(false);
          });
      })
      .catch((error) => {
        // if(error.response.status==400)
        // {
        //   toast.error(error.response.data.name)
        // }
        // else
        toast.error("error occured while updating user");
        setLoading(false);
      })
      .finally(() => {
        handleClose();
      });
  };
  const clearImage = () => {
    setImage({ placeholder: "../../assets/Profile-Icon.png", file: null });
  };
  const updateViewModal = () => {
    return (
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Update User details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <Card
            className="shadow-sm mt-4 border-0"
            style={{ borderRadius: "50px" }}
          >
            <Card.Body> */}
          <Table hover responsive variant="white" striped>
            <tbody>
              <tr className="userprof">
                <td>Profile Image</td>
                <td>
                  <Container className="text-center mb-2">
                    <img
                      style={{
                        objectFit: "cover",
                      }}
                      height={200}
                      width={200}
                      src={image.placeholder}
                      alt="abc"
                    />
                  </Container>
                  <InputGroup>
                    <Form.Control
                      name="file"
                      onChange={(event) => handleProfileImageChange(event)}
                      type="file"
                    />{" "}
                    <Button onClick={clearImage} variant="outline-secondary">
                      Clear Image
                    </Button>
                  </InputGroup>
                </td>
              </tr>
              <tr className="userprof">
                <td>Name</td>
                <td>
                  <Form.Control
                    name="name"
                    onChange={(event) => updateField(event)}
                    type="text"
                    value={user?.name}
                  />{" "}
                </td>
              </tr>

              <tr className="userprof">
                <td>Email</td>
                <td>{user?.email}</td>
              </tr>
              <tr className="userprof">
                <td>New Password</td>
                <td>
                  <Form.Control
                    name="password"
                    onChange={(event) => updateField(event)}
                    type="password"
                    placeholder="Enter new Password here"
                  />
                  <p className="text-muted">
                    Leave the field blank for the same password
                  </p>
                </td>
              </tr>
              <tr className="userprof">
                <td>Gender</td>
                <td>{user?.gender}</td>
              </tr>
              <tr className="userprof">
                <td>About</td>
                <td>
                  {" "}
                  <Form.Control
                    name="about"
                    onChange={(event) => updateField(event)}
                    as="textarea"
                    value={user?.about}
                  />{" "}
                </td>
              </tr>
              <tr className="userprof">
                <td>Roles</td>
                <td>
                  {user?.roles?.map((role) => (
                    <div key={role.roleId}>{role.roleName}</div>
                  ))}
                </td>
              </tr>
            </tbody>
          </Table>
          {/* </Card.Body>
          </Card> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button disabled={loading} variant="primary" onClick={handleSave}>
            <Spinner hidden={!loading} size="sm" />
            <span hidden={loading}>Save Changes</span>
            <span hidden={!loading}>Wait..</span>
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
  return (
    <>
      <UserProfileView user={user} handleShowModal={handleShowModal} />
      {updateViewModal()}
    </>
  );
}

export default Profile;
