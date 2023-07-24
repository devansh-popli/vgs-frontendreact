import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../services/UserService";
import { Card, Col, Container, Row } from "react-bootstrap";
import { SingleUserView } from "../../components/admin/SingleUserView";
import InfiniteScroll from "react-infinite-scroll-component";
import { ADMIN_USERS_PAGE_SIZE } from "../../services/HelperService";

export const AdminUsers = () => {
  const [users, setUsers] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const getUsers = (pageNumber, pageSize, sortBy, sortDir) => {
    if(pageNumber>0)
    {
      getAllUsers(pageNumber, pageSize, sortBy, sortDir).then((data) => {
      setUsers({
        content: [...users.content, ...data.content],
        lastPage: data.lastPage,
        pageNumber: data.pageNumber,
        pageSize: data.pageSize,
        totalElements: data.totalElements,
        totalPage: data.totalPages,
      });
      });
    }
    else{
      getAllUsers(pageNumber, pageSize, sortBy, sortDir).then((res) => {
        setUsers(res);
      });
    }
  };
  useEffect(() => {
    getUsers(0, ADMIN_USERS_PAGE_SIZE, "name", "asc");
  }, []);
  useEffect(() => {
    if (currentPage > 0)
     getUsers(currentPage, ADMIN_USERS_PAGE_SIZE, "name", "asc");
  }, [currentPage]);
  const loadNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  return (
    <>
      {users && (
        <>
          <Container>
            <Row>
              <Col>
                <Card className="shadow">
                  <Card.Body>
                    <h3>User List</h3>
                    <InfiniteScroll
                      dataLength={users.content.length}
                      next={loadNextPage}
                      loader={<h3 className="text-center">Loading....</h3>}
                      endMessage={<p>All Users Loaded</p>}
                   hasMore={!users.lastPage}
                   >
                      {users.content.map((user) => {
                        return <SingleUserView key={user.userId} user={user} />;
                      })}
                    </InfiniteScroll>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
};
