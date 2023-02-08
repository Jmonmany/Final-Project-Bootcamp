import { useContext, useState } from 'react';
import { ArtworksClass } from '../../../features/models/artwork.model';
import { ArtworkContext } from '../../context/artworks.context';
import { Details } from '../details/details';
import { Login } from '../login/login';
import './header.scss'
export function Header({ children }: { children: JSX.Element }) {
    const { artworkDetailed } = useContext(ArtworkContext);
    const title = 'Marina Labella';
    const subtitle = 'ILLUSTRATION';

    const [login, setLogin] = useState(false);
    const [currentUser, setCurrentUser] = useState(false);
    const handleClick = () => {
        currentUser ? setCurrentUser(false) : setCurrentUser(true);
        currentUser ? setLogin(false) : setLogin(true);
    };

    return (
        <header>
            {(artworkDetailed as ArtworksClass).state ? (
                <Details item={artworkDetailed as ArtworksClass}></Details>
            ) : (
                ''
            )}
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
