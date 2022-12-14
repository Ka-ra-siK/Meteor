import React, {useState} from "react";
import {useTracker} from "meteor/react-meteor-data";
import {MovingInformation, MovingInformationCollection} from "/imports/api/moving_information";
import {MovingInformationForm} from "/imports/ui/moving_information/MovingInformationForm";
import {MovingInformationCard} from "/imports/ui/moving_information/MovingInformationCard";

export const MovingInformationPage: React.FC = () => {
    const movingInformations = useTracker(() => MovingInformationCollection.find({}, {sort: {name: 1}}).fetch())

    const [addFormShow, setAddFormShow] = useState(false)

    const onAddSubmit = (movingInformation: MovingInformation) => {
        console.log(movingInformation)
        MovingInformationCollection.insert(movingInformation)
        setAddFormShow(false)
    }

    return (
        <div className="moving_information-page">
            <div className="card">
                <button className="button" onClick={() => setAddFormShow(!addFormShow)}>{`${addFormShow ? 'Закрыть' : 'Добавить'}`}</button>
                {addFormShow &&
                    <MovingInformationForm onSubmit={onAddSubmit} />
                }
            </div>
            <div>
                {movingInformations.map(a => <MovingInformationCard key={a._id?.toHexString()} movingInformation={a} />)}
            </div>
        </div>
    )
}