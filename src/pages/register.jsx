import "bootstrap/dist/css/bootstrap.min.css";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useForm } from "react-hook-form";
import {
  auth,
  createUserWithEmailAndPassword,
  db,
  doc,
  setDoc,
  serverTimestamp,
} from "../config/firebase";
import { Link } from "react-router-dom";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // const [formValue, setFormValue] = useState({
  //   username: "",
  //   email: "",
  //   password: "",
  // });

  // const onChange = (e) => {
  //   setFormValue({ ...formValue, [e.target.name]: e.target.value });
  // };

  const onSubmit = async (data) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await setDoc(doc(db, "users", response.user.uid), {
        username: data.username,
        email: data.email,
        password: data.password,
        uid: response.user.uid,
        createdAt: serverTimestamp(),
      });
      console.log("User registered and saved to Firestore:", response.user);
      reset();
    } catch (error) {
      console.error("Error during email/password signup:", error);
    }
  };

  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          width: "30rem",
          padding: "2rem",
          backgroundColor: "#f8f9fa",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          marginTop: "5rem",
        }}
      >
        <p className="h1 text-center mb-3 pb-3 text-primary">
          <u>REGISTER</u>
        </p>

        <MDBInput
          // value={formValue.username}
          name="username"
          // onChange={onChange}
          className="mb-4"
          type="text"
          id="form2Example1"
          label="Username"
          // required
          {...register("username", { required: "Username is required" })}
          // error={!!errors.username}
        />
        <MDBInput
          // value={formValue.email}
          name="email"
          // onChange={onChange}
          className="mb-4"
          type="email"
          id="form2Example2"
          // required
          label="Email"
          {...register("email", { required: "Email is required" })}
          // error={!!errors.email}
        />
        <MDBInput
          // value={formValue.password}
          name="password"
          // onChange={onChange}
          className="mb-4"
          type="password"
          id="form2Example3"
          label="Password"
          {...register("password", { required: "Password is required" })}
          // error={!!errors.password}
        />

        <MDBBtn type="submit" className="mb-4" block>
          SIGN UP
        </MDBBtn>

        <div className="text-center">
          <p>
            Already a member? <Link to={"/"}>Login</Link>
          </p>
        </div>

      </form>
    </div>
  );
}
