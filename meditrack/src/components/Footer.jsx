import React from 'react';
import { useNavigate } from 'react-router';

const Footer = () => {

    const navigate = useNavigate();
    function logout() {
        document.cookie = "_id=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        document.cookie = "Authorization=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        navigate("/")
    }
    return (
        <div className="navbar" style={{marginBottom: "0"}}>
            <button onClick={logout}>Log out</button>
        </div>
    )
}

export default Footer;