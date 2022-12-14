import React, {useState} from "react";
import {useTracker} from "meteor/react-meteor-data";
import {OrderService, OrderServiceCollection} from "/imports/api/order_service";
import {OrderServiceForm} from "/imports/ui/order_service/OrderServiceForm";
import {OrderServiceCard} from "/imports/ui/order_service/OrderServiceCard";

export const OrderServicePage: React.FC = () => {
    const orderServices = useTracker(() => OrderServiceCollection.find({}, {sort: {name: 1}}).fetch())

    const [addFormShow, setAddFormShow] = useState(false)

    const onAddSubmit = (orderService: OrderService) => {
        OrderServiceCollection.insert(orderService)
        setAddFormShow(false)
    }

    return (
        <div className="material-page">
            <div className="card">
                <button className="button" onClick={() => setAddFormShow(!addFormShow)}>{`${addFormShow ? 'Закрыть' : 'Добавить'}`}</button>
                {addFormShow &&
                    <OrderServiceForm onSubmit={onAddSubmit} />
                }
            </div>
            <div>
                {orderServices.map(a => <OrderServiceCard key={a._id?.toHexString()} orderService={a} />)}
            </div>
        </div>
    )
}