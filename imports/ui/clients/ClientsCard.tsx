import React, {useState} from "react";
import {useTracker} from "meteor/react-meteor-data";
import {Mongo} from "meteor/mongo";
import {Property} from "/imports/ui/Propertyy";
import {Client, ClientsCollection} from "/imports/api/clients";
import {OrderServiceCollection} from "/imports/api/order_service";
import {ClientForm} from "/imports/ui/clients/ClientsForm";

interface Props {
    client: Client
}

export const ClientCard: React.FC<Props> = ({ client }) => {

    const orderFromDb = useTracker(() => OrderServiceCollection.find({}).fetch())


    const [isEdit, setIsEdit] = useState(false)

    const onEdit = (newClient: Client) => {
        ClientsCollection.update(client._id ?? new Mongo.ObjectID(''), newClient)
        setIsEdit(false)
    }

    const onDelete = () => {
        ClientsCollection.remove(client._id ?? new Mongo.ObjectID(''))
    }
    return (
        <div className="card staff-card">
            {isEdit ?
                <ClientForm client={client} onSubmit={onEdit} />
                :
                <div className="staff-card__main">

                    <Property title="Фамилия:" value={client.surname} />
                    <Property title="Имя:" value={client.name} />
                    <Property title="Отчество:" value={client.patronymic} />
                    <Property title="Номер телефона:" value={client.phoneNumber} />

                    <Property title="Услуги:" value={<span>{client.orderService.map((mi, idx) => <span key={mi._id.toHexString()} className="staff-card__mov">{orderFromDb.find(a => a._id?.equals(mi._id))?.name}{`${idx !== client.orderService.length - 1 ? ',' : ''} `}</span>)}</span>} />
                </div>
            }
            <div className="staff-card__controls">
                <button className="button" onClick={() => setIsEdit(!isEdit)}>{isEdit ? 'Закрыть' : 'Редактировать'}</button>
                <button className="button button_red" onClick={onDelete}>Удалить</button>
            </div>
        </div>
    )
}