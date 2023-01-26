import { useState, SyntheticEvent } from 'react';
// import { UsersClass } from '../../../features/models/user.model';
import './artist.contact.scss';
export function ArtistContact() {
    const initialFormData = {
        name: '',
        email: '',
        phone: '',
        address: '',
        subject: '',
        description: '',
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleInput = (ev: SyntheticEvent) => {
        const element = ev.target as HTMLFormElement;
        setFormData({ ...formData, [element.name]: element.value });
    };

    const handleSubmit = (ev: SyntheticEvent) => {
        ev.preventDefault();
        console.log(formData);
        // handleAdd(
        //     new UsersClass(
        //     )
        // );
        // setFormData(initialFormData);
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
                    Or just use the form and I will get back to you.
                </p>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Name"
                            value={formData.name}
                            onInput={handleInput}
                            required
                        />
                        <input
                            type="text"
                            name="email"
                            id="email"
                            placeholder="Email"
                            value={formData.email}
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
                            value={formData.phone}
                            onInput={handleInput}
                            required
                        />
                        <input
                            type="text"
                            name="address"
                            id="address"
                            placeholder="Address"
                            value={formData.address}
                            onInput={handleInput}
                            required
                        />
                    </div>
                    <div>
                        <input
                            className='subject'
                            type="text"
                            name="subject"
                            id="subject"
                            placeholder="Subject"
                            value={formData.subject}
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
                            value={formData.description}
                            onInput={handleInput}
                            required
                        />
                    </div>
                    <div className='div__btn'>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </>
    );
}
