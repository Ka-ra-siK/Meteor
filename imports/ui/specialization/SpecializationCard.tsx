import { Mongo } from "meteor/mongo";
import React, {useState} from "react";
// import {Specialization, SpecializationCollection} from "../../api/masters/MastersCollection"
import {SpecializationForm} from "./SpecializationForm"
import {Property} from "/imports/ui/Propertyy";
import {Specialization, SpecializationCollection} from "/imports/api/masters/MastersCollection";


interface Props {
    specialization: Specialization
}

export const SpecializationCard: React.FC<Props> = ({ specialization }) => {

    const [isEdit, setIsEdit] = useState(false)

    const onEdit = (newSpecialization: Specialization) => {
        SpecializationCollection.update(specialization._id ?? new Mongo.ObjectID(''), newSpecialization)
        setIsEdit(false)
    }

    const onDelete = () => {
        SpecializationCollection.remove(specialization._id ?? new Mongo.ObjectID(''))
    }

    return (
        <div className="card specialization-card">
            {isEdit ?
                <SpecializationForm specialization={specialization} onSubmit={onEdit} />
                :
                <div className="specialization-card__main">

                    <Property title="Название специализации:" value={specialization.name} />
                </div>
            }
            <div className="specialization-card__controls">
                <button className="button" onClick={() => setIsEdit(!isEdit)}>{isEdit ? 'Закрыть' : 'Редактировать'}</button>
                <button className="button button_red" onClick={onDelete}>Удалить</button>
            </div>
        </div>
    )
}