import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/my-profile">My Profile</Link>
                </li>
                <li>
                    <Link to="/queries-page">Queries Page</Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;