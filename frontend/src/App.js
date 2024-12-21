import React, { Component } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import * as rd from 'react-router-dom'
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import MobileHeader from './components/Header/MobileHeader';
import Home from './components/pages/Home';
import News from './components/pages/News';
import MyFlight from './components/pages/MyFlights';
import SearchFlight from './components/SearchFlight/SearchFlight';
import Passenger from './components/Passenger/Passenger';
import Profile from './components/Profile/Profile';
import Settings from './components/Settings/Settings';
import './assets/styles/responsives.css';
import Footer from './components/Footer/Footer';

// import AdminLayout from './components/admin/layout/AdminLayout';
// import AdminDashboard from './components/admin/pages/dashboard/AdminDashboard';
// import AdminAircrafts from './components/admin/pages/aircrafts/AdminAircrafts';
// import AdminFlights from './components/admin/pages/flights/AdminFlights';
// import AdminAdvertisements from './components/admin/pages/advertisements/AdminAdvertisements';
// import AdminBookings from './components/admin/pages/bookings/AdminBookings';
// import AdminSchedules from './components/admin/pages/schedules/AdminSchedules';
import { AuthProvider } from './contexts/AuthContext';

import ErrorPage from './components/ErrorPage/ErrorPage';
import { notFound } from './components/ErrorPage/errors';

const DefaultLayout = () => {
    return (
      <>
        
        <MobileHeader />
        <Header />
        <rd.Outlet />
        <Footer />
      </>
    );
  }

class App extends Component {
  render() {
    return (
      
      <AuthProvider>
        <BrowserRouter>
          <div className="App">
            {/* <ActionForm /> */}
            <Login />
          <MobileHeader />
        <Header />
            <rd.Routes>
              <rd.Route exact path="/" element={<Home />}></rd.Route>
                <rd.Route index element={<Home />}></rd.Route> 
                <rd.Route path="/myflights" element={<MyFlight />}></rd.Route>
                <rd.Route path="/news" element={<News />}></rd.Route>
                {/* <rd.Route path="/myflights" element={<MyFlight />}></rd.Route>
                <rd.Route path="/news" element={<News />}></rd.Route>
                <rd.Route path="/destination" element={<Destination />}></rd.Route>
                <rd.Route path="/searchflights" element={<SearchFlight />}></rd.Route>
                <rd.Route path="/passenger" element={<Passenger />}></rd.Route>
                <rd.Route path="/profile" element={<Profile />}></rd.Route>
                <rd.Route path="/write-blog" element={<WriteBlog />}></rd.Route>
                <rd.Route path="/settings" element={<Settings />}></rd.Route>
                <rd.Route path="/my-posts" element={<MyBlogs />}></rd.Route> */}
              </rd.Routes>
              <Footer />
{/*            
              <rd.Route exact path="/admin" element={<AdminLayout />}>
                <rd.Route index element={<rd.Navigate to="/admin/dashboard" replace />} />
                <rd.Route path="dashboard" element={<AdminDashboard />}></rd.Route>
                <rd.Route path="aircrafts" element={<AdminAircrafts />}></rd.Route>
                <rd.Route path="schedules" element={<AdminSchedules />}></rd.Route>
                <rd.Route path="flights" element={<AdminFlights />}></rd.Route>
                <rd.Route path="advertisements" element={<AdminAdvertisements />}></rd.Route>
              </rd.Route>
               */}
              
              
          </div>
        </BrowserRouter>
      </AuthProvider>
    );
  }
}

export default App;
