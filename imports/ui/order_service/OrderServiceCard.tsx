import React, {useState} from "react";
import {useTracker} from "meteor/react-meteor-data";
import {MaterialsCollection} from "/imports/api/materials/MaterialsCollection";
import {Mongo} from "meteor/mongo";
import {Property} from "/imports/ui/Propertyy";
import {OrderService, OrderServiceCollection} from "/imports/api/order_service";
import {OrderServiceForm} from "/imports/ui/order_service/OrderServiceForm";

interface Props {
    orderService: OrderService
}

export const OrderServiceCard: React.FC<Props> = ({ orderService }) => {

    const mastersFromDb = useTracker(() => MaterialsCollection.find({}).fetch())


    const [isEdit, setIsEdit] = useState(false)

    const onEdit = (newOrderService: OrderService) => {
        OrderServiceCollection.update(orderService._id ?? new Mongo.ObjectID(''), newOrderService)
        setIsEdit(false)
    }

    const onDelete = () => {
        OrderServiceCollection.remove(orderService._id ?? new Mongo.ObjectID(''))
    }

    console.log(555, orderService.master.length)
    return (
        <div className="card order-service-card">
            {isEdit ?
                <OrderServiceForm orderService={orderService} onSubmit={onEdit} />
                :
                <div className="order-service-card__main">

                    <Property title="Услуга:" value={orderService.name} />
                    <Property title="Стоимость:" value={orderService.price} />
                    <Property title="Мастер:" value={<span>{orderService.master.map((mi, idx) => <span key={mi._id.toHexString()} className="staff-card__mov">{mastersFromDb.find(a => a._id?.equals(mi._id))?.name}{`${idx !== orderService.master.length - 1 ? ',' : ''} `}</span>)}</span>} />
                </div>
            }
            <div className="master-card__controls">
                <button className="button" onClick={() => setIsEdit(!isEdit)}>{isEdit ? 'Закрыть' : 'Редактировать'}</button>
                <button className="button button_red" onClick={onDelete}>Удалить</button>
            </div>
        </div>
    )
}