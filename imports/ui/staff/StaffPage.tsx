import React, {useState} from "react";
import {useTracker} from "meteor/react-meteor-data";

import {StafffCard} from "/imports/ui/staff/StaffCard";
import {Stafff, StafffCollection} from "/imports/api/staff/StaffCollection";
import {StafffForm} from "/imports/ui/staff/StaffForm";

export const StafffPage: React.FC = () => {

    const [addFormShow, setAddFormShow] = useState(false)

    const staffs = useTracker(() => StafffCollection.find({}, {sort: {name: 1}}).fetch())

    const onAddSubmit = (stafff: Stafff) => {
        StafffCollection.insert(stafff)
        setAddFormShow(false)
    }

    return (
        <div className="staff-page">
            <div className="card">
                <button className="button" onClick={() => setAddFormShow(!addFormShow)}>{`${addFormShow ? 'Закрыть' : 'Добавить'}`}</button>
                {addFormShow &&
                    <StafffForm onSubmit={onAddSubmit} />
                }
            </div>
            <div>
                {staffs.map(staff => <StafffCard key={staff._id?.toHexString()} stafff={staff} />)}
            </div>
        </div>
    )
}