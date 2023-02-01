/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import { UsersClass } from '../../../features/models/user.model';
import { ArtworkContext } from '../../context/artworks.context';
import './client.contact.scss';
export function ClientContact() {
    const { users, handleLoadUsers } = useContext(ArtworkContext);
    useEffect(() => {
        handleLoadUsers();
        console.log(users)
    }, [handleLoadUsers]);
    
    return (
        <>
            <h3>Manage who contacts you</h3>
            <div className="client-contact">
                <ul>
                    {users.map((item: UsersClass) => {
                        return (
                            <>
                                <li key={item.uid} className="card">
                                    <address>
                                        <label>Name: </label>
                                        <span>{item.name}</span>
                                        <label>Email: </label>
                                        <a href={`mailto: ${item.email}`}>
                                            {item.email}
                                        </a>
                                        <label>Address: </label>
                                        <span>{item.message.address}</span>
                                    </address>
                                    <label>Subject: </label>
                                    <span>{item.message.subject}</span>
                                    <label>Description:</label>
                                    <span>{item.message.description}</span>
                                    <button>Cancel</button>
                                </li>
                            </>
                        );
                    })}
                </ul>
            </div>
        </>
    );
}
