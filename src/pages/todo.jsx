import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { FaPencilAlt, FaRegUserCircle } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import "./todo.css";
import User from "../context/user";
import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";
import {
  auth,
  signOut,
  collection,
  addDoc,
  db,
  serverTimestamp,
  query,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "../config/firebase";
import {
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBContainer,
  MDBNavbar,
  MDBInputGroup,
  MDBIcon,
  MDBInput,
  MDBNavbarLink,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBBadge,
} from "mdb-react-ui-kit";
import { MdDownloadDone } from "react-icons/md";
import { CiCircleAlert } from "react-icons/ci";
import { TiDelete } from "react-icons/ti";
import { ToastContainer } from "react-bootstrap";

export default function ToDo() {
  const user = useContext(User).user;
  const logOut = () => {
    signOut(auth);
  };

  const [showAddTodo, setShowAddTodo] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [todo, setTodo] = useState("");
  const handleAddTodo = async () => {
    if (todo.trim() === "") {
      setShowAlert(true);
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "users", user.uid, "todos"), {
        text: todo,
        status: "Active",
        createdAt: serverTimestamp(),
      });
      console.log("Document written with ID: ", docRef.id);
      setTodo("");
      setShowAddTodo(true);
    } catch (error) {
      console.error("Error adding document:", error);
      alert("Failed to add todo. Please try again");
    }
  };

  const [todos, setTodos] = useState([]);
  console.log(todos);
  useEffect(() => {
    const fetchTodos = async () => {
      const todos = [];
      const querySnapshot = await getDocs(
        collection(db, "users", user.uid, "todos")
      );
      querySnapshot.forEach((doc) => {
        todos.push({ id: doc.id, ...doc.data() });
      });
      setTodos(todos);
    };
    fetchTodos();
  }, [todo, user.uid]);

  const getTodos = async () => {
    const querySnapshot = await getDocs(
      collection(db, "users", user.uid, "todos")
    );
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data().text);
    });
  };

  useEffect(() => {
    getTodos();
  });

  const [isActive, setIsActive] = useState({});
  const handleClick = async (id) => {
    try {
      setIsActive((prevTasks) => ({
        ...prevTasks,
        [id]: !prevTasks[id],
      }));
      const newStatus = !isActive[id] ? "Completed" : "Active";
      const taskRef = doc(db, "users", user.uid, "todos", id);
      await updateDoc(taskRef, {
        status: newStatus,
      });
      console.log(`Task ${id} updated to ${newStatus}`);
    } catch (error) {
      console.log("Error updating task:", error);
    }
  };

  // const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  // const handleShow = (id) => setShow(true);

  const [showDelete, setShowDelete] = useState(false);
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "users", user.uid, "todos", id));
    setShowDelete(true);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <header>
        <MDBNavbar
          style={{ padding: "0px" }}
          expand="lg"
          light
          className="bg-white"
        >
          <MDBContainer fluid>
            <h1 style={{ textAlign: "center", flex: "auto" }}>TODO LIST</h1>
            <MDBNavbarNav className="d-flex flex-row" right fullWidth={false}>
              <MDBNavbarItem>
                <MDBDropdown>
                  <MDBDropdownToggle
                    style={{ cursor: "pointer" }}
                    tag="a"
                    className="hidden-arrow d-flex align-items-center nav-link"
                  >
                    <FaRegUserCircle style={{ marginRight: "5px" }} />
                    {user.username}
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem link onClick={logOut}>
                      Logout
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBContainer>
        </MDBNavbar>
      </header>

      <section className="card vh-100">
        <div className="toast-div">
          <Toast
            onClose={() => setShowAddTodo(false)}
            show={showAddTodo}
            delay={3000}
            autohide
            bg="success"
          >
            <Toast.Body style={{ color: "white" }}>
              <MdDownloadDone style={{ fontSize: 20 }} className="me-1" />
              Task Added Successfully!
            </Toast.Body>
          </Toast>
        </div>

          <ToastContainer style={{marginBlockEnd:80}} position="bottom-end">
        <div className="toast-div">
          <Toast
            // onClose={() => setShowAlert(false)}
            show={showAlert}
            delay={3000}
            autohide
            bg="danger"
            >
            <Toast.Body style={{ color: "white", padding: 10 }}>
              <CiCircleAlert style={{ fontSize: 20 }} className="me-1" />
              Please Enter a Task!
            </Toast.Body>
          </Toast>
        </div>
            </ToastContainer>

        <div className="toast-div">
          <Toast
            onClose={() => setShowDelete(false)}
            show={showDelete}
            delay={3000}
            autohide
            bg="warning"
          >
            <Toast.Body style={{ color: "white" }}>
              <TiDelete style={{ fontSize: 20 }} className="me-1" />
              Task Has Been Deleted!
            </Toast.Body>
          </Toast>
        </div>

        <div className="container h-100">
          <div className="row d-flex justify-content-center h-100">
            <div className="col-lg-8 col-xl-8">
              <div
                id="list1"
                style={{ borderRadius: ".75rem", backgroundColor: "#eff1f2" }}
              >
                <div className="py-4 px-4 px-md-5 vh-100">
                  {/* <p className="h1 text-center mt-3 mb-4 pb-3 text-primary">
                    <u>TODO LIST</u>
                  </p> */}

                  <div className="pb-2">
                    <div className="d-flex flex-row align-items-center">
                      <input
                        type="text"
                        className="me-2 form-control form-control-lg"
                        id="exampleFormControlInput1"
                        placeholder="Add new..."
                        value={todo}
                        onChange={(e) => setTodo(e.target.value)}
                      />
                      <div>
                        <button
                          type="button"
                          data-mdb-button-init
                          data-mdb-ripple-init
                          className="btn btn-primary"
                          // onClick={handleAddTodo}
                          onClick={() => {
                            handleAddTodo();
                          }}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>

                  <hr className="my-4" />

                  <div className="d-flex justify-content-end align-items-center mb-4 pt-2 pb-3">
                    <p className="small mb-0 me-2 text-muted">Filter</p>
                    <select data-mdb-select-init>
                      <option value="1">All</option>
                      <option value="2">Completed</option>
                      <option value="3">Active</option>
                    </select>
                  </div>

                  <ul className="list-group rounded-0 bg-transparent">
                    {todos.map((todo) => {
                      const createdAt =
                        todo.createdAt &&
                        todo.createdAt.toDate().toLocaleString();
                      return (
                        <li
                          key={todo.id}
                          className="list-group-item d-flex align-items-center border-0 bg-transparent"
                        >
                          <div className="form-check">
                            <input
                              className="form-check-input me-0"
                              type="checkbox"
                              value=""
                              id={`checkbox-${todo.id}`}
                              aria-label="..."
                              onClick={() => handleClick(todo.id)}
                            />
                          </div>
                          <p
                            className={`fw-normal mb-0 flex-grow-1 ms-3 ${
                              isActive ? "todo-completed" : ""
                            }`}
                          >
                            {todo.text}
                          </p>
                          <div className="d-flex flex-row justify-content-end">
                            <a
                              href="#!"
                              className="text-info me-2"
                              data-mdb-tooltip-init
                              title="Edit todo"
                            >
                              <FaPencilAlt
                                id={todo.id}
                                // onClick={() => handleShow(todo.id)}
                              />
                              {/* onClick={handleShow} /> */}
                            </a>
                            <Modal>
                              {/* <Modal show={show} onHide={handleClose}> */}
                              <Modal.Header closeButton>
                                <Modal.Title>Update TODO</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                <input
                                  type="text"
                                  className="me-2 form-control form-control-lg"
                                  id="exampleFormControlInput1"
                                  // placeholder="Add new..."
                                  value={todo.id}
                                  onChange={(e) => todo(e.target.value)}
                                />
                              </Modal.Body>
                              <Modal.Footer>
                                <Button
                                  variant="secondary"
                                  // onClick={handleClose}
                                >
                                  Cancel
                                </Button>
                                <Button variant="primary" onClick={handleClose}>
                                  Update Task
                                </Button>
                              </Modal.Footer>
                            </Modal>
                            <a
                              href="#!"
                              className="text-danger me-2"
                              data-mdb-tooltip-init
                              title="Delete todo"
                            >
                              <FaTrashCan
                                id={todo.id}
                                onClick={() => deleteTodo(todo.id)}
                              />
                            </a>
                          </div>
                          <div className="text-end text-muted">
                            <a
                              href="#!"
                              className="text-muted"
                              data-mdb-tooltip-init
                              title="Created date"
                            >
                              <p className="small mb-0">{createdAt}</p>
                            </a>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
