import "bootstrap/dist/css/bootstrap.min.css";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  auth,
  createUserWithEmailAndPassword,
  db,
  doc,
  setDoc,
  serverTimestamp,
} from "../config/firebase";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

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
        className="card"
        style={{ width: "30rem", padding: "2rem" }}
      >
        <p className="h1 text-center mb-3 pb-3 text-primary">
          <u>REGISTER</u>
        </p>

        <MDBInput
          className="mb-4"
          type="text"
          id="form2Example1"
          placeholder="Username"
          {...register("username", { required: "Username is required" })}
          error={!!errors.username}
        />
        <MDBInput
          className="mb-4"
          type="email"
          id="form2Example1"
          placeholder="Email"
          {...register("email", { required: "Email is required" })}
          error={!!errors.email}
        />
        <MDBInput
          className="mb-4"
          type="password"
          id="form2Example2"
          placeholder="Password"
          {...register("password", { required: "Password is required" })}
          error={!!errors.password}
        />

        <MDBBtn type="submit" className="mb-4" block>
          SIGN UP
        </MDBBtn>
      </form>
    </div>
  );
}
