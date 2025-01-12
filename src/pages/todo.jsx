import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { FaPencilAlt, FaRegUserCircle } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import "./todo.css";
import User from "../context/user";
import { useContext, useEffect, useState } from "react";
import {
  auth,
  signOut,
  collection,
  addDoc,
  db,
  serverTimestamp,
  query,
  getDocs,
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

export default function ToDo() {
  const user = useContext(User).user;
  const logOut = () => {
    signOut(auth);
  };

  const [todo, setTodo] = useState("");
  const handleAddTodo = async () => {
    if (todo.trim() === "") {
      alert("Please enter a todo");
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
    } catch (error) {
      console.error("Error adding document:", error);
      alert("Failed to add todo. Please try again");
    }
  };

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

  return (
    <div>
      <header>
        <MDBNavbar expand="lg" light className="bg-white">
          <MDBContainer fluid>
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

      <section className="vh-100">
        <div className="container h-100">
          <div className="row d-flex justify-content-center h-100">
            <div className="col">
              <div
                id="list1"
                style={{ borderRadius: ".75rem", backgroundColor: "#eff1f2" }}
              >
                <div className="py-4 px-4 px-md-5">
                  <p className="h1 text-center mt-3 mb-4 pb-3 text-primary">
                    <u>TODO LIST</u>
                  </p>

                  <div className="pb-2">
                    <div className="d-flex flex-row align-items-center">
                      <input
                        type="text"
                        className="form-control form-control-lg"
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
                          onClick={handleAddTodo}
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

                  <ul className="list-group list-group-horizontal rounded-0 bg-transparent">
                    <li className="list-group-item d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent">
                      <div className="form-check">
                        <input
                          className="form-check-input me-0"
                          type="checkbox"
                          value=""
                          id="flexCheckChecked1"
                          aria-label="..."
                        />
                      </div>
                    </li>
                    <li
                      className="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 
                    border-0 bg-transparent"
                    >
                      <p className="lead fw-normal mb-0">
                        Buy groceries for next week
                      </p>
                    </li>
                    <li className="list-group-item ps-3 pe-0 py-1 rounded-0 border-0 bg-transparent">
                      <div className="d-flex flex-row justify-content-end mb-1">
                        <a
                          href="#!"
                          className="text-info"
                          data-mdb-tooltip-init
                          title="Edit todo"
                        >
                          <FaPencilAlt />
                        </a>
                        <a
                          href="#!"
                          className="text-danger"
                          data-mdb-tooltip-init
                          title="Delete todo"
                        >
                          <FaTrashCan />
                        </a>
                      </div>
                      <div className="text-end text-muted">
                        <a
                          href="#!"
                          className="text-muted"
                          data-mdb-tooltip-init
                          title="Created date"
                        >
                          <p className="small mb-0">
                            <i className="fas fa-info-circle me-2"></i>28th Jun
                            2020
                          </p>
                        </a>
                      </div>
                    </li>
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
