// export default function ToDoApp() {
//   return (
//     <div>
//       <header>
//         <MDBNavbar style={{ padding: "0px" }} expand="lg">
//           <MDBContainer fluid>
//             <h1 style={{ textAlign: "center", flex: "auto" }}>TODO LIST</h1>
//             <MDBNavbarNav className="d-flex flex-row" right fullWidth={false}>
//               <MDBDropdown>
//                 <MDBDropdownToggle
//                   style={{ cursor: "pointer" }}
//                   tag="a"
//                   className="hidden-arrow d-flex align-items-center nav-link"
//                 >
//                   <FaRegUserCircle style={{ marginRight: "5px" }} />
//                   {user.username}
//                 </MDBDropdownToggle>
//                 <MDBDropdownMenu>
//                   <MDBDropdownItem link onClick={logOut}>
//                     Logout
//                   </MDBDropdownItem>
//                 </MDBDropdownMenu>
//               </MDBDropdown>
//             </MDBNavbarNav>
//           </MDBContainer>
//         </MDBNavbar>
//       </header>

//       <section className=" card vh-100 todo-body">
//         <ToastContainer position="top-end">
//           <Toast
//             onClose={() => setShowAddTodo(false)}
//             show={showAddTodo}
//             delay={3000}
//             autohide
//             bg="success"
//           >
//             <Toast.Body style={{ color: "white", padding: 10 }}>
//               <MdDownloadDone style={{ fontSize: 20 }} className="me-1" />
//               Task Added Successfully!
//             </Toast.Body>
//           </Toast>
//         </ToastContainer>

//         <ToastContainer position="top-end">
//           <Toast
//             onClose={() => setShowAlert(false)}
//             show={showAlert}
//             delay={3000}
//             autohide
//             bg="danger"
//           >
//             <Toast.Body style={{ color: "white", padding: 10 }}>
//               <CiCircleAlert style={{ fontSize: 20 }} className="me-1" />
//               Please Enter a Task!
//             </Toast.Body>
//           </Toast>
//         </ToastContainer>

//         <ToastContainer position="top-end">
//           <Toast
//             onClose={() => setShowDelete(false)}
//             show={showDelete}
//             delay={3000}
//             autohide
//             bg="warning"
//           >
//             <Toast.Body style={{ color: "white", padding: 10 }}>
//               <TiDelete style={{ fontSize: 20 }} className="me-1" />
//               Task Has Been Deleted!
//             </Toast.Body>
//           </Toast>
//         </ToastContainer>

//         <div className="py-4 px px-md-5 container">
//           <div className="row justify-content-center ">
//             <div className="col-lg-8 col-xl-8">
//               <div className="d-flex align-items-center">
//                 <input
//                   type="text"
//                   className="me-2 form-control form-control-lg"
//                   id="exampleFormControlInput1"
//                   placeholder="Add new..."
//                   value={todo}
//                   onChange={(e) => setTodo(e.target.value)}
//                 />
//                 <div>
//                   <button
//                     type="button"
//                     data-mdb-button-init
//                     data-mdb-ripple-init
//                     className="btn btn-primary"
//                     onClick={() => {
//                       handleAddTodo();
//                     }}
//                   >
//                     Add
//                   </button>
//                 </div>
//               </div>

//               <hr className="my-4" />

//               <div className="d-flex justify-content-end align-items-center mb-2 pb-3">
//                 <p className="mb-0 me-2 text-muted">Filter</p>
//                 <select data-mdb-select-init>
//                   <option value="1">All</option>
//                   <option value="2">Completed</option>
//                   <option value="3">Active</option>
//                 </select>
//               </div>

//               <ul className="list-group">
//                 {todos.map((todo) => {
//                   const createdAt =
//                     todo.createdAt && todo.createdAt.toDate().toLocaleString();
//                   return (
//                     <li
//                       key={todo.id}
//                       className="list-group-item px-3 d-flex align-items-center border-5 "
//                     >
//                       <div className="form-check">
//                         <input
//                           className="form-check-input me-0"
//                           type="checkbox"
//                           value=""
//                           id={`checkbox-${todo.id}`}
//                           aria-label="..."
//                           onClick={() => handleClick(todo.id)}
//                         />
//                       </div>
//                       <p
//                         className={`fw-normal mb-0 flex-grow-1 ms-3 ${
//                           isActive ? "todo-completed" : ""
//                         }`}
//                       >
//                         {todo.text}
//                       </p>
//                       <div className="d-flex flex-row justify-content-end">
//                         <a
//                           href="#!"
//                           className="text-info me-2"
//                           data-mdb-tooltip-init
//                           title="Edit todo"
//                         >
//                           <FaPencilAlt
//                             id={todo.id}
//                             onClick={() => handleShow(todo.id)}
//                           />
//                         </a>
//                         <Modal>
//                           <Modal.Header closeButton>
//                             <Modal.Title>Update TODO</Modal.Title>
//                           </Modal.Header>
//                           <Modal.Body>
//                             <input
//                               type="text"
//                               className="me-2 form-control form-control-lg"
//                               id="exampleFormControlInput1"
//                               value={todo.id}
//                               onChange={(e) => todo(e.target.value)}
//                             />
//                           </Modal.Body>
//                           <Modal.Footer>
//                             <Button variant="secondary" onClick={handleClose}>
//                               Cancel
//                             </Button>
//                             <Button variant="primary" onClick={handleClose}>
//                               Update Task
//                             </Button>
//                           </Modal.Footer>
//                         </Modal>
//                         <a
//                           href="#!"
//                           className="text-danger me-2"
//                           data-mdb-tooltip-init
//                           title="Delete todo"
//                         >
//                           <FaTrashCan
//                             id={todo.id}
//                             onClick={() => deleteTodo(todo.id)}
//                           />
//                         </a>
//                       </div>
//                       <div className="text-end text-muted">
//                         <a
//                           href="#!"
//                           className="text-muted"
//                           data-mdb-tooltip-init
//                           title="Created date"
//                         >
//                           <p className="small mb-0">{createdAt}</p>
//                         </a>
//                       </div>
//                     </li>
//                   );
//                 })}
//               </ul>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }