import {MasterCollection, Masters} from "/imports/api/masters";
import {useTracker} from "meteor/react-meteor-data";
import {MaterialsCollection} from "/imports/api/materials/MaterialsCollection";
import {SpecializationCollection} from "/imports/api/masters/MastersCollection";
import React, {useState} from "react";
import { Mongo } from "meteor/mongo";
import {MasterForm} from "/imports/ui/masters/MastersForm";
import {Property} from "/imports/ui/Propertyy";
import {StafffCollection} from "/imports/api/staff/StaffCollection";

interface Props {
    master: Masters
}

export const MasterCard: React.FC<Props> = ({ master }) => {

    const materialsFromDb = useTracker(() => MaterialsCollection.find({}).fetch())
    const specializationFromDb = useTracker(() => SpecializationCollection.find({}).fetch())
    const staffFromBD = useTracker(() => StafffCollection.find({}).fetch())


    const [isEdit, setIsEdit] = useState(false)

    const onEdit = (newMaster: Masters) => {
        MasterCollection.update(master._id ?? new Mongo.ObjectID(''), newMaster)
        setIsEdit(false)
    }

    const onDelete = () => {
        MasterCollection.remove(master._id ?? new Mongo.ObjectID(''))
    }

    return (
        <div className="card master-card">
            {isEdit ?
                <MasterForm master={master} onSubmit={onEdit} />
                :
                <div className="master-card__main">

                    <Property title="Имя:" value={master.name} />
                    <Property title="Мастер:" value={<span>{master.staff.map((staff, idx) => <span key={staff._id.toHexString()} className="master-card__staff">{staffFromBD.find(s => s._id?.equals(staff._id))?.surname}{`${idx !== master.staff.length - 1 ? ',' : ''} `}</span>)}</span>} />
                    <Property title="Материалы:" value={<span>{master.materials.map((materials, idx) => <span key={materials._id.toHexString()} className="master-card__materials">{materialsFromDb.find(m => m._id?.equals(materials._id))?.name}{`${idx !== master.materials.length - 1 ? ',' : ''} `}</span>)}</span>} />
                    <Property title="Специальности:" value={<span>{master.specialization.map((specialization, idx) => <span key={specialization._id.toHexString()} className="master-card__specialization">{specializationFromDb.find(s => s._id?.equals(specialization._id))?.name}{`${idx !== master.specialization.length - 1 ? ',' : ''} `}</span>)}</span>} />
                </div>
            }
            <div className="film-card__controls">
                <button className="button" onClick={() => setIsEdit(!isEdit)}>{isEdit ? 'Закрыть' : 'Редактировать'}</button>
                <button className="button button_red" onClick={onDelete}>Удалить</button>
            </div>
        </div>
    )
}