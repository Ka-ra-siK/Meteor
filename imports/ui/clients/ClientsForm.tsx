import React, {useState} from "react";
import {useTracker} from "meteor/react-meteor-data";
import {Mongo} from "meteor/mongo";
import {Property} from "/imports/ui/Propertyy";
import {Client} from "/imports/api/clients";
import {OrderServiceCollection} from "/imports/api/order_service";

interface Props {
    client?: Client
    onSubmit: (client: Client) => void
}

export const ClientForm: React.FC<Props> = ({ client, onSubmit }) => {

    const orderFromDb = useTracker(() => OrderServiceCollection.find({}).fetch())

    const [surname, setSurname] = useState(client?.surname ?? '')
    const [name, setName] = useState(client?.name ?? '')
    const [patronymic, setPatronymic] = useState(client?.patronymic ?? '')
    const [phoneNumber, setPhoneNumber] = useState(client?.phoneNumber ?? '')
    const [orderService, setOrderService] = useState<string[]>(orderFromDb.filter(ac => (client?.orderService.findIndex(fa => fa._id.equals(ac._id ?? new Mongo.ObjectID)) ?? -1) !== -1).map(ac => ac._id?.toHexString() ?? '') ?? [])


    const onClick = () => {
        if (surname === '') return
        onSubmit({
            surname,
            name,
            patronymic,
            phoneNumber,
            orderService: orderService.map(os => ({ _id: new Mongo.ObjectID(os) }))
        })
        setSurname('')
        setName('')
        setPatronymic('')
        setPhoneNumber('')
        setOrderService([])
    }

    return (
        <div className="staff-form">
            <Property title="Фамилия:" value={<input type="text" value={surname} onChange={e => setSurname(e.target.value)} />} />
            <Property title="Имя:" value={<input type="text" value={name} onChange={e => setName(e.target.value)} />} />
            <Property title="Отчество:" value={<input type="text" value={patronymic} onChange={e => setPatronymic(e.target.value)} />} />
            <Property title="Номер телефона:" value={<input type="text" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />} />
            <Property title="Услуги:" value={
                <select multiple value={orderService} onChange={e => setOrderService(Array.from(e.target.selectedOptions, option => option.value))}>
                    {orderFromDb.map(mi => <option key={mi._id?.toHexString()} value={mi._id?.toHexString()}>{mi.name}</option>)}
                </select>
            } />
            <button className="button button_green" onClick={onClick}>Ок</button>
        </div>
    )
}