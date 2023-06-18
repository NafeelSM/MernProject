import React from 'react'
import {NavLink} from 'react-router-dom';

    const Navbar = () => {
    
    return (
    <nav className="navbar  navbar-expand-lg fixed-top ">
        <div className="container-fluid">
             <h4 class="text-dark">EMPLOYEE MANAGEMENT</h4>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item text-dark">
                    <NavLink className="nav-link  text-dark" aria-current="page" exact to="/" >HOME</NavLink>
                </li>
                <li className="nav-item text-dark">
                    <NavLink className="nav-link text-dark" exact to="/add" activeClassName="active">INSERT</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link text-dark" exact to="/edit" activeClassName="active">VIEW</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link  text-dark" exact to="/view" activeClassName="active">REPORT </NavLink>
                </li>
            </ul>
        </div>
        </div>
    </nav>
           
    )
}

export default Navbar