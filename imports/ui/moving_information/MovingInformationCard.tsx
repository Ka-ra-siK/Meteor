import { Mongo } from "meteor/mongo";
import React, {useState} from "react";
// import {Specialization, SpecializationCollection} from "../../api/masters/MastersCollection"
import {Property} from "/imports/ui/Propertyy";
import {MovingInformation, MovingInformationCollection} from "/imports/api/moving_information";
import {MovingInformationForm} from "/imports/ui/moving_information/MovingInformationForm";


interface Props {
    movingInformation: MovingInformation
}

export const MovingInformationCard: React.FC<Props> = ({ movingInformation }) => {

    const [isEdit, setIsEdit] = useState(false)

    const onEdit = (newMovingInformation: MovingInformation) => {
        MovingInformationCollection.update(movingInformation._id ?? new Mongo.ObjectID(''), newMovingInformation)
        setIsEdit(false)
    }

    const onDelete = () => {
        MovingInformationCollection.remove(movingInformation._id ?? new Mongo.ObjectID(''))
    }

    return (
        <div className="card film-card">
            {isEdit ?
                <MovingInformationForm movingInformation={movingInformation} onSubmit={onEdit} />
                :
                <div className="moving_information-card__main">

                    <Property title="Предыдущая позиция:" value={movingInformation.position} />
                    <Property title="Причина ухода:" value={movingInformation.transferReason} />
                    <Property title="Номер приказа:" value={movingInformation.orderNumber} />
                    <Property title="Дата приказа:" value={movingInformation.orderDate} />
                </div>
            }
            <div className="moving_information-card__controls">
                <button className="button" onClick={() => setIsEdit(!isEdit)}>{isEdit ? 'Закрыть' : 'Редактировать'}</button>
                <button className="button button_red" onClick={onDelete}>Удалить</button>
            </div>
        </div>
    )
}