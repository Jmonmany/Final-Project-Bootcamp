/* eslint-disable react-hooks/exhaustive-deps */
import { useState, SyntheticEvent, useContext, useEffect } from 'react';
import { UsersClass } from '../../../features/models/user.model';
import { ArtworkContext } from '../../context/artworks.context';
import { useNavigate } from 'react-router-dom';
import './artist.contact.scss';
import Swal from 'sweetalert2';
export function ArtistContact() {
    const { currentUser, handleUpdateUser } = useContext(ArtworkContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (Object.keys(currentUser).length === 0) {
            navigate('/login');
        }
    }, [navigate, currentUser]);

    const initialFormData: Partial<UsersClass> = {
        message: {
            address: '',
            phone: '',
            subject: '',
            description: '',
        },
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleInput = (ev: SyntheticEvent) => {
        const element = ev.target as HTMLFormElement;
        setFormData({
            ...formData,
            message: { ...formData.message, [element.name]: element.value },
        });
    };

    const handleSubmit = (ev: SyntheticEvent) => {
        ev.preventDefault();
        handleUpdateUser({ ...currentUser, ...formData });
        navigate('/work');
        Swal.fire({
            icon: 'success',
            timer: 1000,
            showConfirmButton: false
        });
    };

    return (
        <>
            <div className="artist-contact">
                <h3>Let's talk</h3>
                <p>
                    For work inquiries, commissions or just to say hi, please
                    contact me at:{' '}
                    <span>
                        <a href="mailto:marinaf.labella@gmail.com">
                            marinaf.labella@gmail.com
                        </a>
                    </span>{' '}
                    or just use the form and I will get back to you.
                </p>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Name"
                            value={(currentUser as UsersClass).name}
                            onInput={handleInput}
                            required
                        />
                        <input
                            type="text"
                            name="email"
                            id="email"
                            placeholder="Email"
                            value={(currentUser as UsersClass).email}
                            onInput={handleInput}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="phone"
                            id="phone"
                            placeholder="Phone"
                            value={formData.message?.phone}
                            onInput={handleInput}
                            required
                        />
                        <input
                            type="text"
                            name="address"
                            id="address"
                            placeholder="Address"
                            value={formData.message?.address}
                            onInput={handleInput}
                            required
                        />
                    </div>
                    <div>
                        <input
                            className="subject"
                            type="text"
                            name="subject"
                            id="subject"
                            placeholder="Subject"
                            value={formData.message?.subject}
                            onInput={handleInput}
                            required
                        />
                    </div>
                    <div>
                        <input
                            className="description"
                            type="text"
                            name="description"
                            id="description"
                            placeholder="Type your message here..."
                            value={formData.message?.description}
                            onInput={handleInput}
                            required
                        />
                    </div>
                    <div className="div__btn">
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </>
    );
}
