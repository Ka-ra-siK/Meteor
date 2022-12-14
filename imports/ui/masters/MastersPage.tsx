import React, {useState} from "react";
import {useTracker} from "meteor/react-meteor-data";
import {MasterCollection, Masters} from "/imports/api/masters";
import {MasterForm} from "/imports/ui/masters/MastersForm";

import {MasterCard} from "/imports/ui/masters/MastersCard";

export const MasterPage: React.FC = () => {

    const [addFormShow, setAddFormShow] = useState(false)

    const masters = useTracker(() => MasterCollection.find({}, {sort: {name: 1}}).fetch())

    const onAddSubmit = (master: Masters) => {
        MasterCollection.insert(master)
        setAddFormShow(false)
    }

    return (
        <div className="master-page">
            <div className="card">
                <button className="button" onClick={() => setAddFormShow(!addFormShow)}>{`${addFormShow ? 'Закрыть' : 'Добавить'}`}</button>
                {addFormShow &&
                    <MasterForm onSubmit={onAddSubmit} />
                }
            </div>
            <div>
                {masters.map(master => <MasterCard key={master._id?.toHexString()} master={master} />)}
            </div>
        </div>
    )
}