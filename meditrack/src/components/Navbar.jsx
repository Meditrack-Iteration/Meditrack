import React, { useState, useEffect } from 'react';
import { Link, useMatch, useResolvedPath, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [email, setEmail] = useState('');

    useEffect(() => {
        setEmail(localStorage.getItem('email'));

    }, []);

    // const navigate = useNavigate();

    // const handleDashboardClick = () => {
    //     navigate(`/dashboard/${email}`);
    // }

  return (
    <nav className="navbar">
        <Link className="site-title" to="/">Meditrack</Link>
        <ul>
            {/* <CustomLink to="/login">Login</CustomLink>
            <CustomLink to="/signup">Signup</CustomLink> */}
            <CustomLink to="/dashboard/:email">Dashboard</CustomLink>
            <CustomLink to="/about">About</CustomLink>
            <CustomLink to="/dse">DSE</CustomLink>
            <CustomLink to="/patientcal">Med Calendar</CustomLink>
            <CustomLink to="/doccal">Schedule an Appointment</CustomLink>
        </ul>
    </nav>
  );
};

function CustomLink ({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch( { path: resolvedPath.pathname, end: true })
    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>{children}</Link>
        </li>
    )
}

export default Navbar;