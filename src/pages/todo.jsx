import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "../styles/todo.css";
import User from "../context/user";
import { useContext, useEffect, useState } from "react";
import { CiCircleAlert } from "react-icons/ci";
import { MdDownloadDone } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import { FaTrashCan } from "react-icons/fa6";
import { FaPencilAlt, FaRegUserCircle } from "react-icons/fa";
import { Button, Modal, Toast, ToastContainer } from "react-bootstrap";
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
  orderBy,
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

export default function ToDoApp() {
  const user = useContext(User).user;
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [filter, setFilter] = useState("All");
  const [showToast, setShowToast] = useState({ type: "", visible: false });
  const [editingTodo, setEditingTodo] = useState(null);
  const [editingText, setEditingText] = useState("");

  const logOut = () => signOut(auth);

  const fetchTodos = async () => {
    const q = query(
      collection(db, "users", user.uid, "todos"),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    // collection(db, "users", user.uid, "todos")
    // );
    const fetchedTodos = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setTodos(fetchedTodos);
  };

  useEffect(() => {
    fetchTodos();
  }, [user.uid]);

  const handleAddTodo = async () => {
    if (todo.trim() === "") {
      showToastMessage("Please Enter a Task!", "danger");
      return;
    }
    try {
      await addDoc(collection(db, "users", user.uid, "todos"), {
        text: todo,
        status: "Active",
        createdAt: serverTimestamp(),
      });
      setTodo("");
      showToastMessage("Task Added Successfully!", "success");
      fetchTodos();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleEditTodo = async () => {
    if (editingText.trim() === "") {
      showToastMessage("Task text cannot be empty!", "danger");
      return;
    }
    try {
      const taskRef = doc(db, "users", user.uid, "todos", editingTodo.id);
      await updateDoc(taskRef, { text: editingText });
      showToastMessage("Task Updated Successfully!", "success");
      setEditingTodo(null);
      setEditingText("");
      fetchTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleStatusToggle = async (id, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Completed" : "Active";
    try {
      await updateDoc(doc(db, "users", user.uid, "todos", id), {
        status: newStatus,
      });
      fetchTodos();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await deleteDoc(doc(db, "users", user.uid, "todos", id));
      showToastMessage("Task Has Been Deleted!", "warning");
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const showToastMessage = (message, type) => {
    setShowToast({ type, message, visible: true });
    setTimeout(() => setShowToast({ ...showToast, visible: false }), 3000);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "All") return true;
    return todo.status === filter;
  });

  return (
    <div>
      <header>
        <MDBNavbar style={{ padding: "0px" }} expand="lg">
          <MDBContainer fluid>
            <h1 style={{ textAlign: "center", flex: "auto" }}>TODO LIST</h1>
            <MDBNavbarNav className="d-flex flex-row" right fullWidth={false}>
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
            </MDBNavbarNav>
          </MDBContainer>
        </MDBNavbar>
      </header>

      <section className="card vh-100">
        {/* Toast Notifications */}
        <ToastContainer position="top-end">
          <Toast show={showToast.visible} bg={showToast.type}>
            <Toast.Body style={{ color: "white", padding: 10 }}>
              {showToast.message}
            </Toast.Body>
          </Toast>
        </ToastContainer>

        <div className="container py-4 px px-md-5">
          <div className="d-flex align-items-center mb-4">
            <input
              type="text"
              className="form-control form-control-lg me-2"
              placeholder="Add new..."
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleAddTodo}>
              Add
            </button>
          </div>

          <hr className="my-4" />

          <div className="d-flex justify-content-end mb-2">
            <p className="mt-2 mb-0 me-2 text-muted">Filter</p>
            <select
              style={{ width: "30%" }}
              className="form-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Completed">Completed</option>
              <option value="Active">Active</option>
            </select>
          </div>

          <ul className="list-group">
            {filteredTodos.map((todo) => (
              <li
                key={todo.id}
                className={`list-group-item d-flex align-items-center ${
                  todo.status === "Completed" ? "todo-completed" : ""
                }`}
              >
                <input
                  type="checkbox"
                  className="form-check-input me-2"
                  checked={todo.status === "Completed"}
                  onChange={() => handleStatusToggle(todo.id, todo.status)}
                />
                <span className="flex-grow-1">{todo.text}</span>
                <FaPencilAlt
                  style={{ cursor: "pointer" }}
                  className="text-info me-2"
                  title="Edit"
                  onClick={() => {
                    setEditingTodo(todo);
                    setEditingText(todo.text);
                  }}
                />
                <FaTrashCan
                  style={{ cursor: "pointer" }}
                  className="text-danger"
                  title="Delete"
                  onClick={() => deleteTodo(todo.id)}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Modal show={!!editingTodo} onHide={() => setEditingTodo(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control"
            value={editingText}
            onChange={(e) => setEditingText(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditingTodo(null)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditTodo}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
