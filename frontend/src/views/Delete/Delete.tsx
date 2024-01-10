import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { apiURL } from '../../config/urls';
import { useAppUser } from '../../context/UserContext';

const Delete = ({ id, type }: any) => {
    const navigate = useNavigate();
    const { role } = useAppUser();

    useEffect(() => {
        if (role === null || role !== 'admin') {
            navigate('/');
        }

        const fetchData = async () => {
            try {
                console.log('send');
                const response = await axios.delete(`${apiURL}${type}/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status === 200) {
                    navigate('/projects');
                }
            } catch (error: any) {
                console.error(error);
            }
        };

        fetchData();
    }, [id, type, navigate]);

    return <></>;
};

export default Delete;