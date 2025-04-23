import React from "react";
import { useState, useEffect } from "react";

import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import { BsPlusCircleFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import { Link, Navigate, replace, useLocation, useNavigate } from "react-router-dom";

import LoadingSpinner from "./LoadingSpinner";
import ToastNotification from "./ToastNotification";


function PostList() {
  const location = useLocation();
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [show, setShow] = useState(false)
  const [isError, setIsError] = useState(false)

  const [message, setMessage] = useState("");

  const getPosts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:5000/api/posts");
      const data = await response.json();
      setPosts(data)
      console.log(data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const deletePost = async (id) => {
    const confirmation = window.confirm("Are you sure to delete ?");

    if (!confirmation) {
      return
    }
    try {
      const response = await fetch(`http://localhost:5000/api/deletepost/${id}`, { method: "DELETE" });
      if (response.ok) {
        setShow(true);
        setIsError(false)
        const { message } = await response.json();
        setMessage(message)

        await getPosts();
      } else {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message);
      }
    } catch (error) {

      setIsError(true);
      setMessage(error.message)
      setShow(true)

      console.log(error.message);
    }
  }

  useEffect(() => {
    if (location.state && location.state.message) {
      setMessage(location.state.message)
      setShow(true);
    }
    navigate("/", { replace: true });
  }, [location.state]);

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      {show && <ToastNotification text={message} show={show} setShow={setShow} isError={isError} />}
      <Container className="my-5">
        <Button size="lg" variant="success">
          <Link to={"/create"} style={{ textDecoration: "none", color: "white" }}>
            Create Post <BsPlusCircleFill></BsPlusCircleFill>
          </Link>
        </Button>

        <Row className="mt-3" sm={1} md={3}>
          {isLoading && <LoadingSpinner />}
          {!isLoading && posts.length > 0 && posts.map((post) => (
            <Col key={post._id}>
              <Card className="mb-2">
                <Card.Body>
                  <Row className="mb-2">
                    <Col xs={8} md={7} lg={8}>
                      <Card.Title>{post.title}</Card.Title>
                    </Col>
                    <Col>
                      <Link to={`/update/${post._id}`}>
                        <AiOutlineEdit className="text-primary" role="button" />
                      </Link>
                    </Col>
                    <Col>
                      <AiFillDelete className="text-danger" role="button" onClick={() => deletePost(post._id)} />
                    </Col>
                  </Row>
                  <Card.Text>{post.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}

          {
            !isLoading && posts.length === 0 && <h3 className="text-center display-6">No Posts to Display</h3>
          }
        </Row>

      </Container>
    </div>
  );
}

export default PostList;