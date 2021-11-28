import React, {useState, createContext} from 'react';
import axios from 'axios';
import baseURL from "../components/Common/baseUrl";

export const authUserContext = createContext();

export const AuthUserProvider = function (props) {
    const [user, setUser] = useState();
    // const [token, setToken] = useState();

    // const getAllCategories = async () => {
    //     // setAllCategories()
    //     const token = localStorage.getItem('token');
    //     const config = {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Authorization: `Bearer ${token}`,
    //         },
    //     };
    //     await axios
    //         .get(`${baseURL}allCategories`, config)
    //         .then((response) => {
    //             setAllCategories(response.data);
    //             // return(response.data);
    //         })
    //         .catch((err) => {
    //             console.log('Unable access allCategories context...');
    //         });
    // };

    return (
        <authUserContext.Provider
            value={{
                user, setUser
            }}
        >
            {props.children}
        </authUserContext.Provider>
    );
};