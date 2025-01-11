import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginForm from "../components/login";
import RegisterForm from "../components/register";
import ToDo from "../components/todo";
import Spinner from 'react-bootstrap/Spinner';
import { useEffect, useState } from "react";
import { auth, onAuthStateChanged, doc, getDoc, db } from "./firebase";

function AppRouter() {
    const [User, setUser] = useState(false)
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUser(true)
                }
            } else {
                setUser(false)
            }
            setLoader(false);
        })
    }, [])

    return (
        <>
            {loader ?
                <div style={{ textAlign: "center", alignItems: "center" }}>
                      <Spinner animation="grow" variant="primary" />
              </div>
                :
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={User ? <Navigate to={"/todo"} /> : <LoginForm />} />
                        <Route path="/signup" element={User ? <Navigate to={"/todo"} /> : <RegisterForm />} />
                        <Route path="/todo" element={User ? <ToDo /> : <Navigate to={"/"} />} />
                    </Routes>
                </BrowserRouter>
            }
        </>
    )
}

export default AppRouter;