import { useState, useEffect } from "react";
import "../styles/form.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Toast, ToastContainer } from "react-bootstrap";
import {
  auth,
  createUserWithEmailAndPassword,
  db,
  doc,
  setDoc,
  serverTimestamp,
} from "../config/firebase";

export default function RegisterForm() {
  const { register, handleSubmit, reset } = useForm();
  const [showToast, setShowToast] = useState({ type: "", visible: false });

  const onSubmit = async (data) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      showToastMessage("User Registered Successfully!", "success");
      await setDoc(doc(db, "users", response.user.uid), {
        username: data.username,
        email: data.email,
        password: data.password,
        uid: response.user.uid,
        createdAt: serverTimestamp(),
      });
      // console.log("User registered and saved to Firestore:", response.user);
      reset();
    } catch (error) {
      showToastMessage(`${error}`, "danger");
      // console.error("Error during email/password signup:", error);
    }
  };

  const showToastMessage = (message, type) => {
    setShowToast({ type, message, visible: true });
    setTimeout(() => setShowToast({ ...showToast, visible: false }), 3000);
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
          <u>REGISTER</u>
        </p>

        <MDBInput
          name="username"
          className="mb-4"
          type="text"
          id="form2Example1"
          label="Username"
          {...register("username", { required: "Username is required" })}
        />
        <MDBInput
          name="email"
          className="mb-4"
          type="email"
          id="form2Example2"
          label="Email"
          {...register("email", { required: "Email is required" })}
        />
        <MDBInput
          name="password"
          className="mb-4"
          type="password"
          id="form2Example3"
          label="Password"
          {...register("password", { required: "Password is required" })}
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

      <ToastContainer className="mb-2" position="bottom-end">
        <Toast show={showToast.visible} bg={showToast.type}>
          <Toast.Body style={{ color: "white", padding: 10 }}>
            {showToast.message}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}
