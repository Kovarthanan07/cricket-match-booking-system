import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRouterCustomer = ({ component: Component, ...rest }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    return (
        <Route
            {...rest}
            render={(props) => {
                if (user) {
                    if (user.role === 'customer' && token) {
                        return <Component {...props} />;
                    }
                    else {
                        return (
                            <Redirect
                                to={{
                                    pathname: '/',
                                    state: {
                                        from: props.location,
                                    },
                                }}
                            />
                        );
                    }
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: '/login',
                                state: {
                                    from: props.location,
                                },
                            }}
                        />
                    );
                }
            }}
        />
    );
};

const ProtectedRouterAdmin = ({ component: Component, ...rest }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    return (
        <Route
            {...rest}
            render={(props) => {
                if (user) {
                    if (user.role === 'admin' && token) {
                        return <Component {...props} />;
                    }
                    else {
                        return (
                            <Redirect
                                to={{
                                    pathname: '/',
                                    state: {
                                        from: props.location,
                                    },
                                }}
                            />
                        );
                    }
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: '/login',
                                state: {
                                    from: props.location,
                                },
                            }}
                        />
                    );
                }
            }}
        />
    );
};

const ProtectedRouter = ({ component: Component, ...rest }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    return (
        <Route
            {...rest}
            render={(props) => {
                if (user) {
                    if (token) {
                        return <Component {...props} />;
                    }
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: '/login',
                                state: {
                                    from: props.location,
                                },
                            }}
                        />
                    );
                }
            }}
        />
    );
};

export {
    ProtectedRouterCustomer,
    ProtectedRouterAdmin,
    ProtectedRouter,
};