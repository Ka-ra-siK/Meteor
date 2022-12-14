import React, {useState} from "react";
import {useTracker} from "meteor/react-meteor-data";
import {Client, ClientsCollection} from "/imports/api/clients";
import {ClientForm} from "/imports/ui/clients/ClientsForm";
import {ClientCard} from "/imports/ui/clients/ClientsCard";

export const ClientPage: React.FC = () => {

    const [addFormShow, setAddFormShow] = useState(false)

    const clients = useTracker(() => ClientsCollection.find({}, {sort: {name: 1}}).fetch())

    const onAddSubmit = (client: Client) => {
        ClientsCollection.insert(client)
        setAddFormShow(false)
    }

    return (
        <div className="staff-page">
            <div className="card">
                <button className="button" onClick={() => setAddFormShow(!addFormShow)}>{`${addFormShow ? 'Закрыть' : 'Добавить'}`}</button>
                {addFormShow &&
                    <ClientForm onSubmit={onAddSubmit} />
                }
            </div>
            <div>
                {clients.map(client => <ClientCard key={client._id?.toHexString()} client={client} />)}
            </div>
        </div>
    )
}