import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './header.scss';
export function Header({ children }: { children: JSX.Element }) {
    const title = 'Marina Labella';
    const subtitle = 'ILLUSTRATION';
    const [login, setLogin] = useState(false);
    const [currentUser, setCurrentUser] = useState(false);
    const navigate = useNavigate();
    const handleClick = () => {
        currentUser ? setCurrentUser(false) : setCurrentUser(true);
        currentUser ? setLogin(false) : setLogin(true);
        navigate('/login');
    };

    return (
        <header>
            <h1>{title}</h1>
            <h2>{subtitle}</h2>
            <button onClick={handleClick}>
                {currentUser ? 'Log out' : 'Log in'}
            </button>
            {children}
        </header>
    );
}
