import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Certificates from "./views/Certificates/Certificates";
import Contact from "./views/Contact/Contact";
import Curriculum from "./views/Curriculum/Curriculum";
import Header from "./components/Header/Header";
import Home from "./views/Home/Home";
import Projects from "./views/Projects/Projects";
import Footer from "./components/Footer/Footer";
import LoginScreen from "./views/Login/LoginScreen";
import "./index.css";

import reportWebVitals from "./reportWebVitals";


const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/certificates" element={<Certificates />} />
                <Route path="/curriculum" element={<Curriculum />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<LoginScreen />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <Footer/>
        </BrowserRouter>
    </React.StrictMode>
);


reportWebVitals();
