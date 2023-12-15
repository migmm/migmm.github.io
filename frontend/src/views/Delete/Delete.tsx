import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { apiURL } from '../../config/urls';

const Delete = ({ id, type }: any) => {
    const navigate = useNavigate();

    useEffect(() => {
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