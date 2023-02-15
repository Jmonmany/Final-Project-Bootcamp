import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MenuItems } from '../../types/menu';
import { Address } from '../address/address';
import './menu.scss';
export function Menu({ items }: { items: MenuItems }) {
    const [hamMenu, setHam] = useState(false);

    const handleOpen = () => {
        setHam(true);
    };

    const handleClose = () => {
        setHam(false);
    };

    return (
        <>
            <nav className="menu">
                <span>
                    <a href="mailto:marinaf.labella@gmail.com">
                        marinaf.labella@gmail.com
                    </a>
                </span>
                <ul className="page-list">
                    {items.map((item) => (
                        <li key={item.label}>
                            <Link to={item.path}>{item.label}</Link>
                        </li>
                    ))}
                </ul>
                <Address></Address>
            </nav>
            <div className="ham">
                <img
                    onClick={handleOpen}
                    src={require('../../../assets/menu.png')}
                    alt="hamburguer"
                />
                {hamMenu ? (
                    <ul className="ham__list" data-testid="ham-menu">
                        {items.map((item) => (
                            <li
                                key={item.label}
                                onClick={handleClose}
                                data-testid="ham-element"
                            >
                                <Link to={item.path}>{item.label}</Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    ''
                )}
            </div>
        </>
    );
}
