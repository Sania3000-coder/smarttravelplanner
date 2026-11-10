
import { useState, useEffect } from "react";
import {
    NavLink,
    useNavigate,
    useLocation
} from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");

        let user = {};
        try {
            user = JSON.parse(localStorage.getItem("user") || "{}");
        } catch {
            user = {};
        }

        setIsLoggedIn(Boolean(token));
        setIsAdmin(Boolean(token && user.role === "admin"));
        setMenuOpen(false);

    }, [location.pathname]);

    function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setIsLoggedIn(false);
        setIsAdmin(false);
        navigate("/login");
    }

    const linkStyle = ({ isActive }) => ({
        textDecoration: "none",
        color: isActive ? "#FFB703" : "#FFFFFF",
        fontWeight: isActive ? "700" : "500",
        padding: "10px 0",
        transition: "0.3s"
    });

    return (
        <>
            <style>{`
                .navbar {
                    width: 100%;
                    padding: 15px 5%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background: #102A43;
                    box-shadow: 0 4px 18px rgba(0,0,0,0.15);
                    position: sticky;
                    top: 0;
                    z-index: 1000;
                    box-sizing: border-box;
                }

                .logo {
                    font-size: 25px;
                    font-weight: 800;
                    color: white;
                    white-space: nowrap;
                }

                .logo span {
                    color: #FFB703;
                }

                .nav-links {
                    display: flex;
                    align-items: center;
                    gap: 22px;
                }

                .nav-links a:hover {
                    color: #FFB703 !important;
                }

                .nav-btn {
                    background: #087E8B;
                    color: white;
                    border: none;
                    padding: 11px 23px;
                    border-radius: 25px;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                }

                .nav-btn:hover {
                    background: #0AA1AA;
                    transform: translateY(-2px);
                }

                .menu-toggle {
                    display: none;
                    background: transparent;
                    color: white;
                    border: none;
                    font-size: 25px;
                    padding: 5px;
                }

                @media(max-width: 950px) {
                    .nav-links {
                        gap: 12px;
                        font-size: 13px;
                    }
                }

                @media(max-width: 750px) {
                    .navbar {
                        flex-wrap: wrap;
                    }

                    .menu-toggle {
                        display: block;
                    }

                    .nav-links {
                        display: ${menuOpen ? "flex" : "none"};
                        width: 100%;
                        flex-direction: column;
                        align-items: flex-start;
                        padding: 20px 0;
                        gap: 12px;
                    }
                }
            `}</style>

            <nav className="navbar">

                <div className="logo">
                    ✈️ Travel<span>Mate</span>
                </div>

                <button
                    className="menu-toggle"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    ☰
                </button>

                <div className="nav-links">
                    <NavLink to="/" style={linkStyle}>Home</NavLink>
                    <NavLink to="/explore" style={linkStyle}>Explore</NavLink>
                    <NavLink to="/planner" style={linkStyle}>Trip Planner</NavLink>
                    <NavLink to="/my-trips" style={linkStyle}>My Trips</NavLink>
                    <NavLink to="/budget" style={linkStyle}>Budget</NavLink>
                    <NavLink to="/weather" style={linkStyle}>Weather</NavLink>
                    <NavLink to="/blogs" style={linkStyle}>Blogs</NavLink>

                    {isLoggedIn && (
                        <NavLink to="/profile" style={linkStyle}>
                            My Profile
                        </NavLink>
                    )}

                    {isAdmin && (
                        <NavLink to="/admin" style={linkStyle}>
                            Admin Panel
                        </NavLink>
                    )}
                </div>

                {isLoggedIn ? (
                    <button
                        onClick={handleLogout}
                        className="nav-btn"
                    >
                        Logout
                    </button>
                ) : (
                    <button
                        className="nav-btn"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </button>
                )}

            </nav>
        </>
    );
}

export default Navbar;
