import "bootstrap/dist/css/bootstrap.min.css";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  db,
  doc,
  getDoc,
  auth,
  signInWithEmailAndPassword,
} from "../config/firebase";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const docRef = doc(db, "users", response.user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        console.log("No such document!");
      }
      console.log("User logged in:", response.user);
      reset();
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const navigate = useNavigate();

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
        className="card"
        style={{ width: "30rem", padding: "2rem" }}
      >
        <p className="h1 text-center mb-3 pb-3 text-primary">
          <u>LOGIN</u>
        </p>

        <MDBInput
          className="mb-4"
          type="email"
          id="form2Example1"
          placeholder="Email"
          {...register("email", { required: "Email is required" })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <MDBInput
          className="mb-4"
          type="password"
          id="form2Example2"
          placeholder="Password"
          {...register("password", { required: "Password is required" })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <MDBBtn type="submit" className="mb-4" block>
          SIGN IN
        </MDBBtn>
      </form>
    </div>
  );
}
