import {useTracker} from "meteor/react-meteor-data";
import {MovingInformationCollection} from "/imports/api/moving_information";
import React, {useState} from "react";
import { Mongo } from "meteor/mongo";
import {Property} from "/imports/ui/Propertyy";
import {Stafff, StafffCollection} from "/imports/api/staff/StaffCollection";
import {StafffForm} from "/imports/ui/staff/StaffForm";

interface Props {
    stafff: Stafff
}

export const StafffCard: React.FC<Props> = ({ stafff }) => {

    const movingInformationFromDb = useTracker(() => MovingInformationCollection.find({}).fetch())


    const [isEdit, setIsEdit] = useState(false)

    const onEdit = (newStafff: Stafff) => {
        StafffCollection.update(stafff._id ?? new Mongo.ObjectID(''), newStafff)
        setIsEdit(false)
    }

    const onDelete = () => {
        StafffCollection.remove(stafff._id ?? new Mongo.ObjectID(''))
    }
    return (
        <div className="card staff-card">
            {isEdit ?
                <StafffForm stafff={stafff} onSubmit={onEdit} />
                :
                <div className="staff-card__main">

                    <Property title="Фамилия:" value={stafff.surname} />
                    <Property title="Имя:" value={stafff.name} />
                    <Property title="Отчество:" value={stafff.patronymic} />
                    <Property title="Адрес:" value={stafff.address} />
                    <Property title="День рождения:" value={stafff.birthDate} />
                    <Property title="Должность:" value={stafff.position} />
                    <Property title="Зарплата:" value={stafff.salary} />

                    <Property title="Инфо о перемещении:" value={<span>{stafff.movingInformation.map((mi, idx) => <span key={mi._id.toHexString()} className="staff-card__mov">{movingInformationFromDb.find(a => a._id?.equals(mi._id))?.transferReason}{`${idx !== stafff.movingInformation.length - 1 ? ',' : ''} `}</span>)}</span>} />
                </div>
            }
            <div className="staff-card__controls">
                <button className="button" onClick={() => setIsEdit(!isEdit)}>{isEdit ? 'Закрыть' : 'Редактировать'}</button>
                <button className="button button_red" onClick={onDelete}>Удалить</button>
            </div>
        </div>
    )
}