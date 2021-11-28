import React, { useState, createContext } from 'react';
import axios from 'axios';
import baseURL from "../components/Common/baseUrl";

export const CategoryContext = createContext();

export const CategoryContextProvider = function (props) {
    const [allCategories, setAllCategories] = useState();

    const getAllCategories = async () => {
        // setAllCategories()
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };
        await axios
            .get(`${baseURL}allCategories`, config)
            .then((response) => {
                setAllCategories(response.data);
                // return(response.data);
            })
            .catch((err) => {
                console.log('Unable access allCategories context...');
            });
    };

    return (
        <CategoryContext.Provider
            value={{
                getAllCategories,
                allCategories,
            }}
        >
            {props.children}
        </CategoryContext.Provider>
    );
};