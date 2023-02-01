import { useState } from 'react';
import { Login } from '../login/login';

export function Header({ children }: { children: JSX.Element }) {
    const title = 'Marina Labella';
    const subtitle = 'ILLUSTRATION';

    const [login, setLogin] = useState(false);
    const [currentUser, setCurrentUser] = useState(false)
    const handleClick = () => {
        currentUser ? setCurrentUser(false) : setCurrentUser(true);
        currentUser ? setLogin(false) : setLogin(true);
    };

    return (
        <header>
            {login ? <Login></Login> : ''}
            <h1>{title}</h1>
            <h2>{subtitle}</h2>
            <button onClick={handleClick}>
                {currentUser ? 'Log out' : 'Log in'}
            </button>
            {children}
        </header>
    );
}
