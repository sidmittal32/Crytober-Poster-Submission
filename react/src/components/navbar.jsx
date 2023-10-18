import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className="navbar" style={{ backgroundColor: '#097969' }}>
            <div className="navbar-left">
                <a href="/">Home</a>
                <a href="/rules">Rules</a>
            </div>

            <div className="navbar-mobile">
                <button className="mobile-menu-button" onClick={toggleMobileMenu}>
                    ☰
                </button>
                {isMobileMenuOpen && (
                    <div className="mobile-menu">
                        <a href="/">Home</a>
                        <a href="/rules">Rules</a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;