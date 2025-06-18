'use client';

import Link from "next/link";

const Nav = () => {
    return (<nav className="navbar navbar-expand-lg navbar-dark bg-secondary height-58px">
        <div className="container-fluid">
            <Link className="navbar-brand" href="/"><img className="height-50px" src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?semt=ais_hybrid&w=740" alt="Logo" /></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link" href="/login">Admin</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" href="/login">User</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" href="/products">Products</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" href="/categories">Categories</Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    );
}

export default Nav;