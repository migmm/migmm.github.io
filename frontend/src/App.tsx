import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

import Certificates from './views/ViewCertificates/ViewCertificates';
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
import { useAppUser } from './context/UserContext';
import { apiURL } from './config/urls';
import FBChat from './components/FBChat/FBChat';
import Delete from './views/Delete/Delete';
import Preloader from './components/Preloader/Preloader';


interface DataItem {
    name: string;
    jobTitle: string;
    location: string;
    githubURL: string;
    linkedinURL: string;
    email: string;
    whatsappNumber: string;
    telegramId: string;
    youtubeChannel: string;
    logo: string;
}

const App = () => {
    const [homeData, setHomeData] = useState<DataItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { updateUser } = useAppUser();

    useEffect(() => {
        axios
            .get(`${apiURL}webconfig/`)
            .then((response) => {
                setHomeData(response.data);
                setIsLoading(false);
                console.log('Data fetched successfully:', response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    useEffect(() => {
        const storedToken = Cookies.get('token');
        const parsedToken = storedToken ? JSON.parse(decodeURIComponent(storedToken)) : null;
        
        if (storedToken) {
            try {
                const tokenDecoded = jwtDecode(parsedToken);
                updateUser(tokenDecoded);
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
    }, [updateUser]);

    return (
        <React.StrictMode>
            <BrowserRouter>
                <FBChat pageId="184581498068766" />
                {isLoading ? '' : <Header user={undefined} homeData={homeData} />}
                <Routes>
                    <Route path="/" element={isLoading ? <Preloader /> : <Home homeData={homeData} />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/search/:tag" element={<Projects />} />
                    <Route path="/certificates" element={<Certificates />} />
                    <Route path="/curriculum" element={<Curriculum />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<LoginScreen />} />
                    <Route path="/register" element={<RegisterScreen />} />
                    <Route path="/addcertificate" element={<FormCertificate />} />
                    <Route path="/editcertificate/:certificateId" element={<FormCertificate />} />
                    <Route path="/addproject" element={<FormProject />} />
                    <Route path="/editproject/:projectId" element={<FormProject />} />
                    <Route path="/viewproject/:projectId" element={<ViewProject user={undefined} />} />
                    <Route path="/newuser" element={<UserForm />} />
                    <Route path="/delete/:type/:id" element={<Delete />}/>
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
                {isLoading ? '' : <Footer homeData={homeData} />}
            </BrowserRouter>
        </React.StrictMode>
    );
};

export default App;
