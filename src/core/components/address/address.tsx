/* eslint-disable @typescript-eslint/no-var-requires */
import './address.scss';
export function Address() {
    return (
        <ul className="address-list">
            <li>
                <a href="https://www.instagram.com/_marinalabella">
                    <img
                        src={require('../../../assets/Instagram.png')}
                        alt="instagram"
                    />
                </a>
            </li>
            <li>
                <a href="https://www.behance.net/marinalabella">
                    <img
                        src={require('../../../assets/Behance.png')}
                        alt="behance"
                    />
                </a>
            </li>
            <li>
                <a href="https://www.linkedin.com/in/marinalabella/">
                    <img
                        src={require('../../../assets/Linkedin.png')}
                        alt="linkedin"
                    />
                </a>
            </li>
        </ul>
    );
}
