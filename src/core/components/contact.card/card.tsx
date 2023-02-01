import { useContext } from 'react';
import { UsersClass } from '../../../features/models/user.model';
import { ArtworkContext } from '../../context/artworks.context';

export function Card({ item }: { item: UsersClass }) {
    const { handleUpdateUser, handleDeleteCard } = useContext(ArtworkContext);

    const data: Partial<UsersClass> = {
        message: {
            address: '',
            phone: '',
            subject: '',
            description: '',
        },
    };

    const handleClick = () => {
        handleUpdateUser({ ...item, ...data });
        handleDeleteCard(item.uid)
    };

    return (
        <>
            <li key={item.uid} className="card">
                <address>
                    <label>Name: </label>
                    <span>{item.name}</span>
                    <label>Email: </label>
                    <a href={`mailto: ${item.email}`}>{item.email}</a>
                    <label>Address: </label>
                    <span>{item.message.address}</span>
                    <label>Phone: </label>
                    <span>{item.message.phone}</span>
                </address>
                <label>Subject: </label>
                <span>{item.message.subject}</span>
                <label>Description:</label>
                <span>{item.message.description}</span>
                <button onClick={handleClick}>
                    <img
                        src={require('../../../assets/Trash.png')}
                        alt="trash"
                    />
                </button>
            </li>
        </>
    );
}
