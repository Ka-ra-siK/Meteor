import {useTracker} from "meteor/react-meteor-data";
import {SpecializationCollection} from "../../api/masters/MastersCollection"
import {useState} from "react";
import {Specialization} from "/imports/api/masters/MastersCollection";
import {SpecializationForm} from "/imports/ui/specialization/SpecializationForm";
import {SpecializationCard} from "/imports/ui/specialization/SpecializationCard";
import React from "react";

export const SpecializationPage: React.FC = () => {
    const specializations = useTracker(() => SpecializationCollection.find({}, {sort: {name: 1}}).fetch())

    const [addFormShow, setAddFormShow] = useState(false)

    const onAddSubmit = (specialization: Specialization) => {
        SpecializationCollection.insert(specialization)
        setAddFormShow(false)
    }

    return (
        <div className="specialization-page">
            <div className="card">
                <button className="button" onClick={() => setAddFormShow(!addFormShow)}>{`${addFormShow ? 'Закрыть' : 'Добавить'}`}</button>
                {addFormShow &&
                    <SpecializationForm onSubmit={onAddSubmit} />
                }
            </div>
            <div>
                {specializations.map(a => <SpecializationCard key={a._id?.toHexString()} specialization={a} />)}
            </div>
        </div>
    )
}