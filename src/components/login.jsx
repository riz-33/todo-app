import "bootstrap/dist/css/bootstrap.min.css";
import {
  MDBInput,
  MDBBtn,
} from "mdb-react-ui-kit";

export default function LoginForm() {
  return (
    <div style={{justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column"}}> 
      <form className="card" style={{width: "30rem", padding: "2rem"}}>
      <p className="h1 text-center mb-3 pb-3 text-primary">
        <u>LOGIN</u>
      </p>

        <MDBInput
          className="mb-4"
          type="email"
          id="form2Example1"
          placeholder="Email"
        />
        <MDBInput
          className="mb-4"
          type="password"
          id="form2Example2"
          placeholder="Password"
        />

        <MDBBtn type="submit" className="mb-4" block>
          SIGN IN
        </MDBBtn>

      </form>
    </div>
  );
}
