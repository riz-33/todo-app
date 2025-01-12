import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import "./todo.css";
import React from "react";
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
  return (
    <div>
      <header>
        <MDBNavbar expand="lg" light className="bg-white">
          <MDBContainer fluid>
            <MDBNavbarNav className="d-flex flex-row" right fullWidth={false}>
              <MDBNavbarItem>
                <MDBDropdown>
                  <MDBDropdownToggle
                  style={{cursor: "pointer"}}
                    tag="a"
                    className="hidden-arrow d-flex align-items-center nav-link"
                  >
                    username
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    {/* <MDBDropdownItem link>MyProfile</MDBDropdownItem>
                    <MDBDropdownItem link>Settings</MDBDropdownItem> */}
                    <MDBDropdownItem link>Logout</MDBDropdownItem>
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
                // className="card"
                id="list1"
                style={{ borderRadius: ".75rem", backgroundColor: "#eff1f2" }}
              >
                <div className="py-4 px-4 px-md-5">
                  <p className="h1 text-center mt-3 mb-4 pb-3 text-primary">
                    <i className="fas fa-check-square me-1"></i>
                    <u>TODO LIST</u>
                  </p>

                  <div className="pb-2">
                    <div>
                      <div>
                        <div className="d-flex flex-row align-items-center">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            id="exampleFormControlInput1"
                            placeholder="Add new..."
                          />
                          <a
                            href="#!"
                            data-mdb-tooltip-init
                            title="Set due date"
                          >
                            <i className="fas fa-calendar-alt fa-lg me-3"></i>
                          </a>
                          <div>
                            <button
                              type="button"
                              data-mdb-button-init
                              data-mdb-ripple-init
                              className="btn btn-primary"
                            >
                              Add
                            </button>
                          </div>
                        </div>
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
                      {/* <option value="4">Has due date</option> */}
                    </select>
                    {/* <p className="small mb-0 ms-4 me-2 text-muted">Sort</p>
            <select data-mdb-select-init>
              <option value="1">Added date</option>
              <option value="2">Due date</option>
            </select> */}
                    {/* <a
              href="#!"
              style={{ color: "#23af89" }}
              data-mdb-tooltip-init
              title="Ascending"
            >
              <i className="fas fa-sort-amount-down-alt ms-2"></i>
            </a> */}
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
                          // checked
                        />
                      </div>
                    </li>
                    <li className="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
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
                  {/* <ul className="list-group list-group-horizontal rounded-0">
            <li className="list-group-item d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent">
              <div className="form-check">
                <input
                  className="form-check-input me-0"
                  type="checkbox"
                  value=""
                  id="flexCheckChecked2"
                  aria-label="..."
                />
              </div>
            </li>
            <li className="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
              <p className="lead fw-normal mb-0">Renew car insurance</p>
            </li>
            <li className="list-group-item px-3 py-1 d-flex align-items-center border-0 bg-transparent">
              <div className="py-2 px-3 me-2 border border-warning rounded-3 d-flex align-items-center bg-body-tertiary">
                <p className="small mb-0">
                  <a href="#!" data-mdb-tooltip-init title="Due on date">
                    <i className="fas fa-hourglass-half me-2 text-warning"></i>
                  </a>
                  28th Jun 2020
                </p>
              </div>
            </li>
            <li className="list-group-item ps-3 pe-0 py-1 rounded-0 border-0 bg-transparent">
              <div className="d-flex flex-row justify-content-end mb-1">
                <a
                  href="#!"
                  className="text-info"
                  data-mdb-tooltip-init
                  title="Edit todo"
                >
                  <i className="fas fa-pencil-alt me-3"></i>
                </a>
                <a
                  href="#!"
                  className="text-danger"
                  data-mdb-tooltip-init
                  title="Delete todo"
                >
                  <i className="fas fa-trash-alt"></i>
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
          <ul className="list-group list-group-horizontal rounded-0 mb-2">
            <li className="list-group-item d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent">
              <div className="form-check">
                <input
                  className="form-check-input me-0"
                  type="checkbox"
                  value=""
                  id="flexCheckChecked3"
                  aria-label="..."
                />
              </div>
            </li>
            <li className="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
              <p className="lead fw-normal mb-0 bg-body-tertiary w-100 ms-n2 ps-2 py-1 rounded">
                Sign up for online course
              </p>
            </li>
            <li className="list-group-item ps-3 pe-0 py-1 rounded-0 border-0 bg-transparent">
              <div className="d-flex flex-row justify-content-end mb-1">
                <a
                  href="#!"
                  className="text-danger"
                  data-mdb-tooltip-init
                  title="Delete todo"
                >
                  <i className="fas fa-trash-alt"></i>
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
          </ul> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

{
  /* // const ToDo = () => { */
}

//   return (

//   );
// };

// export default ToDo;
