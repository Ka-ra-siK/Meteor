import {MasterCollection} from "/imports/api/masters";
import React, {useState} from "react";
import {useTracker} from "meteor/react-meteor-data";
import {Mongo} from "meteor/mongo";
import {Property} from "/imports/ui/Propertyy";
import {OrderService} from "/imports/api/order_service";
//import {StafffCollection} from "/imports/api/staff";

interface Props {
    orderService?: OrderService
    onSubmit: (orderService: OrderService) => void
}

// name: string
// price: Number
export const OrderServiceForm: React.FC<Props> = ({orderService, onSubmit}) => {

    const masterFromDb = useTracker(() => MasterCollection.find({}).fetch())
    //const staffFromDb = useTracker(() => StafffCollection.find({}).fetch())

    const [name, setName] = useState(orderService?.name ?? '')
    const [price, setPrice] = useState<number>(orderService?.price ?? 0)
    const [master, setMaster] = useState<string[]>(masterFromDb.filter(m => (orderService?.master.findIndex(mm => mm._id.equals(m._id ?? new Mongo.ObjectID)) ?? -1) !== -1).map(m => m._id?.toHexString() ?? '') ?? [])



    const onClick = () => {
        if (name === '') return
        onSubmit({
            name,
            price,
            master: master.map(m => ({_id: new Mongo.ObjectID(m)}))
        })
        setName('')
        setPrice(0)
        setMaster([])
    }


    console.log(master)
    return (
        <div className="order-form">
            <Property title="Услуга:" value={<input type="text" value={name} onChange={e => setName(e.target.value)} />} />
            <Property title="Стоимость:" value={<input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} />} />
            <Property title="Мастер:" value={
                <select multiple value={master}
                        onChange={e => setMaster(Array.from(e.target.selectedOptions, option => option.value))}>
                    {masterFromDb.map(m => <option key={m._id?.toHexString()}
                                                  value={m._id?.toHexString()}>{m.name}</option>)}
                </select>
            }/>
            <button className="button button_green" onClick={onClick}>Ок</button>
        </div>
    )
}