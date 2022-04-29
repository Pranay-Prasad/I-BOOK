import React from 'react';
import {Link,Navigate,useLocation} from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
    let location = useLocation();
    const navigate = useNavigate();
    const handellogout = ()=>{
        localStorage.removeItem('token');
        navigate("/login");
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">I-Book</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ?"active":""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ?"active":""}`} to="/about">About</Link>
                        </li>
                    </ul>
                    {!localStorage.getItem('token')?<form className="d-flex">
                            <Link className="btn btn-outline-success mx-2" to="/signup" role="button">Sign up</Link>
                            <Link className="btn btn-outline-success mx-2" to="/login" role="button">Login</Link>
                    </form>:<button onClick={handellogout} className='btn btn-outline-success'>Logout</button>}
                </div>
            </div>
        </nav>
    )
}
