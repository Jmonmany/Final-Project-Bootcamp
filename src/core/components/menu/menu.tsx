import { Link } from 'react-router-dom';
import { MenuItems } from '../../types/menu';
import { Address } from '../address/address';
import './menu.scss';
export function Menu({ items }: { items: MenuItems }) {
    return (
        <nav className="menu">
            <span>
                <a href="mailto:marinaf.labella@gmail.com">marinaf.labella@gmail.com</a>
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
    );
}
