import {useTracker} from "meteor/react-meteor-data";
import React, {useState} from "react";
import {Materials, MaterialsCollection} from "/imports/api/materials/MaterialsCollection";
import {MaterialsForm} from "/imports/ui/materials/MaterialsForm";
import {MaterialsCard} from "/imports/ui/materials/MaterialsCard";

export const MaterialsPage: React.FC = () => {
    const materialsMap = useTracker(() => MaterialsCollection.find({}, {sort: {name: 1}}).fetch())

    const [addFormShow, setAddFormShow] = useState(false)

    const onAddSubmit = (materials: Materials) => {
        MaterialsCollection.insert(materials)
        setAddFormShow(false)
    }

    return (
        <div className="materialspage">
            <div className="card">
                <button className="button" onClick={() => setAddFormShow(!addFormShow)}>{`${addFormShow ? 'Закрыть' : 'Добавить'}`}</button>
                {addFormShow &&
                    <MaterialsForm onSubmit={onAddSubmit} />
                }
            </div>
            <div>
                {materialsMap.map(a => <MaterialsCard key={a._id?.toHexString()} materials={a} />)}
            </div>
        </div>
    )
}