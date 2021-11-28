import React, {useState} from 'react';
import './App.css';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import SignIn from "./components/signin/Signin";
import SignUp from "./components/signup/Signup";
import AdminDash from "./components/adminDash/AdminDash";
import AnnouncementForm from './components/announcement/Form';
import Announcement from './components/announcement/Announcement';
import AllUsers from './components/users/Users';
import AddStadium from "./components/stadium/AddStadium";
import Profile from './components/users/Profile';
import ViewStadium from './components/stadium/ViewStatdium';
import CreateMatch from "./components/match/createMatch";
import MatchDetail from "./components/match/MatchDetail";
import AddBooking from "./components/booking/AddBooking";
import ViewBooking from "./components/booking/ViewBooking";
import CreateTicket from "./components/ticket/CreateTicket";
import CustomerDash from "./components/customerDash/CustomerDash";
import Ticket from "./components/ticket/Ticket";
import NotFound from "./components/notFound/Notfound";
import {ProtectedRouter,ProtectedRouterCustomer,ProtectedRouterAdmin} from "./ProtectedRoute";

const App = () => {
    return (
        <React.Fragment>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={SignIn} />
                    <Route exact path='/signup' component={SignUp} />


                    <ProtectedRouterAdmin exact path='/adminDashboard' component={AdminDash} />
                    <ProtectedRouterAdmin exact path='/announce-form' component={AnnouncementForm} />
                    <ProtectedRouterAdmin exact path='/users' component={AllUsers} />
                    <ProtectedRouterAdmin exact path='/add-stadium' component={AddStadium} />
                    <ProtectedRouterAdmin exact path='/create-match' component={CreateMatch} />
                    <ProtectedRouterAdmin exact path='/create-ticket' component={CreateTicket} />


                    <ProtectedRouterCustomer exact path='/userDashboard' component={CustomerDash} />
                    <ProtectedRouterCustomer exact path='/booking' component={AddBooking} />


                    <ProtectedRouter exact path='/announcement' component={Announcement} />
                    <ProtectedRouter exact path='/profile' component={Profile} />
                    <ProtectedRouter exact path='/stadium' component={ViewStadium} />
                    <ProtectedRouter exact path='/match' component={MatchDetail} />
                    <ProtectedRouter exact path='/view-booking' component={ViewBooking} />
                    <ProtectedRouter exact path='/ticket' component={Ticket} />

                    <Route exact path="*" component={NotFound}/>
                </Switch>
            </BrowserRouter>
        </React.Fragment>
    );
}

export default App;
