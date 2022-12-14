import { Mongo } from "meteor/mongo";
import React, {useState} from "react";
import {Materials} from "/imports/api/materials";
import {MaterialsCollection} from "/imports/api/materials/MaterialsCollection";
import {MaterialsForm} from "/imports/ui/materials/MaterialsForm";
import {Property} from "/imports/ui/Propertyy";


interface Props {
    materials: Materials
}

export const MaterialsCard: React.FC<Props> = ({ materials }) => {

    const [isEdit, setIsEdit] = useState(false)

    const onEdit = (newMaterials: Materials) => {
        MaterialsCollection.update(materials._id ?? new Mongo.ObjectID(''), newMaterials)
        setIsEdit(false)
    }

    const onDelete = () => {
        MaterialsCollection.remove(materials._id ?? new Mongo.ObjectID(''))
    }

    return (
        <div className="card materials-card">
            {isEdit ?
                <MaterialsForm materials={materials} onSubmit={onEdit} />
                :
                <div className="materials-card__main">

                    <Property title="Название:" value={materials.name} />
                    <Property title="Единица измерения:" value={materials.unitMeasurement} />
                    <Property title="Цена:" value={materials.cost} />
                </div>
            }
            <div className="materials-card__controls">
                <button className="button" onClick={() => setIsEdit(!isEdit)}>{isEdit ? 'Закрыть' : 'Редактировать'}</button>
                <button className="button button_red" onClick={onDelete}>Удалить</button>
            </div>
        </div>
    )
}