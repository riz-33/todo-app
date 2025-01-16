import { useState, useEffect } from "react";
import "../styles/form.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useForm } from "react-hook-form";
import {
  db,
  doc,
  getDoc,
  auth,
  signInWithEmailAndPassword,
} from "../config/firebase";
import { Link } from "react-router-dom";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
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

  const [formStyle, setFormStyle] = useState({});

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) {
        setFormStyle({
          width: "90%",
          padding: "1rem",
          marginTop: "3rem",
        });
      } else if (window.innerWidth <= 768) {
        setFormStyle({
          width: "60%",
          padding: "1.5rem",
          marginTop: "3rem",
        });
      } else {
        setFormStyle({
          width: "30rem",
          padding: "2rem",
          marginTop: "5rem",
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
        <p className="h1 text-center mb-3 pb-3 text-primary">
          <u>LOGIN</u>
        </p>

        <MDBInput
          {...register("email", { required: "Email is required" })}
          label="Email"
          type="email"
          className="mb-4"
          id="form2Example1"
        />
        <MDBInput
          {...register("password", { required: "Password is required" })}
          label="Password"
          type="password"
          className="mb-4"
          id="form2Example2"
        />

        <MDBBtn type="submit" className="mb-4" block>
          SIGN IN
        </MDBBtn>

        <div className="text-center">
          <p>
            Not a member? <Link to={"/signup"}>Register</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
