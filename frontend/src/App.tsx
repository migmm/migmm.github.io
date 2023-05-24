import React , { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import Cookies from "js-cookie";

import Certificates from "./views/Certificates/Certificates";
import Contact from "./views/Contact/Contact";
import Curriculum from "./views/Curriculum/Curriculum";
import Header from "./components/Header/Header";
import Home from "./views/Home/Home";
import Projects from "./views/Projects/Projects";
import Footer from "./components/Footer/Footer";
import LoginScreen from "./views/Login/LoginScreen";
import "./index.css";

import AddCertificate from "./views/AddCertificate/AddCertificate";

const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = Cookies.get("nombreDeTuCookie");

        if (token) {
            const decodedToken: any = jwtDecode(token);
            setUser(decodedToken);
        } else {
            setUser(null);
        }
    }, []);

    return (
        <React.StrictMode>
            <BrowserRouter>
                <Header user={user}/>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/certificates" element={<Certificates />} />
                    <Route path="/curriculum" element={<Curriculum />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<LoginScreen />} />
                    <Route path="/addcertificate" element={<AddCertificate />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </React.StrictMode>
    );
};

export default App;