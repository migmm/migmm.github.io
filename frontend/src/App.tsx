import React , { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';

import Certificates from './views/Certificates/Certificates';
import Contact from './views/Contact/Contact';
import Curriculum from './views/Curriculum/Curriculum';
import Header from './components/Header/Header';
import Home from './views/Home/Home';
import Projects from './views/ViewProjects/ViewProjects';
import Footer from './components/Footer/Footer';
import LoginScreen from './views/Login/LoginScreen';
import RegisterScreen from './views/Register/RegisterScreen';

import FormCertificate from './views/FormCertificate/FormCertificate';
import FormProject from './views/FormProject/FormProject';
import ViewProject from './views/ViewProject/ViewProject';

import './index.css';
import UserForm from './views/UserForm/UserForm';

const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = Cookies.get('nombreDeTuCookie');

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
                    <Route path='/' element={<Home />} />
                    <Route path='/projects' element={<Projects />} />
                    <Route path='/certificates' element={<Certificates />} />
                    <Route path='/curriculum' element={<Curriculum />} />
                    <Route path='/contact' element={<Contact />} />
                    <Route path='/login' element={<LoginScreen />} />
                    <Route path='/register' element={<RegisterScreen />} />
                    <Route path='/addcertificate' element={<FormCertificate />} />
                    <Route path='/editcertificate/:certificateId' element={<FormCertificate />} />
                    <Route path='/addproject' element={<FormProject />} />
                    <Route path='/editproject/:projectId' element={<FormProject />} />
                    <Route path='/viewproject/:projectId' element={<ViewProject />} />
                    <Route path='/newuser' element={<UserForm />} />
                    <Route path='*' element={<Navigate to='/' replace />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </React.StrictMode>
    );
};

export default App;
