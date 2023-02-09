/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import { UsersClass } from '../../../features/models/user.model';
import { ArtworkContext } from '../../context/artworks.context';
import { Card } from '../contact.card/card';
import './client.contact.scss';
export function ClientContact() {
    const { users, handleLoadUsers } = useContext(ArtworkContext);
    useEffect(() => {
        handleLoadUsers();
    }, [handleLoadUsers]);

    return (
        <>
            <h3>Manage who contacts you</h3>
            <div className="client-contact">
                <ul>
                    {users.map((item: UsersClass) => {
                        return <Card key={item.uid} item={item}></Card>;
                    })}
                </ul>
            </div>
        </>
    );
}
