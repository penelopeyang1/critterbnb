import React from 'react';
import { Link } from 'react-router-dom';
// import './Header.css';

const Home = () => {
    return (
        <header className="app-header">
            <Link to="/" className="logo">AppName</Link>
            <nav>
                <Link to="/login">Log in</Link>
                <Link to="/signup">Sign up</Link>
            </nav>
        </header>
    );
};

export default Home;
